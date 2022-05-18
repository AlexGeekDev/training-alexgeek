import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import geekLanguage from "../assets/logo/GeekLanguage.png";

const CoursesCard = () => {
  return (
    <Card
      style={{
        width: "20rem",
        textAlign: "center",
        padding: 5,
        marginBottom: 18,
      }}
    >
      <Card.Img variant="top" src={geekLanguage} className="couse--image" />
      <Card.Body>
        <Card.Title>Inglés by alex Geek</Card.Title>
        <Card.Text>
          Curso de Inglés para hispanohablantes, un curso grabado completamente
          con clases reales online en vivo, como si asistieras al Instituto de
          Inglés, pero con tu propio horario y con la ventaja de poder repetir
          cuando quieras cualquier tema, sin pagar montos excesivos.
        </Card.Text>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Ir al curso!
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CoursesCard;
