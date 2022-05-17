import React from "react";
import scratch from "../assets/img/scratch degradado.png";
import scratch2 from "../assets/img/scratch secundary.png";
import person from "../assets/img/Person Scratch.png";
import LogoAnimation from "./LogoAnimation";
import { Container, Row, Col, Image } from "react-bootstrap";

class Hero extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero">
          <Container className="hero--container">
            <Row>
              <div className="col-xs-1-12 col-lg-6 hero--container__welcome">
                <h1 className="hero--container__title">
                  AlexGeek Training by Janz!
                </h1>
                <p className="hero--container__text">
                  Estas listo para aprender?
                </p>
                <Image
                  fluid
                  src={scratch2}
                  className="position-absolute hero--container__scratch2"
                  alt="Hero"
                />
              </div>

              <div className="col-xs-1-12 col-lg-6 hero--container__imgs">
                <Image
                  fluid
                  src={scratch}
                  className="position-absolute hero--container__scratch"
                  alt="Hero"
                />
                <Image
                  fluid
                  src={scratch2}
                  className="position-absolute hero--container__scratch2"
                  alt="Hero"
                />
                <Image
                  fluid
                  ref={this.person}
                  src={person}
                  className="position-absolute hero--container__person"
                  alt="Persona"
                />
              </div>
            </Row>

            <Row className="justify-content-start">
              <LogoAnimation />
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Hero;
