# Budget App - Detailed README

## Overview

The Budget App is a local, privacy-focused application designed to help users categorize, track, and budget their personal finances. It allows users to upload transaction data from their bank accounts via CSV files and provides tools for categorizing transactions, reviewing unclassified transactions, and generating budgets based on historical spending habits. The app is designed to be used entirely offline, ensuring that no personal financial data is sent to external servers or cloud services.

## Intention of the Application

The primary goal of the Budget App is to empower users to take control of their personal finances in a secure and private environment. Unlike many online budgeting tools, this app is designed to work entirely offline, ensuring that sensitive financial information remains on the user's device. The application provides a streamlined, user-friendly interface for managing financial data, with a focus on accuracy, ease of use, and customization.

The intention is to build a tool that not only helps users understand their spending habits but also guides them in making informed financial decisions through budgeting and historical analysis. As the application evolves, additional features such as graphical spending reports, advanced categorization techniques, and personalized financial advice are planned to be integrated.

## Tech Stack

### Frontend
- **Electron**: Electron is used to build the cross-platform desktop application. It allows for the creation of a local app using web technologies like HTML, CSS, and JavaScript while integrating deeply with the operating system.
- **Axios**: Axios is used to make HTTP requests from the frontend to the backend. It's employed for tasks such as uploading CSV files and sending transaction data for categorization.

### Backend
- **Flask**: Flask is a lightweight Python web framework used to create the backend API. It handles requests from the frontend and processes the data, including ingestion of CSV files, categorization of transactions, and budget generation.
- **SQLite**: SQLite is used as the local database for storing transaction data and historical categorizations. It’s lightweight and requires no separate server, making it ideal for a local application.
- **Pandas**: Pandas is used for data manipulation, particularly for reading and processing the CSV files containing transaction data.
- **Python**: Core logic, including categorization algorithms and data processing, is implemented in Python.

### Key Python Modules
- **Flask-CORS**: Handles Cross-Origin Resource Sharing (CORS), allowing the frontend (Electron) to communicate with the backend (Flask) without security issues.
- **Categories Module**: A custom Python module (`categories.py`) containing predefined categories and subcategories used to enforce consistency in transaction categorization.
- **Categorization Logic**: The core logic that handles categorization, checks existing categories, flags unrecognized categories for review, and applies a rules engine for transactions marked as "Pending".

## Infrastructure

The Budget App is built as a single-user, local desktop application with the following infrastructure components:

1. **Electron Frontend**:
   - Provides the user interface.
   - Allows users to upload CSV files, view categorized transactions, and interact with the application.
   - Communicates with the backend via HTTP requests (handled by Axios).

2. **Flask Backend**:
   - Acts as the server, processing requests from the frontend.
   - Handles CSV ingestion, transaction categorization, and budget generation.
   - Interacts with the SQLite database for storing and retrieving data.

3. **SQLite Database**:
   - Stores transactions, categories, and other relevant financial data.
   - Used for historical analysis and applying rules to categorize new transactions.

## Key Features

### 1. **CSV Ingestion**
- Users can upload CSV files containing their transaction data.
- The application parses the CSV file, converting it into a list of transaction dictionaries that can be processed by the backend.

### 2. **Transaction Categorization**
- **Category Validation**: Ensures that each transaction’s category matches a predefined list of valid categories in `categories.py`.
- **Flagging for Review**: Transactions with categories not found in the predefined list are flagged for manual review.
- **Pending Categorization**: Transactions marked as "Pending" are reassigned categories based on a simple rules engine that checks the transaction description against known patterns.

### 3. **Rules Engine**
- A simple rules-based engine determines the appropriate category for transactions marked as "Pending".
- The engine applies logic such as recognizing patterns in descriptions (e.g., transactions at "Walmart" are categorized as "Groceries").

### 4. **Data Storage**
- Transactions are stored in an SQLite database, which allows for historical analysis and persistence of data between sessions.

### 5. **Budget Generation (Planned)**
- Based on historical transaction data, the app will generate budgets to help users plan their spending.
- Budgets can be customized by category and time period.

### 6. **User Feedback and Review**
- Users can manually review and correct any flagged transactions, with corrections feeding back into the rules engine for improved accuracy over time.

## How to Use

### 1. **Installation**
- Clone the repository to your local machine.
- Install the required Python dependencies using `pip install -r requirements.txt`.
- Run `npm install` to install the necessary Node.js modules for the Electron frontend.

### 2. **Running the Application**
- Start the Flask backend by running `python app.py` in the backend directory.
- Launch the Electron frontend with `npm start` in the frontend directory.

### 3. **Uploading Transactions**
- Use the "Upload CSV" button in the app to upload your transaction data.
- The backend will process the CSV, categorize the transactions, and display the results in the app.

### 4. **Reviewing and Correcting Transactions**
- Review flagged transactions and manually assign categories where necessary.
- Future transactions will be categorized more accurately based on your corrections.

### 5. **Generating Budgets**
- (Planned) Use the budget generation feature to create budgets based on your historical spending data.

## Future Development

- **Advanced Rules Engine**: Develop a more sophisticated rules engine that learns from user behavior and improves over time.
- **Graphical Reports**: Introduce graphical representations of spending patterns and budget adherence.
- **LLM Integration**: Potentially integrate a local LLM to provide personalized financial advice based on user data.

## Contributing

We welcome contributions to enhance the functionality and features of the Budget App. Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the existing style and passes all tests before submitting.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

 