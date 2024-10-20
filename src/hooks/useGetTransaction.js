import { useState, useEffect } from "react";
// import {
//   query,
//   collection,
//   where,
//   orderBy,
//   onSnapshot,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (userID) {
          console.log("UserID:", userID);
          const response = await fetch(
            `http://localhost:5000/transactions?userid=${userID}`
          );
          const result = await response.json();
          if (response.ok) {
            console.log(result.data);
            setTransactions(result.data);
          } else {
            console.error("Error fetching transactions");
          }
        }
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [userID]);
  return { transactions, transactionTotals };
};

// const useGetTransaction = () => {
//   const [transactions, setTransactions] = useState([]);
//   const transactionCollectionRef = collection(db, "transaction");

//   const { userID } = useGetUserInfo();

//   const [transactionTotals, setTransactionTotals] = useState({
//     balance: 0.0,
//     income: 0.0,
//     expenses: 0.0,
//   });

//   const getTransactions = async () => {
//     let unsubscribe;
//     try {
//       //here we write down the query and also make the reference to which the query needs to be satisfied
//       const queryTransactions = query(
//         transactionCollectionRef,
//         where("userID", "==", userID),
//         orderBy("createdAt")
//       );

//       //onSnapshot is a function that comes from firebase and it will basically keep tracking for a query if there are any changes made

//       //snapshot contains the data that we need for the users
//       unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
//         let docs = [];
//         let totalIncome = 0;
//         let totalExpenses = 0;
//         snapshot.forEach((doc) => {
//           //doc.data() is function that will return all the firebase data
//           const data = doc.data();
//           //doc.id is a firebase feature to give us unique id
//           const id = doc.id;

//           docs.push({ ...data, id });
//           if (data.transactionType === "expense") {
//             totalExpenses += Number(data.transactionAmount);
//           } else {
//             totalIncome += Number(data.transactionAmount);
//           }
//         });
//         setTransactions(docs);

//         let balance = totalIncome - totalExpenses;
//         setTransactionTotals({
//           balance,
//           expenses: totalExpenses,
//           income: totalIncome,
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     //this is the clean up function
//     return () => unsubscribe();
//   };
//   useEffect(() => {
//     getTransactions();
//   }, []);
//   return { transactions, transactionTotals, handleDelete };
// };

export default useGetTransaction;

export const handleDelete = async (id) => {
  try {
    const transactionDocRef = doc(db, "transaction", id);
    await deleteDoc(transactionDocRef);
    // console.log("Transaction deleted successfully");
  } catch (error) {
    console.log("Error deleting transaction:", error);
  }
};
