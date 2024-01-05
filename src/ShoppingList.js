import React, { useEffect, useState } from 'react'
import { FaTrash, FaPen } from "react-icons/fa";
import AddItem from './AddItem';
import AddItem2 from './AddItem2';

function ShoppingList() {
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shopping-list')) || [])
	const [expandItems, setExpandItems] = useState([])
	const [newItem, setNewItem] = useState('')
	const [allCheck, setAllCheck] = useState(false)

	const defaultItemsList = {
		id : items.length ? items[items.length - 1].id + 1 : 1,
		checked : false,
		quantity: 1,
		price: 0,
		description: "no description yet..."
	}

	// Action for when items is changed
	useEffect(() => {
		// Update localstorage whenever items is changed
		localStorage.setItem('shopping-list', JSON.stringify(items))

		// Check if all is checked
		const allChecked = items.every(item => item.checked)
		console.log(allChecked);
		setAllCheck(allChecked)
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

	const handleAllCheck = () => {
		const listItems = items.map((item) => ({...item, checked : !allCheck}))
		setAllCheck(!allCheck)
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
		// e.preventDefault()
		// e.target.reset()
		if (!newItem) return

		const listItems = [...items, newItem]
		setNewItem('')
		setItems(listItems)
	}

	// User is adding item
	const handleAddFormChange = (e) => {
		// set default value for newItem
		if (!newItem) {
			setNewItem(defaultItemsList)
		}
		setNewItem((newItem) => ({ ...newItem, [e.target.name]: e.target.value }))
	}



	return (
		<div className='m-2 p-2 relative overflow-x-auto'>
			{/* Add Item Form */}
			{/* <AddItem
				handleAdd={handleAdd}
				handleAddFormChange={handleAddFormChange}
			/> */}

			{/* Items Table */}
			<div className='relative overflow-x-auto shadow-md rounded-lg'>
				<table className='w-full text-left table-fixed'>

					{/* Table Head */}
					<thead className='uppercase bg-gray-100/20 text-white/80 text-sm'>
						<tr>
							<th scope="col" className="p-2 w-16">
								<div className="flex items-center justify-center">
									<input id="checkbox-all-search" checked={allCheck}  type="checkbox" className="w-4 h-4 text-gray-900 bg-gray-500 rounded border-gray-700 rounded focus:ring-gray-500" onChange={handleAllCheck}/>
									<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
								</div>
							</th>
							<th scope="col" className="md:w-1/3 lg:w-1/2"> Item </th>
							<th className='w-24 md:w-36'> 
								<span className="hidden md:inline-flex">
									Quantity 
								</span> 
							</th>
							<th className="hidden lg:table-cell w-24">
								<div className='flex items-center justify-centers'>
									Price
									<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
									</svg></a>
								</div>
							</th>
							<th className='w-12 lg:w-24'>
								<div className='flex items-center justify-centers'>
									Total
									<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
									</svg></a>
								</div>
							</th>
							<th className='w-32 text-center'>
									Action
							</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody>
						<AddItem2
							newItem={newItem}
							handleAdd={handleAdd}
							handleAddFormChange={handleAddFormChange}
						/>
						{items.map((item) => (
							<tr key={item.id} className='bg-gray-100/5 hover:bg-gray-100/10 border-b border-white/10' >
								
								{/* Check */}
								<td className='table-cell items-center justify-center p-2'>
									<div className="flex items-center justify-center">
										<input type="checkbox"
											className="cursor-pointer w-4 h-4 text-gray-900 bg-gray-500 rounded border-gray-700 rounded focus:ring-gray-500"
											onChange={() => handleCheck(item.id)}
											checked={item.checked}
										/>
										<label htmlFor="checkbox-item" className="sr-only">checkbox</label>
									</div>
								</td>

								{/* Item Name */}
								<td
									onClick={() => handleExpand(item.id)}
									className='p-1 cursor-pointer'
								>
									<span
										style={(item.checked) ? { textDecoration: 'line-through' } : null}
										className='text-lg font-bold'
									>
										{item.name}
									</span>
									{/* Expandable */}
									{expandItems.includes(item.id) ?
										<div className='text-white/60'>
											{/* Description */}
											<div>
												{item.description}
											</div>
											{/* Price */}
											<div className='lg:hidden'>
												<span className='uppercase'>price</span>: ${item.price}
											</div>
											{/* Quantity */}
											<div className='md:hidden'>
												<span className='uppercase'>qty</span>: {item.quantity}
											</div>
										</div>
										: null}
								</td>

								{/* Item Quantity */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer'
								>
									x {item.quantity}
								</td>

								{/* Item Price */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer hidden lg:table-cell'
								>
									$ <span className='ml-1 mr-1'> {item.price} </span>
								</td>

								{/* Item Total */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer'
								>
									$ <span className='ml-1 mr-1'> {item.price * item.quantity} </span>
								</td>

								{/* Actions */}
								<td>
									<div className='flex items-center justify-center ml-2 mr-2'>
										<FaTrash
											role='button'
											tabIndex="0"
											onClick={() => handleDelete(item.id)}
											className='m-1'
										/>
										<FaPen
											role='button'
											tabIndex="0"
											onClick={() => handleDelete(item.id)}
											className='m-1'
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
							<th>$ <span className='ml-1 mr-1'> {totalPrice} </span> </th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export default ShoppingList
