// src/ChartComponent.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";

const useChartComponent = () => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, "aggregate-transaction");
      const [aggregatedData, setAggregatedData] = useState([]);

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });

      // const dataSnapshot = await getDocs(dataCollection);
      // const dataList = dataSnapshot.docs.map((doc) => doc.data());
      // const labels = dataList.map((item) =>
      //   new Date(item.transactionDate.seconds * 1000).toLocaleDateString()
      // );
      // const values = dataList.map((item) => item.transactionAmount);
      // setChartData({
      //   labels: labels,
      //   datasets: [
      //     {
      //       label: "Transaction Amount",
      //       data: values,
      //       backgroundColor: "rgba(75, 192, 192, 0.2)",
      //       borderColor: "rgba(75, 192, 192, 1)",
      //       borderWidth: 1,
      //     },
      //   ],
      // });
    };
    fetchData();
  }, []);
  // return (
  //   <div>
  //     <Line data={chartData} />
  //   </div>
  // );
};

export default useChartComponent;
