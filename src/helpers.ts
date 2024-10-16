import { BudgetsModel } from "./models/BudgetsModel";
import { ExpenseModel } from "./models/ExpenseModel";

// local storage
export const fetchData = (key: string) => {
    const item = localStorage.getItem(key);

    // If the item exists, try to parse it, otherwise return null
    if (item) {
        try {
            return JSON.parse(item); // Attempt to parse if it's valid JSON
        } catch (error) {
            // If parsing fails, return the raw string instead
            console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
            return item; // Return the raw string
        }
    }

    return null; // Return null if the item does not exist
};

// delete item
export const deleteItem = ({key} : {key: string}) => {
    return localStorage.removeItem(key);
}

// create budget
export const createBudget = ({name, amount} : {name: string, amount: number}) => {
    const newItem: BudgetsModel = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// create expense
export const createExpense = ({name, amount, budgetId} : {name: string, amount: number, budgetId: string}) => {
    const newItem: ExpenseModel = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetLength * 34} 65% 50%`;  // hue, saturation, lightness
}

export const wait = () => {
    return new Promise((res) => {
        setTimeout(res, Math.random() * 2000);
    });
}

// total spent by budget
export const calculateSpentByBudget = (budgetId: string) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc: number, expense: ExpenseModel) => {
        // check if expenses.id === budgetId
        if (expense.budgetId !== budgetId) {
            return acc;
        }
        // add current amount to total
        return acc += expense.amount;
    }, 0);

    return budgetSpent;
}

// Formatting

// Format Currency
export const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "ZAR",
    });
}

export const formatPercentage = (amount: number) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
}