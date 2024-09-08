from flask import Flask, request, jsonify
from flask_cors import CORS
from budget import generate_budget
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
        transactions = ingest_csv(file)  # Ingest CSV without categorization
        return jsonify(transactions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/generate_budget', methods=['POST'])
def budget():
    transactions = request.json
    budget = generate_budget(transactions)
    return jsonify(budget)


if __name__ == '__main__':
    app.run(debug=True)
