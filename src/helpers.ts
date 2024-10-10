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