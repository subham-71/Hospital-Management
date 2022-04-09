import { firestore as db } from "../../Components/Auth/FireBase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const itemCollectionRef = collection(db, "patient");
class ItemDataService {
  addItem = (newItem) => {
    return addDoc(itemCollectionRef, newItem);
  };

  updateItem = (id, updatedItem) => {
    const ItemDoc = doc(db, "patient", id);
    return updateDoc(ItemDoc, updatedItem);
  };

  deleteItem = (id) => {
    const ItemDoc = doc(db, "patient", id);
    return deleteDoc(ItemDoc);
  };

  getAllItems = () => {
    return getDocs(itemCollectionRef);
  };

  getItem = (id) => {
    const ItemDoc = doc(db, "patient", id);
    return getDoc(ItemDoc);
  };
}

export default new ItemDataService();
