import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}

	const inputStyle = {
		color: '#fff', // Màu chữ trắng
		backgroundColor: '#444', // Màu nền tối hơn
		border: '1px solid #555', // Viền nhẹ
	}

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Tìm Kiếm Sản Phẩm...'
				className='mr-sm-2 ml-sm-5'
				style={inputStyle}
			></Form.Control>
			<Button type='submit' className='btn btn-secondary p-2'>
				Tìm Kiếm
			</Button>
		</Form>
	)
}

export default SearchBox