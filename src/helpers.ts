// local storage
export const fetchData = (key: string): any => {
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
export const deleteItem = ({key} : {key: any}) => {
    return localStorage.removeItem(key);
}

// create budget
export const createBudget = ({name, amount} : {name: string, amount: number}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
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