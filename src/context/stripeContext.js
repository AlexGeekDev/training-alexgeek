/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

export const StripeDataContext = createContext();

export const StripeDataProvider = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51L5EjnF5bIaCQA8cR1kSSj9PN5kDpvOrCZlMLeDAIoWogO83gkQuNfdn2uCo6AwYngVzBanHxY19wFSxJjpDRqem00uT89aWnH"
  );
  const [cardDetails, setCardDetails] = useState();
  const [card, setCard] = useState();
  const [options, setOptions] = useState();
  const [paymentList, setPaymentList] = useState();
  const [customer, setCustomer] = useState();

  const defaultContext = {
    stripePromise,
    options,
    setOptions,
    cardDetails,
    setCardDetails,
    card,
    setCard,
    paymentList,
    setPaymentList,
    customer,
    setCustomer,
  };

  return (
    <StripeDataContext.Provider value={defaultContext}>
      {props.children}
    </StripeDataContext.Provider>
  );
};

export const useStripeDataContext = () => {
  return useContext(StripeDataContext);
};

export default StripeDataProvider;
