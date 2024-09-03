import sqlite3

def create_connection():
    try:
        conn = sqlite3.connect('budget_app.db')
        return conn
    except sqlite3.Error as e:
        print(e)
    return None

def create_table():
    conn = create_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT,
                    description TEXT,
                    original_description TEXT,
                    category TEXT,
                    amount REAL,
                    status TEXT
                )
            ''')
            conn.commit()
            conn.close()
        except sqlite3.Error as e:
            print(f"Error creating table: {e}")
    else:
        print("Error! Cannot create the database connection.")

def insert_transaction(transaction):
    conn = create_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO transactions (date, description, original_description, category, amount, status)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', transaction)
            conn.commit()
            conn.close()
        except sqlite3.Error as e:
            print(f"Error inserting transaction: {e}")
    else:
        print("Error! Cannot create the database connection.")

def fetch_all_transactions():
    conn = create_connection()
    transactions = []
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM transactions')
            transactions = cursor.fetchall()
            conn.close()
        except sqlite3.Error as e:
            print(f"Error fetching transactions: {e}")
    return transactions
 