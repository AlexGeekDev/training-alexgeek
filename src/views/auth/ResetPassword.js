import React, { Fragment, useCallback, useState } from "react";
import { useUiDataContext } from "../../context/uiContext";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { resetPassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";

const ResetPassword = (props) => {
  const [error, setError] = useState(false);
  const { loading } = useUiDataContext();
  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    email: "",
  });

  const { email } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      resetPassword(email);
      Swal.fire(
        "Bien!",
        "Te enviamos un correo electronico para reestablecer tu contraseña",
        "success"
      );
      navigate("/login");
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      setError("Email no valido o no registrado");
      return false;
    }

    setError(false);
    return true;
  };

  return (
    <Fragment>
      <Container className="login" style={{ width: "25rem" }}>
        <Row className="justify-content-center text-center">
          <Col>
            {error && <div className="alert alert-danger">{error}</div>}
            {
              <form onSubmit={handleSubmit} className="formulario login--form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center mb-4 mt-5">
                  <button className="login--btnLogin" disabled={loading}>
                    Recuperar contraseña
                  </button>
                </div>
              </form>
            }
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ResetPassword;
