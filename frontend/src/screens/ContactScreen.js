import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const ContactScreen = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
  };

  return (
    <Container>
      <h1 className="my-4">Liên Hệ</h1>
      <Row>
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên của bạn" required />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                required
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Tin Nhắn</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Nhập tin nhắn của bạn"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Gửi
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Thông Tin Liên Hệ</h3>
          <p>Email: support@reactecommerce.com</p>
          <p>Số Điện Thoại: 0123 456 789</p>
          <p>Địa Chỉ: 123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactScreen;
