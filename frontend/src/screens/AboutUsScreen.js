import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsScreen = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col className="text-center">
          <h1>Về Chúng Tôi</h1>
          <p>
            Chào mừng đến với nền tảng thương mại điện tử của chúng tôi! Mục tiêu của chúng tôi là mang đến cho bạn những sản phẩm tốt nhất với giá tốt nhất.
          </p>
          <p>
            Chúng tôi đánh giá cao sự hài lòng của khách hàng, chất lượng và sự trung thực. Cảm ơn bạn đã chọn nền tảng của chúng tôi!
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Sứ Mệnh Của Chúng Tôi</h2>
          <p>Chúng tôi hướng đến cung cấp những sản phẩm chất lượng cao với dịch vụ tuyệt vời cho tất cả khách hàng của chúng tôi.</p>
        </Col>
        <Col md={6}>
          <h2>Liên Hệ Chúng Tôi</h2>
          <p>
            Email: support@example.com<br />
            Phone: +1 234 567 890
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsScreen;
