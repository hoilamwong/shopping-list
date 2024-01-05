import React from 'react'
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function AddItem({ newItem, handleReset, handleAdd, handleAddFormChange }) {


	return (
		<>
			<tr className="hidden md:table-row hover:bg-white/5 border-b border-white/10">

				{/* Check */}
				<td className='w-4 p-4'>
					<div className="flex items-center justify-center">
						<input id="checkbox-item" type="checkbox" disabled={true}
							className="w-4 h-4 text-gray-900 bg-gray-500 rounded border-gray-700 rounded focus:ring-gray-500 cursor-no-drop" 
						/>
						<label htmlFor="checkbox-item" className="sr-only">checkbox</label>
					</div>
				</td>

				{/* Item Name */}
				<td className='pt-2 pb-2'>
					<input
						id='addFormItemName'
						autoFocus
						type='text'
						placeholder='Item Name'
						required
						name='name'
						value={newItem.name? newItem.name : ""}
						onChange={handleAddFormChange}
						className='p-1 pl-2 mr-1 w-8/12 bg-black/20 rounded-lg border-0 focus:ring-white/10'
					/>
					{/* MD: Item Price */}
					<div className='lg:hidden'>
						<input
							type='text'
							placeholder='Price'
							name='price'
							value={newItem.price? newItem.price : ""}
							onChange={handleAddFormChange}
							className='p-1 pl-2 mr-1 mt-1 w-1/4 bg-black/20 rounded-lg border-0 focus:ring-white/10'
						/>
					</div>
					{/* Description */}
					<input
						type='text'
						placeholder='Description'
						name='description'
						value={newItem? newItem.description : ""}
						onChange={handleAddFormChange}
						className='p-1 pl-2 mr-1 mt-1 w-11/12 bg-black/20 rounded-lg border-0 focus:ring-white/10'
					/>
				</td>

				{/* Item Quantity */}
				<td>
					<div className='flex items-center justify-left mr-2 w-full pr-4'>
						<div className='flex items-center justify-center border border-white/20 rounded-lg w-min-auto'>
							<FaMinus size={15} className='mr-2 ml-1 cursor-pointer hover:text-darkLamon' type='button' />
							<input
								type='number'
								name='quantity'
								value={newItem.quantity? newItem.quantity : 1}
								placeholder='1'
								min={1}
								max={20}
								onChange={handleAddFormChange}
								className='p-1 w-11/12 bg-black/20 border-0 w-1/3 text-center'
							/>
							<FaPlus size={15} className='ml-2 mr-1 cursor-pointer hover:text-darkLamon' type='button' />
						</div>

					</div>
				</td>

				{/* LG: Item Price */}
				<td className='hidden lg:table-cell'>
					<div className='flex items-center justify-left'>
						$
						<input
							type='text'
							placeholder='0'
							name='price'
							value={newItem.price? newItem.price : ""}
							onChange={handleAddFormChange}
							className='m-1 p-1 pl-2 w-1/2 bg-black/20 rounded-lg border-0 focus:ring-white/10'
						/>
					</div>
				</td>

				{/* Item Total */}
				<td>
					$
					<span className='ml-2 mr-2'>
						{newItem.price ? newItem.price * newItem.quantity : 0}
					</span>
				</td>

				{/* Actions */}
				<td className='h-full text-gray-400'>
					<div className='flex justify-center items-center ml-2 mr-2 '>
						<FaCheck className='m-1 cursor-pointer hover:text-darkLamon hover:animate-bounce' type='button' onClick={handleAdd} size={20}/>
						<GrPowerReset className='m-1 cursor-pointer hover:text-darkLamon hover:animate-bounce' type='button' onClick={handleReset} size={20}/>
					</div>
				</td>
			</tr>
		</>
	)
}

export default AddItem
