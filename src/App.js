import { Fragment, useEffect, useState } from "react";
import Paths from "./routes/Paths";
import { useUiDataContext } from "./context/uiContext";
import { useUserDataContext } from "./context/userContext";
import { auth, db } from "./dataBase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const { setLoading, setRole, setActive, active } = useUiDataContext();
  const { setUserDb, setEnglish } = useUserDataContext();

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

  return <Paths />;
}

export default App;
