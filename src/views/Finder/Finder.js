import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CoursesCard from "../../components/CoursesCard";
import { useUiDataContext } from "../../context/uiContext";

const Finder = () => {
  const { courses } = useUiDataContext();
  //   console.log(courses.map((item) => item.name));

  return (
    <Fragment>
      <Container className="courses">
        <Row className="justify-content-center">
          <Col md="auto">
            <CoursesCard />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Finder;
