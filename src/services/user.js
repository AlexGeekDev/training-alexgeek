import { db, storage } from "../dataBase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Swal from "sweetalert2";

export const profileSttings = async (email, name, image, photo) => {
  const userRef = doc(db, "users", email);
  await updateProfilePhoto(email, image, photo);

  await updateDoc(userRef, {
    name: name,
  });

  Swal.fire(
    "Updated Data Successfully",
    "Your data has been updated.",
    "success"
  );
};

export const updateProfilePhoto = async (email, image, photo) => {
  const storageRef = ref(storage, `users/${email}/profile/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  const httpsReference = ref(storage, photo);
  deleteObject(httpsReference)
    .then(async () => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const userRef = doc(db, "users", email);
        updateDoc(userRef, {
          photo: downloadURL,
        });
      });
    }
  );
};
