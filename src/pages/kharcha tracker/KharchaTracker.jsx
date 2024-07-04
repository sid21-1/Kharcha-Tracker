import React, { useState, useEffect } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransaction from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const KharchaTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expenses } = transactionTotals;

  // State to track the remaining time
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 5 minutes in seconds

  // Start the timer when the component is rendered
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        console.log(prevTime);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect the user to login page when the time runs out
  useEffect(() => {
    if (timeLeft <= 0) {
      handleLogout();
    }
  }, [timeLeft]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!transactionAmount || transactionAmount <= 0) {
      alert("Please enter a value greater than zero");
      return;
    }

    if (transactionType === "expense") {
      if (transactionTotals.balance - transactionAmount <= 0) {
        alert("blance cannot be negative");
        return;
      }
    }

    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  return (
    <>
      <div className="kharcha-tracker flex">
        <div className="container w-1/2 flex flex-col my-4 mx-32">
          <h1 className="text-3xl font-bold mb-2">{name}'s Kharcha Tracker</h1>
          <div className="balance mb-2">
            <h3 className="font-bold text-xl">Your Balance</h3>
            {balance >= 0 ? <h2>₹{balance}</h2> : <h2>-₹{balance * -1}</h2>}
          </div>
          <div className="summary mb-2">
            <div className="income mb-2">
              <h4 className="font-bold text-xl">Income</h4>
              <p>₹{income}</p>
            </div>
            <div className="kharcha mb-2">
              <h4 className="font-bold text-xl">Expense</h4>
              <p>₹{expenses}</p>
            </div>
          </div>
          <form className="add-transaction flex flex-col" onSubmit={onSubmit}>
            <div className="flex">
              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-10"
                type="text"
                value={description}
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={transactionAmount}
                placeholder="Amount"
                required
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
              />
            </div>
            <div className="mb-5">
              <input
                className="mr-2"
                type="radio"
                value="expense"
                checked={transactionType === "expense"}
                id="expense"
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label className="mr-6" htmlFor="expense">
                Expenses
              </label>
              <input
                className="mr-2"
                type="radio"
                value="income"
                id="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Timer UI */}
        <div>
          <h2 className="text-3xl">
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60} min
          </h2>
        </div>

        {/* Profile Photo UI and Button */}
        {profilePhoto && (
          <div className="w-1/2 flex justify-center items-center flex-col">
            <img
              className="rounded-full mb-4 w-40 h-40"
              src={profilePhoto}
              alt=""
            />
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col m-auto items-center justify-center mt-5 border-2 border-black w-1/2">
        <h3 className="text-3xl font-bold mb-4">Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={index} className="font-medium text-xl">
                <h4>{description}</h4>
                <p>
                  ₹{transactionAmount} * <label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default KharchaTracker;
