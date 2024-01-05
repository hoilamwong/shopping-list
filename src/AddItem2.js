import React from 'react'
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";

function AddItem({ newItem, handleAdd, handleAddFormChange }) {
	return (
		<>
			<tr className="hidden md:table-row">
				{/* Check */}
				<td className='w-4 p-4'>
					<div className="flex items-center justify-center">
						<input id="checkbox-item" type="checkbox"
							className="w-4 h-4 text-gray-900 bg-gray-500 rounded border-gray-700 rounded focus:ring-gray-500"
						/>
						<label htmlFor="checkbox-item" className="sr-only">checkbox</label>
					</div>
				</td>
				{/* Item Name */}
				<td>
					<input
						autoFocus
						type='text'
						placeholder='Item Name'
						required
						name='name'
						onChange={handleAddFormChange}
						className='p-1 pl-2 mr-1 w-11/12 bg-black/20 rounded-lg border-0 focus:ring-white/10'
					/>
				</td>
				{/* Item Quantity */}
				<td>
					<div className='flex items-center justify-center border border-white/20 rounded-lg w-fit m-auto m-2'>
						<FaMinus size={15} className='ml-2 mr-2 cursor-pointer' type='button'/>
						<input
							autoFocus
							type='text'
							inputMode='numeric'
							pattern="[1-9\s]"
							placeholder='Item Name'
							required
							name='quantity'
							defaultValue={1}
							onChange={handleAddFormChange}
							className='p-1 w-11/12 bg-black/20 border-0 w-1/3 text-right overflow-hidden'
						/>
						<FaPlus size={15} className='ml-2 mr-2 cursor-pointer' type='button'/>
					</div>	
				</td>
				{/* Item Price */}
				<td>
					<div className='flex items-center justify-left'>
						$ 
						<input
							autoFocus
							type='text'
							placeholder='0'
							name='price'
							onChange={handleAddFormChange}
							className='m-1 p-1 pl-2 w-1/2 bg-black/20 rounded-lg border-0 focus:ring-white'
						/>
					</div>
				</td>
				{/* Item Total */}
				<td>
					$
					<span className='ml-2 mr-2'>
						{newItem.price? newItem.price * newItem.quantity: 0}
					</span>
				</td>
				{/* Actions */}
				<td>
					<FaCheck size={15} className='ml-2 mr-2 cursor-pointer' type='button' onClick={handleAdd}/>
				</td>
			</tr>
		</>
	)
}

export default AddItem
