import { auth, db, googleAuth, faceAuth, storage } from "../dataBase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import userProfile from "../assets/photos/UserProfile.png";

export const regWithEmail = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      const userRef = doc(db, "users", user.email);
      const defaultPhoto = userProfile;

      await updateProfile(auth.currentUser, {
        photoURL: defaultPhoto,
        displayName: name,
      });
      const userData = {
        uid: user.uid,
        email: user.email,
        name: name,
        photo: user.photoURL,
        verified: user.emailVerified,
        role: "User",
        isAnonymous: user.isAnonymous,
        date: new Date().getTime(),
        provider: "e-mail",
        logins: 1,
        lastLogin: new Date().getTime(),
        paymentMethod: false,
      };
      await setDoc(userRef, userData);

      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        })
        .catch(function (error) {
          console.log(error);
        });
      Swal.fire(
        "Bienvenido a Janz",
        "Verifique su cuenta de correo electrónico, le enviaremos un correo electrónico, al hacerlo, simplemente vuelva a cargar el navegador para poder navegar como un usuario verificado.",
        "success"
      );
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
      console.log(error);
    });
};

export const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const userRef = doc(db, "users", email);
      const userFirestore = await getDoc(userRef);
      if (userFirestore.exists()) {
        const logins = userFirestore.data().logins;
        await updateDoc(userRef, {
          lastLogin: new Date().getTime(),
          logins: logins + 1,
        });
      }
      Swal.fire(
        "Bienvenido a Janz",
        "Ahora puedes navegar como un usuario registrado",
        "success"
      );
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
};

export const logout = async () => {
  signOut(auth)
    .then(() => {
      Swal.fire(
        "¡Te echaremos de menos!",
        "Te esperamos de regreso pronto",
        "success"
      );
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const regWithGoogle = async () => {
  signInWithPopup(auth, googleAuth)
    .then(async (result) => {
      const user = result.user;
      const userRef = doc(db, "users", user.email);
      const userFirestore = await getDoc(userRef);

      if (userFirestore.exists()) {
        const logins = userFirestore.data().logins;
        await updateDoc(userRef, {
          lastLogin: new Date().getTime(),
          logins: logins + 1,
        });
      } else {
        const userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          verified: user.emailVerified,
          photo: user.photoURL,
          role: "User",
          isAnonymous: user.isAnonymous,
          date: new Date().getTime(),
          points: 0,
          changePhoto: true,
          provider: "google",
          freeUses: 0,
          logins: 1,
          lastLogin: new Date().getTime(),
          paymentMethod: false,
        };
        await setDoc(userRef, userData);

        Swal.fire(
          "Welcome to Janz",
          "Please verify your email account we will send you an email, by doing so just reload the browser to be able to navigate as a verified user",
          "success"
        );
      }
    })
    .catch((error) => {
      Swal.fire("Error", `${error.message}`, "error");
      console.log(error);
      // ...
    });
};

export const regWithFacebook = async () => {
  signInWithPopup(auth, faceAuth)
    .then(async (result) => {
      const user = result.user;
      const userRef = doc(db, "users", user.email);
      const userFirestore = await getDoc(userRef);

      if (userFirestore.exists()) {
        const logins = userFirestore.data().logins;
        await updateDoc(userRef, {
          lastLogin: new Date().getTime(),
          logins: logins + 1,
        });
      } else {
        const userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          verified: user.emailVerified,
          photo: user.photoURL,
          role: "User",
          isAnonymous: user.isAnonymous,
          date: new Date().getTime(),
          points: 0,
          changePhoto: true,
          provider: "google",
          freeUses: 0,
          logins: 1,
          lastLogin: new Date().getTime(),
          paymentMethod: false,
        };
        await setDoc(userRef, userData);

        Swal.fire(
          "Welcome to Janz",
          "Please verify your email account we will send you an email, by doing so just reload the browser to be able to navigate as a verified user",
          "success"
        );
      }
    })
    .catch((error) => {
      Swal.fire("Error", `${error.message}`, "error");
      console.log(error);
      // ...
    });
};
