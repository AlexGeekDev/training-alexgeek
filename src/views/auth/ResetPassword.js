import React, { Fragment, useCallback, useState } from "react";
import { useUiDataContext } from "../../context/uiContext";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";

const ResetPassword = (props) => {
  const [error, setError] = useState(false);
  const { loading } = useUiDataContext();

  const [formValues, handleInputChange] = useForm({
    email: "",
  });

  const { email } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(startLoginEmailPassword(email, password));
    if (isFormValid()) {
      // dispatch(startLoginEmailPassword(email, password));
      resetPass();
    }
  };

  const resetPass = useCallback(async () => {
    // try {
    //   await auth.sendPasswordResetEmail(email);
    //   console.log("Correo enviado");
    //   props.history.push("/Login");
    //   Swal.fire(
    //     "Bien!",
    //     "Te enviamos un correo electronico para reestablecer tu contraseña",
    //     "success"
    //   );
    // } catch (e) {
    //   Swal.fire("Error", e.message, "error");
    // }
  }, [email, props.history]);

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      // dispatch(setError("Email no valido o no registrado"));
      return false;
    }

    // dispatch(removeError());
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
