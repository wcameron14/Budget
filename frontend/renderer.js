const axios = require('axios');

let transactions = []; // Store transactions globally
let currentPage = 1;
const transactionsPerPage = 50;

function displayPage(page) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear existing content

    const start = (page - 1) * transactionsPerPage;
    const end = start + transactionsPerPage;
    const paginatedTransactions = transactions.slice(start, end);

    let table = '<table><tr><th>Date</th><th>Description</th><th>Original Description</th><th>Category</th><th>Amount</th><th>Status</th></tr>';
    paginatedTransactions.forEach(transaction => {
        table += `<tr>
                    <td>${transaction.Date || 'N/A'}</td>
                    <td>${transaction.Description || 'N/A'}</td>
                    <td>${transaction['Original Description'] || 'N/A'}</td>
                    <td>${transaction.Category || 'N/A'}</td>
                    <td>${transaction.Amount || 'N/A'}</td>
                    <td>${transaction.Status || 'N/A'}</td>
                  </tr>`;
    });
    table += '</table>';
    output.innerHTML = table;

    // Add pagination controls
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);
    let pagination = `<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">`;
    
    // Page numbers in the center
    let pageNumbers = '<div style="flex: 1; text-align: center;">';
    for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
            pageNumbers += `<span style="margin: 0 5px; font-weight: bold;">${i}</span>`;
        } else {
            pageNumbers += `<a href="#" onclick="goToPage(${i})" style="margin: 0 5px; text-decoration: none;">${i}</a>`;
        }
    }
    pageNumbers += '</div>';
    pagination += pageNumbers;

    // Next and Previous buttons on the right
    let navigationButtons = '<div style="text-align: right;">';
    if (page > 1) {
        navigationButtons += `<button onclick="previousPage()" style="padding: 5px 10px; margin-right: 10px;">Previous</button>`;
    }
    if (page < totalPages) {
        navigationButtons += `<button onclick="nextPage()" style="padding: 5px 10px;">Next</button>`;
    }
    navigationButtons += '</div>';
    pagination += navigationButtons;
    
    pagination += `</div>`;
    output.innerHTML += pagination;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

function goToPage(page) {
    currentPage = page;
    displayPage(page);
}

function categorizeTransaction(description) {
    return axios.post('http://localhost:5000/categorize_transactions', { 
        description: description
    }).then(response => {
        return response.data.category;
    }).catch(error => {
        console.error('Error categorizing the transaction:', error);
        return 'Uncategorized';  // Fallback category
    });
}

// Update the uploadCSV function to categorize transactions
function uploadCSV() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/upload_csv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        transactions = response.data;

        // Check if there's an error in the response
        if (transactions.error) {
            alert('Error: ' + transactions.error);
            return;
        }

        console.log("Transactions received:", transactions);

        // Reset the file input
        fileInput.value = '';

        // Remove any existing date range statement
        const dateRangeContainer = document.getElementById('dateRangeStatementContainer');
        dateRangeContainer.innerHTML = '';  // Clear any existing content

        // Calculate the date range
        const dates = transactions.map(t => new Date(t.Date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));

        // Add the date range statement
        const dateRangeStatement = document.createElement('p');
        dateRangeStatement.id = 'dateRangeStatement';
        dateRangeStatement.innerHTML = `Transactions from: ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`;
        dateRangeContainer.appendChild(dateRangeStatement);

        // Categorize and display the first page of transactions
        currentPage = 1;
        Promise.all(transactions.map(async (transaction) => {
            transaction.Category = await categorizeTransaction(transaction.Description);
            return transaction;
        })).then(categorizedTransactions => {
            transactions = categorizedTransactions;
            displayPage(currentPage);
        });

        // Show a confirmation message
        alert('CSV uploaded and processed successfully.');
    })
    .catch(error => {
        console.error('Error uploading the file:', error);
        alert('An error occurred during the upload. Please try again.');
    });
}
