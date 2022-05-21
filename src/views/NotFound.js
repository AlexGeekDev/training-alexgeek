import React, { Fragment } from "react";
import notFound from "../assets/img/notFound.png";
import { Container, Row, Col, Image } from "react-bootstrap";

function NotFound() {
  return (
    <Fragment>
      <Container fluid>
        <Row style={{ textAlign: "center" }}>
          <Col xs>
            <Image
              fluid
              src={notFound}
              alt="not found"
              style={{ maxHeight: 600 }}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default NotFound;
