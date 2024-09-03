def generate_budget(transactions):
    budget = {}
    grouped = transactions.groupby('Category').sum()
    for category, amount in grouped['Amount'].items():
        # Example: set budget to average amount for each category
        budget[category] = round(amount / len(transactions), 2)
    return budget
 
# Sample usage: 
# budget = generate_budget(categorized_transactions)
