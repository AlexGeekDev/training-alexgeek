import React, { Fragment } from "react";
import logo from "../assets/logo/janz.png";

const ProfileFace = (props) => {
  return (
    <Fragment>
      <div className="container profile">
        <div className="row text-center">
          <div className="col-xs-1-12 col-lg-6 profile--header">
            <img className="profile--logo" src={logo} alt="" />
          </div>
          <div className="col-xs-1-12 col-lg-6 profile--header">
            <p className="profile--name"> {`${props.user.name}`} </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-xs-1-12 col-lg-6 profile--face">
            <div className="profile--info mt-5">
              <img src={props.user.photo} alt="" />
              <p> {`${props.user.name} / Janz ${props.user.role}`} </p>
            </div>
          </div>
          <div className="col-xs-1-12 col-lg-6 profile--score mt-4">
            <div className="profile--info mt-1">
              <h2 className="text-primary"> {`Métodos de pago`} </h2>
              <Fragment>
                <h2 className="text-warning">TDC Uno</h2>
              </Fragment>
              <Fragment>
                <h2 className="text-warning">Tdc Dos</h2>
              </Fragment>
              <button>Agregar método de pago</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileFace;
