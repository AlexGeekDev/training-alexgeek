import React, { Fragment } from "react";
import Hero from "../../components/Hero";
import BadgeHero from "../../components/BadgeHero";
// import HowItWorks from "../components/HowItWorks.jsx";
import Advantages from "../../components/Advantages";
// import Carousel from "../components/CarouselComp";
import { FacebookProvider, Like } from "react-facebook";
import AlexGeek from "../../assets/video/JanzTeacherAlexZepeda.mp4";
import JanzAdThumbail from "../../assets/logo/JanzThumbail.png";
// import CountDown from "../components/CountdownRelease";

import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const agent = window.navigator.userAgent;
  return (
    <Fragment>
      <div>
        <h6 className="w-100 text-primary d-none">
          Aprende con cursos grabados de clases en la vida real 🚀
        </h6>
      </div>
      <Container>
        <Row className="justify-content-end">
          <FacebookProvider appId="937605780074807">
            <Like
              href="https://trainingalexgeek.web.app/"
              colorScheme="dark"
              share
              width="200"
              layout="button_count"
              size="large"
            />
          </FacebookProvider>
        </Row>
      </Container>
      {agent.includes("FB") && (
        <Container>
          <Row className="justify-content-center">
            <Col className="col-xs-1-12 text-warning">
              Para una mejor experiencia utiliza Chrome, Firefox, Edge, Opera o
              Brave
            </Col>
          </Row>
        </Container>
      )}
      <Hero />
      <BadgeHero />
      <Container>
        <Row className="justify-content-center mx-2">
          <Col className="col-xs-1-12 mb-3 text-center">
            <video
              src={AlexGeek}
              poster={JanzAdThumbail}
              controls={true}
              width="100%"
              max-width="1080"
            ></video>
            <h3 className="text-center">
              En Janz puedes reservar una clase con el profesor y tarifa de tu
              elección o una clase inmediata y pagar solo por los minutos que
              necesites
            </h3>
          </Col>
        </Row>
        <Row className="justify-content-center mx-2">{/* <Carousel /> */}</Row>
      </Container>
      <Advantages />
    </Fragment>
  );
};

export default Home;
