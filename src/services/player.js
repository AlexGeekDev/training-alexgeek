import { db } from "../dataBase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const updateTimeVideo = async (email, time, course) => {
  const playerRef = doc(db, course, email);
  const playerFirestore = await getDoc(playerRef);

  if (playerFirestore.exists()) {
    await updateDoc(playerRef, {
      time,
    });
  } else {
    await setDoc(playerRef, {
      time,
    });
  }
};

export const updateLastVideo = async (email, video, course) => {
  const playerRef = doc(db, course, email);
  const playerFirestore = await getDoc(playerRef);

  if (playerFirestore.exists()) {
    await updateDoc(playerRef, {
      video,
    });
  } else {
    await setDoc(playerRef, {
      video: 1,
    });
  }
};
