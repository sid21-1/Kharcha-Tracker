import React, { useState, useEffect } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransaction from "../../hooks/useGetTransaction";
import { handleDelete } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import defaultProfilePhoto from "../../assets/black.jpg";
import MyDatePicker from "../date picker/MyDatePicker";

const KharchaTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionSubCatagory, setTransactioSubCatagory] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  // console.log(transactionDate);
  const { balance, income, expenses } = transactionTotals;

  // dropdown
  const handleRadioChange = (e) => {
    setTransactionType(e.target.value);
    if (e.target.value === "expense") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // State to track the remaining time
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

  // Start the timer when the component is rendered
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // console.log(prevTime);
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

  //reset timer function

  const resetTimer = () => {
    setTimeLeft(5 * 60);
  };

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
      transactionDate,
      transactionSubCatagory,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const defaultName = "User";

  return (
    <div className="bg-[#EEF3F9] ">
      <div className="kharcha-tracker flex w-full h-screen justify-center ">
        {/* landing page */}
        <div className="container  flex flex-col my-4 p-5  bg-[#ffffff] rounded shadow-2xl w-[90%] h-[90%]">
          {/* Header Section */}
          <div className="flex justify-between ">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold">
              {`${name || defaultName}'s Kharcha Tracker`}
              {/* Timer UI */}
              <div className=" flex flex-col mt-3 md:mt-10">
                <h2 className="text-2xl font-semibold">
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
                  {timeLeft % 60} min
                </h2>
                <button
                  onClick={resetTimer}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
                >
                  ResetTimer
                </button>
              </div>
            </h1>
            {/* Profile Photo UI and Button */}
            {(profilePhoto || defaultProfilePhoto) && (
              <div className=" flex items-center flex-col w-3/5 sm:w-auto  ">
                <img className="rounded-full mb-4" src={profilePhoto} alt="" />
                <button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

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
            <div className="flex flex-col md:flex-row   ">
              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-2/5 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-10 mb-5"
                type="text"
                value={description}
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full md:w-2/5  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
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
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
              />
              <label htmlFor="income">Income</label>

              {showDropdown && (
                <div>
                  <label htmlFor="expenseCatagoryId">Choose a catagory</label>
                  <select
                    name=""
                    id="expenseCatagoryId"
                    onChange={(e) => {
                      setTransactioSubCatagory(e.target.value);
                    }}
                  >
                    <option value="rent">Rent</option>
                    <option value="utilities">Utilities</option>
                    <option value="groceries">Groceries</option>
                  </select>
                </div>
              )}
            </div>
            <div className="mb-5">
              <MyDatePicker
                startDate={transactionDate}
                setStartDate={setTransactionDate}
                className="bg-black"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className=" flex flex-col m-auto w-[90%] mt-5 border rounded shadow-2xl bg-[#ffffff]">
        <h3 className="text-3xl font-bold mb-4 text-center">Transactions</h3>
        <ul className="flex justify-evenly items-center w-full border-t border-gray-300">
          <li className="w-1/5 text-center font-bold">Description</li>
          <li className="w-1/5 text-center font-bold">Money</li>
          <li className="w-1/5 text-center font-bold">Income/Expense</li>
          <li className="w-1/5 text-center font-bold">Date</li>
          <li className="w-1/5 text-center font-bold">Delete Entry</li>
        </ul>
        <ul className="w-full">
          {transactions.map((transaction, index) => {
            const {
              id,
              description,
              transactionAmount,
              transactionType,
              transactionDate,
            } = transaction;
            return (
              <li
                key={index}
                className="flex justify-evenly px-5 py-2 border-t border-gray-300 w-full"
              >
                <span className="w-1/5 text-center">{description}</span>
                <span className="w-1/5 text-center">₹{transactionAmount}</span>
                <span className="w-1/5 text-center">{transactionType}</span>
                <span className="w-1/5 text-center">
                  {transactionDate
                    ? transactionDate.toDate().toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="w-1/5 text-center">
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default KharchaTracker;
