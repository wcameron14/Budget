import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionEdit = ({ transaction, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(transaction.category);
  const [selectedSubcategory, setSelectedSubcategory] = useState(transaction.subcategory);

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('/api/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubmit = () => {
    const updatedTransaction = {
      ...transaction,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      flagged: false
    };
    axios.put(`/api/transactions/${transaction.id}`, updatedTransaction).then(() => {
      onUpdate(updatedTransaction);
    });
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map(cat => (
          <option key={cat.name} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
        {categories.find(c => c.name === selectedCategory)?.subcategories.map(sub => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default TransactionEdit;