import React, { Fragment } from "react";
import logo from "../assets/logo/janz.png";
import Cards from "../components/Cards";
import {
  Col,
  Row,
  Container,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";

const ProfileFace = (props) => {
  return (
    <Fragment>
      <Container className="profile">
        <Row className="text-center">
          <Col xs={12} lg={6} className="profile--header">
            <img className="profile--logo" src={logo} alt="" />
          </Col>
          <Col xs={12} lg={6} className="profile--header">
            <p className="profile--name"> {`${props.user.name}`} </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12} lg={12} className="profile--score mt-4">
            <div className="profile--info mt-1">
              <Cards />
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProfileFace;
