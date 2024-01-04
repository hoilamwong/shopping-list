import React, {useState} from 'react'

function ShoppingList() {

	const [items, setItems] = useState([
		{
			id: 1,
			checked: false,
			quantity: 1,
			price: 12.00,
			name: "Rice",
			description: "something"
		},
		{
			id: 2,
			checked: false,
			quantity: 1,
			price: 1.00,
			name: "A",
			description: "something"
		},
	])

	const [expandItems, setExpandItems] = useState([])

	// User toggle checkbox for an item
	const handleCheck = (id) => {
		// Check each item in items
		// if id is matched, reverse the checked on that item, else return original item
		const listItems = items.map((item) => item.id === id ? 
		{...item, checked: !item.checked} : item)
		setItems(listItems)
	}

	// User toggle details of an item
	const handleExpand = (id) => {
		// copy items using Spread operator !
		let expandItemsList = [...expandItems]

		if (expandItemsList.includes(id)){
			expandItemsList = expandItemsList.filter((expand_id) => expand_id !== id)
		}else{
			expandItemsList.push(id)
		}
		setExpandItems(expandItemsList)
	}

  return (
		<>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<input
							type='checkbox'
							onChange={() => handleCheck(item.id)}
							checked={item.checked}
						/>
						<label
							style={(item.checked) ? { textDecoration: 'line-through'} : null }
							onDoubleClick={() => handleExpand(item.id)}
						>
							{item.name} |
							${item.price} |
							x{item.quantity} |
							<br/>
							{expandItems.includes(item.id) ? item.description : null}
						</label>
					</li>
				))}
			</ul>
		</>
  )
}

export default ShoppingList
