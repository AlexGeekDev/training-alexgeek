import React from "react";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { useStripeDataContext } from "../context/stripeContext";

const InputCard = () => {
  const { setCardDetails, setCard } = useStripeDataContext();
  const elements = useElements();

  const handleOnchange = (details) => {
    setCard(elements.getElement(CardElement));
    setCardDetails(details);
  };

  const cardStyle = {
    style: {
      base: {
        color: "#8227fd",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#1089ff",
        },
        fontWeight: "bold",
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fbd46d",
        iconColor: "#fbd46d",
      },
    },
    hidePostalCode: true,
  };

  return (
    <CardElement
      id="card-element"
      options={cardStyle}
      onChange={(details) => handleOnchange(details)}
      hidePostalCode={true}
    />
  );
};

export default InputCard;
