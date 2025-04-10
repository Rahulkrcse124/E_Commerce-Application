import { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  
  const { error } = useSelector((state) => state.newOrder || {});

  const [loading, setLoading] = useState(""); 

  
  let orderInfo = {};
  try {
    orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  } catch (error) {
    console.error("Failed to parse orderInfo:", error);
  }

  
  const paymentData = {
    amount: orderInfo.totalPrice ? Math.round(orderInfo.totalPrice * 100) : 0,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal || 0,
    taxPrice: orderInfo.tax || 0,
    shippingPrice: orderInfo.shippingCharges || 0,
    totalPrice: orderInfo.totalPrice || 0,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        alert.error("Stripe has not loaded properly. Please refresh the page.");
        setLoading(false);
        payBtn.current.disabled = false;
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        console.error("Stripe Error:", result.error.message);
        setLoading(false);
        payBtn.current.disabled = false;
      } else {
        console.log("Payment Intent:", result.paymentIntent);
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There was an issue processing the payment.");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert.error(error.response?.data?.message || "Payment failed.");
      setLoading(false);
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={loading ? "Processing..." : `Pay - ₹${orderInfo.totalPrice || 0}`}
            ref={payBtn}
            disabled={loading}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;