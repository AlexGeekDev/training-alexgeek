import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import validator from "validator";
import { Switch, useCheckboxState } from "pretty-checkbox-react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { regWithEmail } from "../services/auth";

const FormRegister = () => {
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formValues;
  const switchTerminos = useCheckboxState();
  const [error, setError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      regWithEmail(email, password, name);
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      setError("El nombre es requerido");
      return false;
    } else if (!validator.isEmail(email)) {
      setError("Email no valido");
      return false;
    } else if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return false;
    } else if (password.length < 5) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (switchTerminos.state === false) {
      setError("Es necesario aceptar los Terminos y Condiciones");
      return;
    }

    setError(false);
    return true;
  };

  return (
    <React.Fragment>
      <Container className="register">
        <Row className="justify-content-center">
          <Col xs>
            {error && <div className="alert alert-danger">{error}</div>}

            <form
              onSubmit={handleRegister}
              className="formulario register--form"
            >
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  maxLength="23"
                  minLength="4"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  autoComplete="on"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>

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
                  className="form-control"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Repetir Contraseña</label>
                <input
                  type="password"
                  maxLength="30"
                  placeholder="Confirm password"
                  name="password2"
                  className="form-control"
                  value={password2}
                  onChange={handleInputChange}
                />
              </div>
              <Row className="justify-content-center">
                <Col xs className="mr-3">
                  <Row className="form-group float-right">
                    <Col xs className="form-check">
                      Acepto los Terminos y Condiciones
                      <Switch
                        {...switchTerminos}
                        shape="fill"
                        color="success"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs>
                  <Link to="/Privacy">* Leer Terminos y condiciones</Link>
                </Col>
              </Row>
              <div className="text-right">
                <button>Regístrarse</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FormRegister;
