import React from "react";
import logo from "../../assets/logo/janz.png";
import { Link } from "react-router-dom";
import { useUiDataContext } from "../../context/uiContext";
import { useUserDataContext } from "../../context/userContext";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  const { active } = useUiDataContext();
  const { userDb } = useUserDataContext();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Container fluid className="header sticky-top">
        <Row className="row align-items-center ">
          {active && (
            <Col xs className="header--nav">
              <Link to="/">
                <img className="header--logo" src={logo} alt="logo janz" />
              </Link>
              <Link to={`/@${userDb.path}`}>
                <img className="header--photo" src={userDb.photo} alt="" />
              </Link>
            </Col>
          )}

          {!active && (
            <Col xs className="header--nav">
              <Link to="/">
                <img className="header--logo" src={logo} alt="logo janz" />
              </Link>
            </Col>
          )}

          {active && (
            <Col xs className="header--nav text-center">
              <Link to={`/@${userDb.path}`}>
                <span className="font-weight-light"> {userDb.name} </span>
              </Link>
            </Col>
          )}

          <Col xs className="header--nav text-center">
            <Link to="/finder">
              <span className="font-weight-light">Encuentra un Curso</span>
            </Link>
          </Col>

          {!active && (
            <Col xs className="header--nav text-center">
              <Link to="/login">
                <span className="font-weight-light">Iniciar Sesión</span>
              </Link>
            </Col>
          )}

          {!active && (
            <Col xs className="header--nav text-center">
              <Link to="/signup">
                <button className="header--btn">Regístrate</button>
              </Link>
            </Col>
          )}

          {active && (
            <Col xs className="header--nav text-center">
              <button className="header--btn" onClick={logOut}>
                Cerrar Sesión
              </button>
            </Col>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Header;
