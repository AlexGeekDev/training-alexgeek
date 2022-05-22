import React, { Fragment } from "react";
import ahorro from "../assets/img/ahorro.png";
import calidad from "../assets/img/calidad.png";
import seguridad from "../assets/img/seguridad.png";
import flexibilidad from "../assets/img/flexibilidad.png";
import { Container, Row, Col } from "react-bootstrap";

const Advantages = () => {
  return (
    <Fragment>
      {" "}
      <Container fluid className="advantages px-5">
        <Row className="justify-content-around">
          <Col xs={12} xl={3} md={2}>
            <img
              src={seguridad}
              alt="seguridad"
              className="img-fluid advantages--img rounded mx-auto d-block"
            />
            <h2 className="text-center">Seguridad</h2>
            <h6 style={{ textAlign: "center" }}>
              Desde tu inicio de sesión, tus clases, tus datos y hasta tus pagos
              protegidos por la plataforma mundial Stripe. Así tú puedes
              centrarte en tus clases
            </h6>
          </Col>
          <Col xs={12} xl={3} md={2}>
            <img
              src={ahorro}
              alt="seguridad"
              className="img-fluid advantages--img2 rounded mx-auto d-block mb-3"
            />
            <h2 className="text-center">Ahorro</h2>
            <h6 style={{ textAlign: "center" }}>
              Clases económicas: en comparativa con cualquier Instituto, el
              precio es sumamente menor a cualquiera en el mercado, con la misma
              calidad o incluso mejor que en cualquiera de las escuelas más
              reconocidas.
            </h6>
          </Col>
          <Col xs={12} xl={3} md={2}>
            <img
              src={calidad}
              alt="seguridad"
              className="img-fluid advantages--img3 rounded mx-auto d-block mb-1"
            />
            <h2 className="text-center">Calidad</h2>
            <h6 style={{ textAlign: "center" }}>
              Nuestro método es efectivo, combinado la tecnología con la
              inmersión, nuestras prácticas son totalmente basadas en un
              ambiente real, la calidad de nuestros cursos es de nivel
              internacional.
            </h6>
          </Col>
          <Col xs={12} xl={3} md={2}>
            <img
              src={flexibilidad}
              alt="seguridad"
              className="img-fluid advantages--img4 rounded mx-auto d-block mb-1"
            />
            <h2 className="text-center">Flexibilidad</h2>
            <h6 style={{ textAlign: "center" }}>
              Clases cuando quieras, desde el sofá de casa, despacho u oficina,
              no es necesario reorganizar tu horario para aprender, puedes
              hacerlo cuando tengas el espacio libre en tu agenda.
            </h6>
          </Col>
        </Row>
      </Container>{" "}
    </Fragment>
  );
};

export default Advantages;
