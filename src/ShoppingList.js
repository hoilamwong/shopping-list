import React, { useEffect, useState, useRef } from 'react'
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import AddItem from './AddItem';

function ShoppingList() {
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shopping-list')) || [])
	const [expandItems, setExpandItems] = useState([])
	const [newItem, setNewItem] = useState('')

	const [allCheck, setAllCheck] = useState(false)
	const [allExpand, setAllExpand] = useState(false)

	const [addItem, setAddItem] = useState(true)

	const inputRef = useRef(null);

	const defaultItemsList = {
		id: items.length ? items[items.length - 1].id + 1 : 1,
		checked: false,
		quantity: 1,
		price: 0,
		description: ""
	}

	// Update allExpand if expandItems is changed
	useEffect(() => {
		const newExpandItems = items.map((item) => item.id)
		setAllExpand(expandItems.length === newExpandItems.length)
	}, [expandItems, items])

	// Update items in localstorage and update all checkboxes
	// Whenever an item is changed / added
	useEffect(() => {
		// Update localstorage whenever items is changed
		localStorage.setItem('shopping-list', JSON.stringify(items))

		// Check if all is checked
		const allChecked = items.every(item => item.checked)
		setAllCheck(allChecked)
		setNewItem(defaultItemsList)
	}, [, items])

	// Get Total Price of all items from list
	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

	// User reset form
	const handleReset = () => {
		//Reset Style
		document.getElementById('addFormItemName').style.border = "none"
		inputRef.current.focus();

		// Set New Item
		setNewItem(defaultItemsList)
	}

	// User toggle checkbox for an item
	const handleCheck = (id) => {
		// Check each item in items
		// if id is matched, reverse the checked on that item, else return original item
		const listItems = items.map((item) => item.id === id ?
			{ ...item, checked: !item.checked } : item)
		setItems(listItems)
	}

	// User toggle all checkbox
	const handleAllCheck = () => {
		// toggle all checkboxes 
		const listItems = items.map((item) => ({ ...item, checked: !allCheck }))
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

	// Toggle expand
	const toggleExpand = () => {
		if (!allExpand) {
			const newExpandItems = items.map((item) => item.id)
			setExpandItems(newExpandItems)
		} else {
			setExpandItems([])
		}
		setAllExpand(!allExpand)
	}

	// User delete item
	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id)
		setItems(listItems)

		// delete from expand items
		const newExpandItems = expandItems.filter((foundId) => foundId !== id)
		setExpandItems(newExpandItems)
	}

	// User add an item
	const handleAdd = () => {
		if (!newItem || !newItem.hasOwnProperty('name')) {
			// Set style to show error
			document.getElementById('addFormItemName').style.border = "2px solid"
			document.getElementById('addFormItemName').style.borderColor = "rgba(200, 70, 70, 0.7)"
			return
		}

		// Reset Style
		document.getElementById('addFormItemName').style.border = "none"

		const listItems = [...items, newItem]
		setItems(listItems)
		setNewItem("")

		inputRef.current.focus();
	}

	// User is adding an item
	const handleAddFormChange = (e) => {
		const { name, value, type, checked } = e.target;
		// set default value for newItem
		if (!newItem) {
			setNewItem(defaultItemsList)
		}
		setNewItem((prevItem) => ({
			...prevItem,
			// Set the value for [name]
			[name]: type === 'checkbox' ? checked : value
		}))
	}


	return (
		<div className='ml-5 mr-5 p-2 relative overflow-x-auto'>

			<div className='flex uppercase text-xl text-left font-bold text-gray-200 mt-4 mb-2 tracking-widest items-center'>
				<span className='select-text'>shopping list</span>
				{/* Toggle Add Form */}
				<FaPlus
					role='button'
					size={20}
					onClick={() => setAddItem(!addItem)}
					className={`ml-1 mt-0.5 hover:text-darkLamon hover:animate-bounce  ${addItem ? 'text-darkLamon/80' : 'text-gray-400'} `}
				/>
				{/* Toggle Expand */}
				<IoIosArrowForward
					role='button'
					strokeWidth={20}
					size={27}
					onClick={toggleExpand}
					className={`hover:text-darkLamon hover:animate-bounce ${allExpand ? 'rotate-90 text-darkLamon/80' : 'text-gray-400'} `}
				/>


			</div>


			{/* Items Table */}
			<div className='relative overflow-x-auto shadow-lg rounded-lg  bg-darkPanel'>
				<table className='w-full text-left table-fixed'>

					{/* Table Head */}
					<thead className='uppercase text-white/80 text-sm bg-gray-500/40'>
						{/* Toggle Expand All */}
						<tr>
							<th scope="col" className="p-2 w-16 h-full">
								<div className='flex items-center w-full'>
									<IoIosArrowForward
										role='button'
										strokeWidth={20}
										size={20}
										onClick={toggleExpand}
										className={`hover:text-darkLamon hover:animate-bounce absolute ${allExpand ? 'rotate-90 text-darkLamon/80' : 'text-gray-400'} `}
									/>
									{/* Header CheckBox  */}
									<div className="flex items-center justify-center w-full">
										<input id="checkbox-all-search" checked={allCheck} type="checkbox"
											className="ml-4 cursor-pointer w-4 h-4 rounded border-white/10 rounded text-darkLamon/70 focus:ring-darkLamon/80" onChange={handleAllCheck} />
										<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
									</div>
								</div>

							</th>
							<th scope="col" className="md:w-1/3 lg:w-1/2">
								<div className='flex items-center'>
									Item
								</div>
							</th>
							<th className='w-0 md:w-28'>
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
							<th className='w-16 lg:w-24'>
								<div className='flex items-center justify-centers'>
									Total
									<a href="#"><svg className="hidden md:flex w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
									</svg></a>
								</div>
							</th>
							<th className='w-20 md:w-28 text-center'>
								Action
							</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody>
						{/* Add Item */}
						{addItem ?
							<AddItem
								newItem={newItem}
								setNewItem={setNewItem}
								inputRef={inputRef}
								handleReset={handleReset}
								handleAdd={handleAdd}
								handleAddFormChange={handleAddFormChange}
							/>
							: null}
						{items.map((item) => (
							<tr key={item.id} className='hover:bg-gray-100/10 border-b border-white/10' >

								{/* Check */}
								<td className='table-cell items-center justify-center p-2'>
									<IoIosArrowForward
										strokeWidth={20}
										className={`text-gray-600 absolute ${expandItems.includes(item.id) ? 'rotate-90' : ''}`}
									/>
									<div className="flex h-full justify-center">
										<input type="checkbox"
											className="cursor-pointer ml-4 w-4 h-4 bg-gray-500 border-white/10 rounded text-darkLamon/70 focus:ring-darkLamon/80"
											onChange={() => handleCheck(item.id)}
											checked={item.checked}
										/>
										<label htmlFor="checkbox-item" className="sr-only">checkbox</label>
									</div>
								</td>

								{/* Item Name */}
								<td
									onClick={() => handleExpand(item.id)}
									className='p-1 cursor-pointer truncate'
								>
									<div className='flex items-center w-full'>
										{/* <IoIosArrowForward
											strokeWidth={20}
											className={`text-gray-600 m-1 mt-1.5 ${expandItems.includes(item.id) ? 'rotate-90' : ''}`}
										/> */}
										<span
											style={(item.checked) ? { textDecoration: 'line-through' } : null}
											className='text-lg font-bold tracking-widest flex text-xl text-white/95 items-center select-text'
										>
											{item.name}
										</span>

										{/* SM: Item Quantity && Not in expandItems */}
										{!expandItems.includes(item.id) ?
											<p className='md:hidden ml-auto text-sm pr-2 tracking-tighter text-darkLamon/50'>
												x {item.quantity}
											</p>
											: null
										}
									</div>


									{/* Expandable */}
									{expandItems.includes(item.id) ?
										<div className='text-white/60 select-text'>
											{/* Description */}
											<div>
												{item.description ? item.description : "no description yet..."}
											</div>
											{/* Price */}
											<div className='lg:hidden'>
												<span className='uppercase'>price</span>: ${item.price}
											</div>
											{/* Quantity */}
											<div className='md:hidden text-darkLamon/50'>
												x {item.quantity}
											</div>
										</div>
										: null}
								</td>

								{/* Item Quantity */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer text-darkLamon/50'
								>
									<span className='hidden md:flex'>
										x {item.quantity}
									</span>
								</td>

								{/* Item Price */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer hidden lg:table-cell'
								>
									$ <span className='ml-1 mr-1 text-gray-400'> {item.price} </span>
								</td>

								{/* Item Total */}
								<td
									onClick={() => handleExpand(item.id)}
									className='cursor-pointer '
								>
									$ <span className='ml-1 mr-1'> {item.price * item.quantity} </span>
								</td>

								{/* Actions */}
								<td>
									<div className='flex items-center justify-center ml-2 mr-2 text-gray-400'>
										<FaTrash
											role='button'
											tabIndex="0"
											size={20}
											onClick={() => handleDelete(item.id)}
											className='m-1 hover:text-darkLamon hover:animate-bounce'
										/>
										<FaPen
											role='button'
											tabIndex="0"
											size={20}
											onClick={() => handleDelete(item.id)}
											className='m-1 hover:text-darkLamon hover:animate-bounce'
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Total */}
				<div className='flex font-semibold pl-4 pr-4 p-1 float-right text-white/95'>
					Total: $ {totalPrice}
				</div>
			</div>
		</div>
	)
}

export default ShoppingList
