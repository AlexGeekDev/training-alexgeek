import axios from "axios";

export const apiCreateCustomer = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripeCustomer",
  // baseURL: "http://192.168.0.10:5001/",
});

export const apiAttachPaymentMethod = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/attachStripePaymentMethod",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiDefaultPaymentMethod = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/setDefaultPaymentMethod",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiDetachPaymentMethod = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/detachStripePaymentMethod",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiGetCustomer = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/getStripeCustomer",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiCreateIdentity = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripeIdentity",
  // baseURL: "http://192.168.0.10:5002/",
});

export const apiCreateIdentityReport = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripeIdentityReport",
  // baseURL: "http://192.168.0.10:5002/",
});

export const apiPaymentList = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/listPaymentMethods",
  // baseURL: "http://192.168.0.10:5004/",
});

export const apiCreatePaymentInit = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripePaymentInit",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiCreatePayment = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripePayment",
  // baseURL: "http://192.168.0.10:5003/",
});

export const apiCreateStripeAccount = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL:
    "https://us-central1-trainingalexgeek.cloudfunctions.net/createStripeAccount",
  // baseURL: "http://192.168.0.10:5003/",
});
