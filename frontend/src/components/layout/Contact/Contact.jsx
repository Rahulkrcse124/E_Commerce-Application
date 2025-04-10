import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:rahul.22jics074@jietjodhpur.ac.in">
        <Button variant="contained" color="primary">
          Contact: rahul.22jics074@jietjodhpur.ac.in
        </Button>
      </a>
    </div>
  );
};

export default Contact;