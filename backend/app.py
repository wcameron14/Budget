from flask import Flask, request, jsonify
from flask_cors import CORS
from budget import generate_budget
from categorize import categorize_transactions  # Ensure this is imported correctly
from data_ingestion import ingest_csv
from database import create_table

app = Flask(__name__)
CORS(app) 

# Initialize the database when the app starts
print("Initializing database...")
create_table()
print("Database initialized.")

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    try:
        file = request.files['file']
        print(f"File received: {file.filename}")
        transactions = ingest_csv(file)  # Ingest CSV and return transactions
        
        # transactions is expected to be a list of dictionaries
        categorized_transactions = categorize_transactions(transactions)

        print("CSV processed successfully.")
        return jsonify(categorized_transactions)  # Send JSON response
    except Exception as e:
        print(f"Error processing CSV: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/categorize_transactions', methods=['POST'])
def categorize():
    transactions = request.json
    categorized = categorize_transactions(transactions)
    return jsonify(categorized)

@app.route('/generate_budget', methods=['POST'])
def budget():
    transactions = request.json
    budget = generate_budget(transactions)
    return jsonify(budget)

if __name__ == '__main__':
    app.run(debug=True)
