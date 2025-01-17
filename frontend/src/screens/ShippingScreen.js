import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
	// useSelector is to grab the cart from the state
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Giao Hàng</h1>
			<Form onSubmit={submitHandler}>
				{/* Address */}
				<Form.Group controlId='address'>
					<Form.Label>Địa Chỉ</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập địa chỉ'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* City */}
				<Form.Group controlId='city'>
					<Form.Label>Thành Phố</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập thành phố'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Postal Code */}
				<Form.Group controlId='postalCode'>
					<Form.Label>Mã Bưu Điện</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập mã bưu điện'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Country */}
				<Form.Group controlId='country'>
					<Form.Label>Quốc Gia</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập quốc gia'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Tiếp Tục
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
