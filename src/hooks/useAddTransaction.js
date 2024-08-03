import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

const useAddTransaction = () => {
  const { userID } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transaction");

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    transactionDate,
    transactionSubCatagory,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      transactionDate,
      transactionSubCatagory,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransaction;
