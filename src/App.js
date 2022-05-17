import Paths from "./routes/Paths";
import { useUiDataContext } from "./context/uiContext";
import { useUserDataContext } from "./context/userContext";
import { auth, db } from "./dataBase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

function App() {
  const { setLoading, setRole, setActive, active } = useUiDataContext();
  const { setUserDb, userDb } = useUserDataContext();

  useEffect(() => {
    try {
      setLoading(true);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.email);
          onSnapshot(userRef, async (doc) => {
            if (doc.exists()) {
              await setUserDb(doc.data());
              await setRole("User");
              setActive(true);
              setLoading(false);
            }
          });
        } else {
          setActive(false);
          setLoading(false);
        }
      });
      console.log(userDb);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return <Paths />;
}

export default App;
