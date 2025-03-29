import axios from "axios";

const API_BASE_URL = "https://items-management-xqs4.onrender.com/api/items";

// GET Items (with search filtering)
export const fetchItems = async (search = "") => {
    try {
        const response = await axios.get(`${API_BASE_URL}`, { params: { search } });
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return {};
    }
};

//  CREATE Item
export const createItem = async (item) => {
    try {
        const response = await axios.post(API_BASE_URL, item);
        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
    }
};

//  UPDATE Item
export const updateItem = async (id, item) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, item);
        return response.data;
    } catch (error) {
        console.error("Error updating item:", error);
    }
};

// DELETE Item
export const deleteItem = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};
