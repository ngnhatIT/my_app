import { Col, Row } from "antd";

const HeaderMain = () => {
  return (
    <Row
      className="bg-white shadow-sm px-4 py-2"
      justify="space-between"
      align="middle"
    >
      <Col>
        <h1 className="text-lg font-semibold">My Application</h1>
      </Col>
      <Col>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </Col>
    </Row>
  );
}

export default HeaderMain;