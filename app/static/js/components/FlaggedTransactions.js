import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionEdit from './TransactionEdit';

const FlaggedTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchFlaggedTransactions();
  }, []);

  const fetchFlaggedTransactions = () => {
    axios.get('/api/transactions/flagged').then(response => {
      setTransactions(response.data);
    });
  };

  const handleAccept = (transaction) => {
    axios.put(`/api/transactions/${transaction.id}`, { ...transaction, flagged: false })
      .then(() => {
        fetchFlaggedTransactions();
      });
  };

  const handleUpdate = (updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  return (
    <div>
      <h2>Flagged Transactions</h2>
      {transactions.map(transaction => (
        <div key={transaction.id}>
          <p>{transaction.description} - {transaction.amount}</p>
          <p>Current Category: {transaction.category}</p>
          <TransactionEdit transaction={transaction} onUpdate={handleUpdate} />
          <button onClick={() => handleAccept(transaction)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

export default FlaggedTransactions;