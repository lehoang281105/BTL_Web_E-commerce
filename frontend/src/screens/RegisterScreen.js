import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'

	// make request here upon component load
	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect)
			}
		},
		[history, userInfo, redirect] // Dependencies, on change they fire off useEffect
	)

	const submitHandler = (e) => {
		e.preventDefault()
		// Check if passwords match
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			// Dispatch register
			dispatch(register(name, email, password))
		}
	}

	return (
		<FormContainer>
			<h1>Đăng Ký</h1>
			{/* 
            On error, display message/error
            When loading, display Loading... */}
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				{/* Name */}
				<Form.Group controlId='email'>
					<Form.Label>Tên</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập tên'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Email */}
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Nhập email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Password */}
				<Form.Group controlId='password'>
					<Form.Label>Mật Khẩu</Form.Label>
					<Form.Control
						type='password'
						placeholder='Nhập mật khẩu'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Confirm Password */}
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Nhập Lại Mật Khẩu</Form.Label>
					<Form.Control
						type='password'
						placeholder='Nhập lại mật khẩu'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				{/* Button */}
				<Button type='submit' variant='primary'>
					Đăng Ký
				</Button>
			</Form>
			{/* Register */}
			<Row className='py-3'>
				<Col>
					Đã Có Tài Khoản?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Đăng Nhập
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
