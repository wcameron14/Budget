import matplotlib.pyplot as plt

def plot_spending(transactions):
    categories = transactions.groupby('Category').sum()
    categories['Amount'].plot(kind='pie', autopct='%1.1f%%')
    plt.title('Spending by Category')
    plt.show()

def plot_budget_vs_spending(transactions, budget):
    spending = transactions.groupby('Category').sum()
    categories = spending.index.tolist()
    amounts = spending['Amount'].tolist()
    budget_amounts = [budget[category] for category in categories]

    plt.bar(categories, amounts, label='Actual Spending')
    plt.bar(categories, budget_amounts, alpha=0.5, label='Budgeted Amount')
    plt.xlabel('Category')
    plt.ylabel('Amount')
    plt.title('Budget vs Spending')
    plt.legend()
    plt.show()
 
# Sample usage:
# plot_spending(categorized_transactions)
# plot_budget_vs_spending(categorized_transactions, budget)
 