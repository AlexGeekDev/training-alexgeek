import React, { Fragment } from "react";
import logo from "../assets/logo/janz.png";
import { Link } from "react-router-dom";

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
              <h2 className="text-primary"> {`Clases Tomadas: `} </h2>
              {(props.user.freeUses !== undefined) &
              (props.user.freeUses !== 10) ? (
                <h2 className="text-warning">
                  {" "}
                  {`Pruebas Gratuitas: ${props.user.freeUses} te quedan: ${
                    4 - props.user.freeUses
                  }`}{" "}
                </h2>
              ) : (
                <Fragment>
                  {props.user.freeUses !== 10 ? (
                    <h2 className="text-warning">
                      {" "}
                      {`Pruebas Gratuitas: 0 te quedan: 4`}
                    </h2>
                  ) : (
                    <p className="text-danger">
                      {" "}
                      {`Faltaste a tu prueba gratuita
                        desafortunadamente no podemos ofrecerte mas pruebas :(`}
                    </p>
                  )}
                </Fragment>
              )}
              <h2 className="text-primary">
                {" "}
                {`Puntos: ${props.user.puntos}`}{" "}
              </h2>
              <Link
                to={{
                  pathname:
                    "https://api.whatsapp.com/send?phone=527227098833&text=Hola%20Janz!%20quiero%20ocupar%20mi%20JanzSaldo!!",
                }}
                target="_blank"
              >
                <button>Ocupar saldo Janz para una clase</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileFace;
