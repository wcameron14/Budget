from categories import categories

def categorize_transactions(transactions):
    categorized_transactions = []
    
    for transaction in transactions:
        if isinstance(transaction, str):
            # If the transaction is a string, assume it's the description and create a default transaction dictionary
            transaction = {'Description': transaction, 'Category': 'Pending'}
        
        description = transaction['Description'].strip().lower()
        category = transaction.get('Category', 'Pending').strip().lower()

        # Check if the category is already valid and matches a known category
        if category != 'pending':
            if any(category in subcat.lower() for subcat in categories.keys()):
                categorized_transactions.append(transaction)
                continue
            else:
                transaction['Category'] = 'Flagged for Review'
                categorized_transactions.append(transaction)
                continue

        # For "Pending" categories, apply the rules engine
        if category == 'pending':
            transaction['Category'] = apply_rules_engine(description)

        categorized_transactions.append(transaction)

    return categorized_transactions

def apply_rules_engine(description):
    # Placeholder for rules engine logic
    # Simple rule-based engine for demo purposes
    if 'walmart' in description:
        return 'Groceries'
    if 'restaurant' in description or 'dining' in description:
        return 'Eating Out'
    if 'gas' in description or 'fuel' in description:
        return 'Auto'

    return 'Uncategorized'
 