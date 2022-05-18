import React, { useState } from "react";
import validator from "validator";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useUiDataContext } from "../context/uiContext";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const FormLogin = () => {
  const { loading } = useUiDataContext();
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      login(email, password);
      navigate("/");
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      setError("Email no valido o no registrado");
      return false;
    } else if (password.length < 1) {
      setError("La contraseña es requerida");
      return false;
    } else if (password.length < 5) {
      setError("La contraseña debe ser de al menos 6 caracteres");
      return false;
    }
    setError(false);
    return true;
  };

  return (
    <React.Fragment>
      <Container className="container login">
        <Row className="justify-content-center text-center">
          <Col xs>
            {error && <div className="alert alert-danger">{error}</div>}
            {
              <form onSubmit={handleLogin} className="formulario login--form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    maxLength="40"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    maxLength="30"
                    placeholder="Password"
                    name="password"
                    className="form-control mb-4"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="text-center mb-2">
                  <button className="login--btnLogin" disabled={loading}>
                    Inicia Sesión
                  </button>
                </div>
              </form>
            }
            <div className="text-center">
              <Link to="/reset">
                <button className="btnWarning" disabled={loading}>
                  Recuperar Contraseña
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FormLogin;
