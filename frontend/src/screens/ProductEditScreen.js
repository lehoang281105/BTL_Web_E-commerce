import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	// make request here upon component load
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			dispatch(listProductDetails(productId))
			history.push('/admin/productlist')
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setImage(product.image)
				setBrand(product.brand)
				setCountInStock(product.countInStock)
				setCategory(product.category)
				setDescription(product.description)
			}
		}
	}, [successUpdate, dispatch, history, product, productId]) // Dependencies, on change they fire off useEffect)

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]

		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			// Making post request to upload the image
			const { data } = await axios.post('/api/upload', formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				countInStock,
				category,
				description,
			})
		)
	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Quay Lại
			</Link>
			<FormContainer>
				<h1>Chỉnh Sửa Sản Phẩm</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{/* On error, display message/error
            When loading, display Loading... */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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
						{/* Price */}
						<Form.Group controlId='price'>
							<Form.Label>Giá</Form.Label>
							<Form.Control
								type='number'
								min='0'
								step='0.01'
								placeholder='Nhập giá'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Image */}
						<Form.Group controlId='image'>
							<Form.Label>Ảnh</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập đường dẫn ảnh'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							{/* Image file */}
							<Form.File
								id='image-file'
								label='Chọn File'
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>
						{/* Brand */}
						<Form.Group controlId='brand'>
							<Form.Label>Thương Hiệu</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập thương hiệu'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Count in Stock */}
						<Form.Group controlId='countInStock'>
							<Form.Label>Số Lượng</Form.Label>
							<Form.Control
								type='number'
								min='0'
								step='1'
								placeholder='Nhập số lượng'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Category */}
						<Form.Group controlId='category'>
							<Form.Label>Danh Mục</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập danh mục'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Description */}
						<Form.Group controlId='description'>
							<Form.Label>Mô Tả</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập mô tả'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Button */}
						<Button type='submit' variant='primary'>
							Cập Nhật
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductScreen
