import express from "express"
import { Item } from "../models/item.models.js";

const router = express.Router();
// GET all items (with filtering)
router.get("/", async (req, res) => {
  try {
        const { search } = req.query;

        // Search Filtering (if search query exists)
        let filter = search ? { name: { $regex: search, $options: "i" } } : {};

        // Fetch items
        let items = await Item.find(filter);

        // Bucketing by category
        let groupedItems = {};
        items.forEach(item => {
          const category = item.category.trim().toLowerCase();
          
            if (!groupedItems[category]) {
                groupedItems[category] = [];
            }
            groupedItems[category].push(item);
        });
        
        res.json(groupedItems);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// POST (Create)
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (Update)
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router
