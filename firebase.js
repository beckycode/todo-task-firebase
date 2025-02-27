// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { firebaseConfig } from "./credentials.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const saveTask = async (title, description) => {
  try {
    if (!title || !description) return;
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      description,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const listTasks = async () => {
  try {
    let result = [];

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const onGetTasks = (callback) => {
  try {
    onSnapshot(collection(db, "tasks"), callback);
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (id) => {
  try {
    const response = await getDoc(doc(db, "tasks", id));
    return response.data();
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await deleteDoc(doc(db, "tasks", id));
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id, newFields) => {
  try {
    await updateDoc(doc(db, "tasks", id), newFields);
  } catch (error) {
    console.error(error);
  }
};
