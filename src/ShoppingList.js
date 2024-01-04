import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AddItem from './AddItem';

function ShoppingList() {
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shopping-list')) || [])
	const [expandItems, setExpandItems] = useState([])
	const [newItem, setNewItem] = useState('')

	// Update localstorage whenever items is changed
	useEffect(() => {
		localStorage.setItem('shopping-list', JSON.stringify(items))
	}, [items])

	// Get Total Price of all items from list
	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

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

	// User is adding item
	const handleAddFormChange = (e) => {
		// set default value for newItem
		if (!newItem) {
			// new ID
			const newId = items.length ? items[items.length - 1].id + 1 : 1
			// new NewItem with default id and quantity
			setNewItem((newItem) => ({
				...newItem,
				id: newId,
				quantity: 1,
				description: "no description"
			}))
		}
		setNewItem((newItem) => ({ ...newItem, [e.target.name]: e.target.value }))
	}

	return (
		<div className='m-2 p-2 relative overflow-x-auto'>
			{/* Add Item Form */}
			<AddItem
				handleAdd={handleAdd}
				handleAddFormChange={handleAddFormChange}
			/>

			{/* Items Table */}
			<div className='relative overflow-x-auto shadow-md rounded-lg'>
				<table className='w-full text-left table-fixed'>
					<thead className='uppercase bg-gray-100/20 text-white/80'>
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-300 rounded focus:ring-blue-500" />
									<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
								</div>
							</th>
							<th> Item </th>
							<th > Quantity </th>
							<th >
								<div className='flex items-center'>
									Price
									<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
									</svg></a>
								</div>
							</th>
							<th>
								<div className='flex items-center justify-centers'>
									Total
									<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
									</svg></a>
								</div>
							</th>
							<th>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id} className='bg-gray-100/5 hover:bg-gray-100/10 border-b border-white/10' >
								{/* Check */}
								<td className='flex items-center justify-center p-2'>
									<input
										type='checkbox'
										onChange={() => handleCheck(item.id)}
										checked={item.checked}
										className='w-6 h-6 m-auto p-auto'
									/>
								</td>
								{/* Item Name */}
								<td
									onDoubleClick={() => handleExpand(item.id)}
								>
									<span
										style={(item.checked) ? { textDecoration: 'line-through' } : null}
										className='text-lg font-bold'
									>
										{item.name}
									</span>
									{/* Expandable */}
									{expandItems.includes(item.id) ?
										<div>
											item.description
										</div>
										: null}
								</td>
								{/* Item Quantity */}
								<td>
									x{item.quantity}
								</td>
								{/* Item Price */}
								<td>
									${item.price}
								</td>
								{/* Item Total */}
								<td>
									${item.price * item.quantity}
								</td>
								{/* Actions */}
								<td>
									<div className='flex items-center'>
										<FaTrash
											role='button'
											tabIndex="0"
											onClick={() => handleDelete(item.id)}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
					{/* Table Foot for Total */}
					<tfoot>
						<tr className="font-semibold text-gray-900 dark:text-white">
							<th></th>
							<th></th>
							<th></th>
							<th>Total</th>
							<th>${totalPrice} </th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export default ShoppingList
