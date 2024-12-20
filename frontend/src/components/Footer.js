import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const footerStyle = {
	backgroundColor: '#111',
	padding: '40px 0',
	color: '#ffffff',
	textAlign: 'center',
}

const logoStyle = {
	fontSize: '24px',
	fontWeight: 'bold',
	marginBottom: '20px',
}

const linkStyle = {
	color: '#ffffff',
	textDecoration: 'none',
	margin: '0 15px',
	fontSize: '14px',
}

const socialIconsStyle = {
	marginTop: '20px',
}

const iconStyle = {
	color: '#ffffff',
	margin: '0 10px',
	fontSize: '20px',
	transition: 'color 0.3s',
}

const copyrightStyle = {
	marginTop: '20px',
	fontSize: '12px',
	color: '#a0a0a0',
}

const Footer = () => {
	return (
		<footer style={footerStyle}>
			<Container>
				<Row>
					<Col>
						<div style={logoStyle}>Cửa Hàng Điện Tử</div>
						<div>
							<a href="https://example.com/home" style={linkStyle}>TRANG CHỦ</a>
							<a href="https://example.com/agent" style={linkStyle}>ĐẠI LÝ</a>
							<a href="https://example.com/about" style={linkStyle}>GIỚI THIỆU</a>
							<a href="https://example.com/listing" style={linkStyle}>DANH MỤC</a>
							<a href="https://example.com/blog" style={linkStyle}>BLOG</a>
							<a href="https://example.com/contact" style={linkStyle}>LIÊN HỆ</a>
						</div>
						<div style={socialIconsStyle}>
							<a href="https://twitter.com" style={iconStyle}>
								<i className='fab fa-twitter'></i>
							</a>
							<a href="https://facebook.com" style={iconStyle}>
								<i className='fab fa-facebook-f'></i>
							</a>
							<a href="https://instagram.com" style={iconStyle}>
								<i className='fab fa-instagram'></i>
							</a>
						</div>
						<p style={copyrightStyle}>
							Copyright ©{new Date().getFullYear()} All rights reserved	
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer