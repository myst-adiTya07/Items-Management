import { useState } from 'react'

import './App.css'
import ItemList from './components/itemList'
import AddItem from './components/addItem';

function App() {
  const [items, setItems] = useState({});
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold p-10">Item Management</h1>
      <AddItem onItemAdded={(newItem) => setItems({ ...items, newItem })} />
      <ItemList />
    </div>
  )
}

export default App
