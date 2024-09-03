import pandas as pd
from database import insert_transaction, fetch_all_transactions

def ingest_csv(file):
    df = pd.read_csv(file)
    df.columns = ['Date', 'Description', 'Original Description', 'Category', 'Amount', 'Status']

    existing_transactions = fetch_all_transactions()

    new_transactions = []
    for _, row in df.iterrows():
        transaction = {
            'Date': row['Date'],
            'Description': row['Description'],
            'Original Description': row['Original Description'],
            'Category': row['Category'] if not pd.isna(row['Category']) else 'Category Pending',
            'Amount': row['Amount'],
            'Status': row['Status'] if not pd.isna(row['Status']) else 'Pending'
        }
        if transaction not in existing_transactions:
            insert_transaction(tuple(transaction.values()))  # Insert into database
            new_transactions.append(transaction)
    
    return new_transactions  # Return the list of new transactions
 