import React from "react";
import idiomas from "../assets/img/idiomas.png";
import laptop from "../assets/img/lapTop.png";
import mat from "../assets/img/matematicas.png";
import robotica from "../assets/img/robotica.png";
import desarrollo from "../assets/img/desarrollo.png";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { Container, Row, Col } from "react-bootstrap";

const BadgeHero = () => {
  const onTop = () => {
    scroll.scrollToTop({ duration: 500 });
  };

  return (
    <React.Fragment>
      <Container fluid className="container-fluid badgeSubjects mt-1">
        <Row className="justify-content-center text-center">
          <Link to="/finder">
            <h2 className="text-primary">Toma ya tu prueba gratuita</h2>
          </Link>
        </Row>
        <Row className="justify-content-center text-center">
          <h2>Aprende con cursos grabados de clases en la vida real 🚀</h2>
        </Row>
        <Row className="justify-content-around text-center card--subjects">
          <Col xs={3}>
            <Link to="/finder">
              <img onClick={onTop} src={idiomas} alt="Idiomas" />
              <h6 onClick={onTop}>Idiomas</h6>
            </Link>
          </Col>
          <Col xs={3}>
            <Link to="/finder">
              <img src={laptop} alt="Historia" className="card--subjectImg" />
              <h6>Informática</h6>
            </Link>
          </Col>
          <Col xs={3}>
            <Link to="/finder">
              <img onClick={onTop} src={robotica} alt="Robótica" />
              <h6 onClick={onTop}>Robótica</h6>
            </Link>
          </Col>
          <Col xs={3}>
            <Link to="/finder">
              <img onClick={onTop} src={desarrollo} alt="Desarrollo" />
              <h6 onClick={onTop}>Desarrollo</h6>
            </Link>
          </Col>
          <Row className="justify-content-center text-center badgeSubjects--parrafo">
            <h3>
              AlexGeek Training te ofrece cursos grabados de clases
              completamente reales como si estuvieras en él, instituto no pagues
              sumas exageradas por aprender una habilidad o idioma, ¿Qué
              esperas? ¡Toma la prueba gratuita ahora!
            </h3>
          </Row>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default BadgeHero;
