import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className='justify-content-center mb-4'>
			{/* Step 1 Sign In */}
			<Nav.Item>
				{step1 ? (
					<LinkContainer to='/login'>
						<Nav.Link>Đăng Nhập</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Đăng Nhập</Nav.Link>
				)}
			</Nav.Item>
			{/* Step 2 Shipping */}
			<Nav.Item>
				{step2 ? (
					<LinkContainer to='/shipping'>
						<Nav.Link>Giao Hàng</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Giao Hàng</Nav.Link>
				)}
			</Nav.Item>
			{/* Step 3 Payment */}
			<Nav.Item>
				{step3 ? (
					<LinkContainer to='/payment'>
						<Nav.Link>Thanh Toán</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Thanh Toán</Nav.Link>
				)}
			</Nav.Item>
			{/* Step 4 Place Order */}
			<Nav.Item>
				{step4 ? (
					<LinkContainer to='/placeorder'>
						<Nav.Link>Đặt Hàng</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Đặt Hàng</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	)
}

export default CheckoutSteps
