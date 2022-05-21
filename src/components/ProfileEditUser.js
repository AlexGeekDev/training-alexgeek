import React, { Fragment, useState } from "react";
import logo from "../assets/logo/janz.png";
import { Container, Row, Col } from "react-bootstrap";
import { useUserDataContext } from "../context/userContext";
import { profileSttings } from "../services/user";
import useForm from "../hooks/useForm";

const EditProfile = () => {
  const { userDb } = useUserDataContext();
  const [error, setError] = useState(false);
  const [image, setImage] = useState(userDb.photo);
  const [urlImage, setUrlImage] = useState();
  const [formValues, handleInputChange] = useForm({
    name: userDb.name,
  });
  const { name } = formValues;
  console.log(name);

  const selectFile = (imagen) => {
    const imageSelected = imagen.target.files[0];

    if (imageSelected === undefined) {
      console.log("no se seleccionó imagen");
      return;
    }

    if (
      imageSelected.type === "image/jpeg" ||
      imageSelected.type === "image/jpg" ||
      imageSelected.type === "image/png"
    ) {
      const imageUrl = URL.createObjectURL(imageSelected);
      setUrlImage(imageUrl);
      setImage(imageSelected);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleUpdateProfile = () => {
    profileSttings(userDb.email, name, image, userDb.photo);
  };

  return (
    <Fragment>
      <Container className="editProfile" style={{ textAlign: "center" }}>
        <Row>
          <Col xs className="profile--header">
            <img className="profile--logo" src={logo} alt="" />
          </Col>
          <Col xs className="profile--header">
            <p className="profile--name"> {`${userDb.name}`} </p>
          </Col>
        </Row>
        <Fragment>
          <Row>
            <Col xs className="justify-content-center mb-3 editProfile--dash">
              <img
                className="editProfile--photo mb-3"
                src={urlImage !== undefined ? urlImage : userDb.photo}
                alt=""
              />
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
                  Seleccionar nueva foto
                </label>
              </div>
            </Col>
            <Col xs>
              <h1 className="mb-5 mt-5"> {userDb.name} </h1>
              <div>
                <input
                  type="text"
                  minLength="4"
                  maxLength="23"
                  className="form-control"
                  placeholder={`Actualiza tu nombre:  ${userDb.name}`}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
            </Col>
            {error && (
              <div className="alert alert-warning mt-3 text-center">
                Solo archivos .png o .jpg
              </div>
            )}
          </Row>
          <Row>
            <button onClick={handleUpdateProfile}>Actualizar Perfil</button>
          </Row>
        </Fragment>
      </Container>
    </Fragment>
  );
};

export default EditProfile;
