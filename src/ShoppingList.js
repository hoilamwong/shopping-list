import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AddItem from './AddItem';

function ShoppingList() {

	// const [items, setItems] = useState([
	// 	{
	// 		id: 1,
	// 		checked: false,
	// 		quantity: 1,
	// 		price: 12.00,
	// 		name: "Rice",
	// 		description: "something"
	// 	},
	// 	{
	// 		id: 2,
	// 		checked: false,
	// 		quantity: 1,
	// 		price: 1.00,
	// 		name: "A",
	// 		description: "something"
	// 	},
	// ])

	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shopping-list')) || [])
	const [expandItems, setExpandItems] = useState([])
	const [newItem, setNewItem] = useState('')

	// Update localstorage whenever items is changed
	useEffect(() => {
		localStorage.setItem('shopping-list', JSON.stringify(items))
	}, [items])


	// User toggle checkbox for an item
	const handleCheck = (id) => {
		// Check each item in items
		// if id is matched, reverse the checked on that item, else return original item
		const listItems = items.map((item) => item.id === id ?
			{ ...item, checked: !item.checked } : item)
			setItems(listItems)
	}

	// User toggle details of an item
	// TODO: not set in local storage
	const handleExpand = (id) => {
		// copy items using Spread operator !
		let expandItemsList = [...expandItems]

		if (expandItemsList.includes(id)) {
			expandItemsList = expandItemsList.filter((expand_id) => expand_id !== id)
		} else {
			expandItemsList.push(id)
		}
		setExpandItems(expandItemsList)
	}

	// User delete item
	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id)
		setItems(listItems)
	}

	// User add item
	const handleAdd = (e) => {
		e.preventDefault()
		e.target.reset()
		if (!newItem) return

		const listItems = [...items, newItem]
		setNewItem('')
		setItems(listItems)
	}

	const handleAddFormChange = (e) => {
		// set default value for newItem
		if(!newItem) {
			// new ID
			const newId = items.length ? items[items.length - 1].id + 1 : 1 
			// new NewItem with default id and quantity
			setNewItem((newItem) => ({ ...newItem, 
				id: newId, 
				quantity: 1,
				description: "no description"
			}))
		}
		setNewItem((newItem) => ({ ...newItem, [e.target.name]: e.target.value }))
	}

	return (
		<>
			<AddItem 
				handleAdd={handleAdd}
				handleAddFormChange={handleAddFormChange}
			/> 
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<input
							type='checkbox'
							onChange={() => handleCheck(item.id)}
							checked={item.checked}
						/>
						<label
							style={(item.checked) ? { textDecoration: 'line-through' } : null}
							onClick={() => handleExpand(item.id)}
						>
							{item.name} |
							${item.price} |
							x{item.quantity} |
							<FaTrash
								role='button'
								tabIndex="0"
								onClick={() => handleDelete(item.id)}
							/>
							<br />
							{expandItems.includes(item.id) ? item.description : null }
						</label>

					</li>
				))}
			</ul>
		</>
	)
}

export default ShoppingList
