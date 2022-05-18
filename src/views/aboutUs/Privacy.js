import React, { Fragment } from "react";
import PrivacyTxt from "../../components/PrivacyTxt";
import { Container, Row, Col } from "react-bootstrap";

const Privacy = () => {
  return (
    <Fragment>
      <Container className="privacy">
        <Row>
          <Col xs>
            <PrivacyTxt />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Privacy;
