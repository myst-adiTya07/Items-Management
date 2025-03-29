import { useState } from "react";
import { createItem } from "../api";

const AddItem = ({ onItemAdded }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = await createItem({ name, category });
        onItemAdded(newItem);
        setName("");
        setCategory("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-amber-100">
            <input type="text" placeholder="Item Name" required className="border p-2 mr-2 rounded-3xl"
                value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Category" required className="border p-2 mr-2 rounded-3xl"
                value={category} onChange={(e) => setCategory((e.target.value))} />
            <button type="submit" className="bg-blue-300 rounded-4xl text-gray-600 px-3 py-2">Add Item</button>
        </form>
    );
};

export default AddItem;
