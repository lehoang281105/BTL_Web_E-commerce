import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	// Make sure user is logged in to access this page
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// Get success value from userUpdateProfileReducer
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	// To get my list of orders
	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	// make request here upon component load
	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login')
			} else {
				if (!user || !user.name || success) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET })
					dispatch(getUserDetails('profile'))
					dispatch(listMyOrders())
				} else {
					setName(user.name)
					setEmail(user.email)
				}
			}
		},
		[dispatch, history, userInfo, user, success] // Dependencies, on change they fire off useEffect
	)

	const submitHandler = (e) => {
		e.preventDefault()
		// Check if passwords match
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>Thông Tin Người Dùng</h2>
				{/* On error, display message/error
            When loading, display Loading... */}
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Thông Tin Đã Cập Nhật</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler} className='push-to-right'>
					{/* Name */}
					<Form.Group controlId='email'>
						<Form.Label>Tên</Form.Label>
						<Form.Control
							type='name'
							placeholder='Nhập Tên'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Email */}
					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Nhập Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Password */}
					<Form.Group controlId='password'>
						<Form.Label>Mật Khẩu</Form.Label>
						<Form.Control
							type='password'
							placeholder='Nhập Mật Khẩu'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Confirm Password */}
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Nhập Lại Mật Khẩu</Form.Label>
						<Form.Control
							type='password'
							placeholder='Nhập Lại Mật Khẩu'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Button */}
					<Button type='submit' variant='primary'>
						Cập Nhật
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Đơn Hàng Của Tôi</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Ngày</th>
								<th>Tổng</th>
								<th>Đã Thanh Toán</th>
								<th>Đã Giao</th>
								<th>Chi Tiết</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>R{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
												Chi Tiết
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
