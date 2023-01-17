import { initializeApp } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const firebase = {
  app,
  db,
  auth,
};

export default firebase;

export const getUserDocId = async ({ email }: { email: string | null }) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const userDocArr = querySnapshot.docs.map((item) => item.id);
  return userDocArr[0];
};

export const getLikedMovies = async (docId: string) => {
  const ref = doc(db, "users", docId);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    return docSnap.data().liked;
  } else {
    return null;
  }
};

export const handleMovieLike = async ({
  docId,
  movieId,
  isLiked,
}: {
  docId: string;
  movieId: number;
  isLiked: boolean;
}) => {
  const userDoc = doc(db, "users", docId);
  return await setDoc(userDoc, {
    liked: isLiked ? arrayRemove(movieId) : arrayUnion(movieId),
  });
};
