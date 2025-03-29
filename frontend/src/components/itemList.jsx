import { useEffect, useState,useRef } from "react";
import { fetchItems, deleteItem } from "../api";
import lod from "lodash"

const ItemList = () => {
    const [items, setItems] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const debouncedFetch = useRef(
        lod.debounce(async (query) => {
            setLoading(true);
            const data = await fetchItems(query);
            setItems(data);
            setLoading(false);
        }, 500), // Wait 500ms before making the API call
    ).current;

    // ✅ Fetch items on mount & when search changes
    useEffect(() => {
        debouncedFetch(search);
        return () => {
            debouncedFetch.cancel(); // ✅ Cleanup to prevent memory leaks
        };
    }, [search, debouncedFetch]);

    // ✅ Delete Item
    const handleDelete = async (id) => {
        await deleteItem(id);
        setItems(prev => {
            const newItems = { ...prev };
            for (let category in newItems) {
                newItems[category] = newItems[category].filter(item => item._id !== id);
            }
            return newItems;
        });
    };

    

    return (
        <div className="p-5 my-5 bg-teal-100">
            <input 
                type="text"
                placeholder="Search items..."
                className="border-b-4 border-t-2 hover:bg-gray-200 rounded-3xl text-gray-900 p-2 mb-3  "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? <p>Loading...</p> : Object.keys(items).map(category => (
                <div key={category}>
                    <h3 className="font-bold text-xl mt-5">{(category).toUpperCase()}</h3>
                    <table className="border-collapse border w-full">
                        <thead>
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items[category].map(item => (
                                <tr key={item._id}>
                                    <td className="border p-2">{(item.name)}</td>
                                    <td className="border p-2">
                                        <button className="bg-gray-400 rounded-4xl text-white px-2 py-1" 
                                            onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
