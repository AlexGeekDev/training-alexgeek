import { Fragment, useEffect, useState } from "react";
import Paths from "./routes/Paths";
import { useUiDataContext } from "./context/uiContext";
import { useUserDataContext } from "./context/userContext";
import { useStripeDataContext } from "./context/stripeContext";
import { auth, db } from "./dataBase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { apiPaymentList, apiGetCustomer } from "./services/stripe";

function App() {
  const { setLoading, setRole, setActive, active } = useUiDataContext();
  const { setUserDb, setEnglish, userDb } = useUserDataContext();
  const { setOptions, setPaymentList, setCustomer } = useStripeDataContext();

  useEffect(() => {
    try {
      setLoading(true);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.email);
          const englishRef = doc(db, "english", user.email);
          onSnapshot(userRef, async (doc) => {
            if (doc.exists()) {
              let path = doc.data().name.replace(/\s+/g, "");
              await setRole("User");
              await setUserDb({ ...doc.data(), path });
              if (doc.data().paymentMethod) {
                await setOptions({
                  clientSecret: doc.data().stripe.clientSecret,
                });
                handlePaymentList(doc.data());
                handleGetCustomer(doc.data());
              }
              setActive(true);
              setLoading(false);
            }
          });
          onSnapshot(englishRef, async (course) => {
            if (course.exists()) {
              setEnglish(course.data());
            }
          });
        } else {
          setActive(false);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const handlePaymentList = async (user) => {
    const { data } = await apiPaymentList.post("/api/paymentsList", {
      customerId: user.stripe.customerId,
    });
    if (data) {
      await setPaymentList(data.paymentList.data);
    }
  };

  const handleGetCustomer = async (user) => {
    const { data } = await apiGetCustomer.post("/api/getCustomer", {
      customerId: user.stripe.customerId,
    });
    if (data) {
      await setCustomer(data.customer);
    }
  };

  return <Paths />;
}

export default App;
