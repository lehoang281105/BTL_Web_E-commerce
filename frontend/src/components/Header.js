import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navbarStyle = {
    backgroundColor: '#111',
  };

  const linkStyle = {
    color: '#ffffff',
  };

  return (
    <header>
      <Navbar style={navbarStyle} variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          <LinkContainer to="/">
            <Navbar.Brand style={linkStyle}>Cửa Hàng Điện Tử</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link style={linkStyle}>
                  <i className="fas fa-shopping-cart"></i> Giỏ Hàng
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" style={linkStyle}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Thông Tin Của Tôi</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Đăng Xuất</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link style={linkStyle}>
                    <i className="fas fa-user"></i> Đăng Nhập
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" style={linkStyle}>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Người Dùng</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Các Sản Phẩm</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Đơn Hàng</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
			  <LinkContainer to="/contact">
                <Nav.Link style={linkStyle}>Liên Hệ</Nav.Link>
              </LinkContainer>
			  <LinkContainer to="/about">
                <Nav.Link style={linkStyle}>Về Chúng Tôi</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
