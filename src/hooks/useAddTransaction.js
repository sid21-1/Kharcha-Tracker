import React from "react";
//all fo these function are being imported from firebase firestore
//addDoc -> add document
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

const useAddTransaction = () => {
  const { userId } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    try {
      const response = await fetch("http://localhost:5000/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          description,
          transaction_amount: transactionAmount,
          transaction_type: transactionType,
        }),
      });
      if (!response.ok) {
        alert("Falied to add transaction");
      }
      const data = await response.json();
      console.log("Transaction added successfully:", data);
    } catch (error) {
      console.error("Error adding transaction", error);
    }
  };
  return { addTransaction };
};

export default useAddTransaction;
