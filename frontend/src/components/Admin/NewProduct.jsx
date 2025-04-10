import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productAction";
import Metadata from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./newProduct.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["Laptop", "Smartphone", "Camera", "Headphones", "Accessories"];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    images.forEach((image) => formData.append("images", image));
    dispatch(createProduct(formData));
  };

  const imageChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Metadata title="Create Product - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form className="newProductForm" onSubmit={submitHandler}>
            <h1>Create Product</h1>

            <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
            <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input type="number" placeholder="Stock" required value={stock} onChange={(e) => setStock(e.target.value)} />

            <input type="file" multiple onChange={imageChangeHandler} />
            <div className="imagePreviewContainer">
              {imagePreview.map((img, index) => (
                <img key={index} src={img} alt="Product Preview" />
              ))}
            </div>

            <button type="submit" disabled={loading}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;