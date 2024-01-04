import React from 'react'

function AddItem({ handleAdd, handleAddFormChange }) {

	return (
		<form className='addForm' onSubmit={handleAdd}>
			<input
				autoFocus
				type='text'
				placeholder='Item Name'
				required
				name='name'
				onChange={handleAddFormChange}
			/>
			<input
				autoFocus
				type='text'
				placeholder='Price'
				required
				name='price'
				onChange={handleAddFormChange}
			/>
			<input
				type='number'
				min='1'
				max='20'
				step='1'
				name='quantity'
				defaultValue={1}
				onChange={handleAddFormChange}
			/>
			<br/>
			<input
				autoFocus
				type='text'
				placeholder='Description'
				name='description'
				onChange={handleAddFormChange}
			/>
			<button
				type='submit'
				value="Submit"
				aria-label='Add Item'
			>
				Add
			</button>
		</form>
	)
}

export default AddItem
