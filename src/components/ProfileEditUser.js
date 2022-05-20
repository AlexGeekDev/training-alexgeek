import React, { Fragment, useState } from "react";
import logo from "../assets/logo/janz.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";

const EditProfile = (props) => {
  const [nombreUsuario, setNombreUsuario] = useState(props.user.name);
  const [activeForm, setactiveForm] = useState(false);
  const [error, setError] = React.useState(false);
  const [errorName, setErrorName] = React.useState(false);

  const selectFile = (imagen) => {
    const imagenCliente = imagen.target.files[0];

    if (imagenCliente === undefined) {
      console.log("no se seleccionó imagen");
      return;
    }

    if (
      imagenCliente.type === "image/jpeg" ||
      imagenCliente.type === "image/jpg" ||
      imagenCliente.type === "image/png"
    ) {
      // dispatch(editPhoto(imagenCliente));
      setError(false);
    } else {
      setError(true);
    }
  };

  const upName = () => {
    if (!nombreUsuario.trim()) {
      setErrorName("Tu nombre no puede estar vacio");
      return;
    }
    // dispatch(nameUpdate(nombreUsuario));
    setactiveForm(false);
  };

  return (
    <Fragment>
      <Container className="editProfile" style={{ textAlign: "center" }}>
        <Row>
          <Col xs className="profile--header">
            <img className="profile--logo" src={logo} alt="" />
          </Col>
          <Col xs className="profile--header">
            <p className="profile--name"> {`${props.user.name}`} </p>
          </Col>
        </Row>
        <Row className="justify-content-center editProfile--header">
          <h1>Editar perfil</h1>
        </Row>
        <Fragment>
          <Row className="justify-content-center mb-3">
            <Col xs>
              <img
                className="editProfile--photo"
                src={props.user.photo}
                alt=""
              />
            </Col>
          </Row>
          {error && (
            <div className="alert alert-warning mt-3 text-center">
              Solo archivos .png o .jpg
            </div>
          )}
          <Row className="text-center">
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={(e) => selectFile(e)}
                style={{ display: "none" }}
              />
              <label
                className="btn btn-primary editProfile--btnPhoto"
                htmlFor="inputGroupFile01"
              >
                Edita tu foto
              </label>
            </div>
          </Row>
        </Fragment>
        <Row className="justify-content-center">
          <Col xs>
            <h2 className="font-weight-light"> {props.user.name} </h2>
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          {errorName && <div className="alert alert-danger">{errorName}</div>}
          <Col xs>
            <button onClick={() => setactiveForm(!activeForm)}>
              Edita tu nombre
            </button>
          </Col>
        </Row>
        {activeForm && (
          <div className="card-body">
            <Row className="justify-content-center">
              <Col xs>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    minLength="4"
                    maxLength="23"
                    className="form-control"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button type="button" onClick={() => upName()}>
                      Actualizar
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default EditProfile;
