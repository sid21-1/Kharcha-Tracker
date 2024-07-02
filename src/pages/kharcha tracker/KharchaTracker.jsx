import React, { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransaction from "../../hooks/useGetTransaction";

const KharchaTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };
  return (
    <>
      <div className="kharcha-tracker">
        <div className="container">
          <h1>Kharcha Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>₹0.00</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>income</h4>
              <p>₹0.00</p>
            </div>
            <div className="kharcha">
              <h4>Income</h4>
              <p>₹0.00</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              value="expense"
              checked={transactionType === "expense"}
              id="expense"
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expenses</label>
            <input
              type="radio"
              value="income"
              id="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
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
