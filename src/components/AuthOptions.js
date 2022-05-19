import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { useUiDataContext } from "../context/uiContext";
import { regWithGoogle, regWithFacebook } from "../services/auth";

const AuthOptions = () => {
  const { loading } = useUiDataContext();

  const agent = window.navigator.userAgent;

  return (
    <Fragment>
      {!agent.includes("FB") ? (
        <div>
          <div className="col-xs-1-6 col-lg-12 authOptions--item">
            <button
              className="authOptions--btnFacebook"
              onClick={() => regWithFacebook()}
              disabled={loading}
            >
              Facebook
            </button>
          </div>
          <div className="col-xs-1-6 col-lg-12 authOptions--item">
            <button
              className="authOptions--btnGoogle"
              onClick={() => regWithGoogle()}
              disabled={loading}
            >
              Google
            </button>
          </div>
        </div>
      ) : (
        <div className="col-xs-1-6 col-lg-12 text-center mt-5">
          <div className="col-xs-1-6 col-lg-12 authOptions--item">
            <button
              className="authOptions--btnGoogle"
              onClick={() => regWithGoogle()}
              disabled={loading}
            >
              Google
            </button>
          </div>
          {/* <div className="col-xs-1-6 col-lg-12 authOptions--item">
            <button
              className="authOptions--btnFacebook"
              onClick={() => dispatch(startFacebookLoginRedirect())}
              disabled={loading}
            >
              Facebook
            </button>
          </div> */}
          <FontAwesomeIcon icon={faSadTear} /> Irónicamente el navegador Interno
          de Facebook no es compatible con el inicio de sesión de Facebook Para
          iniciar sesión con tu cuenta de Facebook, utiliza Chrome, Edge,
          Firefox, Opera o Brave solo coloca en la barra de direcciones
          janz.app!
        </div>
      )}

      <div className="col-xs-1-12 mt-5">
        <Link to="/Privacy">* Leer Terminos y condiciones</Link>
      </div>
    </Fragment>
  );
};

export default AuthOptions;
