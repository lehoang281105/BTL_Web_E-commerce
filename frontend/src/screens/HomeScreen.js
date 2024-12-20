import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {/* Banner or Slider */}
      {!keyword && <ProductCarousel />}


      {/* Best Sellers */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Sản Phẩm Bán Chạy</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.slice(0, 4).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Special Offers */}
      <Container className="py-5 bg-light">
        <h2 className="text-center mb-4">Ưu Đãi Đặc Biệt</h2>
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Card className="p-3">
              <Card.Body>
                <h3>Giảm Giá 50% Cho Điện Thoại</h3>
                <p>Chỉ áp dụng đến ngày 30/11!</p>
                <Link to="/category/electronics" className="btn btn-primary">
                  Xem Ngay
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <Card className="p-3">
              <Card.Body>
                <h3>Mua 1 Tặng 1 Mỹ Phẩm</h3>
                <p>Ưu đãi chỉ áp dụng online.</p>
                <Link to="/category/beauty" className="btn btn-primary">
                  Mua Ngay
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Pagination */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Tất Cả Sản Phẩm</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword || ''} />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
