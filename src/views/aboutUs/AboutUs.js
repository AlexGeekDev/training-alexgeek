import React, { Fragment } from "react";
import team from "../../assets/img/team.jpg";
import founder from "../../assets/img/founderBody.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import JanzDev from "../../assets/video/JanzDev2.gif";
import { Container, Row, Col, Image } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Fragment>
      <Container fluid className="about">
        <Row className="mb-4">
          <Col xs className="">
            <img src={team} alt="equipo Janz" className="img-fluid" />
          </Col>
        </Row>
        <Row className="about--banner my-3 py-3">
          <Col xs className=" mt-5 about--bannerFounderText">
            <h2>Alex Zepeda</h2>
            <h3>Founder, CEO y CTO</h3>
            <h5 className="about--bannerText">
              Somos una startup, muy joven, pero con mucha experiencia, nuestro
              equipo por ahora es pequeño pero estamos convencidos de que
              nuestro servicio crecera, y nuestra prioridad es llevar educación
              hasta cualquier rincon con internet con la mejor calidad y de la
              manera más segura, creemos que el conocimiento es poder y nunca
              dejar de aprender es nunca dejar de crecer, de México con Amor{" "}
              <FontAwesomeIcon icon={faHeart} /> para el mundo
            </h5>
          </Col>
          <Col xs className="mb-3">
            <Image
              fluid
              src={founder}
              alt="equipo Janz"
              className="img-fluid about--founderPhoto"
            />
          </Col>
        </Row>
        <Row className="about--tech my-4 py-3 px-4">
          <Col xs className=" text-center">
            <img src={JanzDev} alt="developer video" className="about--gif" />
          </Col>
          <Col xs className=" text-center about--techText mt-4">
            <h5>
              Nuestra ideología es desarrollar constantemente mejoras para
              nuestra plataforma, el desarrollo es nuestra pasión, ya que
              nuestro Founder es Ingeniero en Sistemas Computacionales, la
              tecnología es nuestro credo, nuestra prioridad es brindarle la
              mejor experiencia al usuario y nunca es suficiente siempre se
              puede mejorar
            </h5>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AboutUs;
