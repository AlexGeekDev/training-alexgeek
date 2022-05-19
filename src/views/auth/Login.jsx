import React, { useState, useEffect } from "react";
import AuthOptions from "../../components/AuthOptions";
import FormRegister from "../../components/FormRegister";
import FormLogin from "../../components/FormLogin";
import { useUiDataContext } from "../../context/uiContext";
import LogoAnimation2 from "../../components/LogoAnimation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { active, loading } = useUiDataContext();
  const [esRegistro, setEsRegistro] = useState(true);
  const navigate = useNavigate();
  console.log(active);

  useEffect(() => {
    if (active) {
      navigate("/");
    }
  }, [active]);

  const cancel = () => {
    // dispatch(finishLoading());
    // props.history.push("/Login");
  };

  return (
    <React.Fragment>
      <React.Fragment>
        {loading ? (
          <div className="container my-5 reglog">
            <div className="row justify-content-center align-items-center reglog--spiners">
              <div className="col-xs-1-12">
                <div className="spinner-grow text-primary mr-5" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-primary mr-5" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-xs-1-12">
                <button className="reglog--cancel" onClick={cancel}>
                  Cancelar
                </button>
              </div>
            </div>
            <div className="row justify-content-center reglog--animation">
              <div className="col-xs-1-12">
                <LogoAnimation2 />
              </div>
            </div>
          </div>
        ) : esRegistro ? (
          !active && (
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <h1 className="authOptions--title">Inicia Sesión</h1>
                <button
                  className="authOptions--btnCuenta"
                  onClick={() => setEsRegistro(!esRegistro)}
                >
                  {esRegistro
                    ? "¿No tienes Cuenta? Regístrate"
                    : "¿Ya estas Registrado? Inicia Sesión"}
                </button>
              </div>

              <div className="row justify-content-center  text-center">
                <div className="col-xs-1-12 col-lg-6">
                  <h2 className="authOptions--subtitle">Con Redes Sociales</h2>
                  <AuthOptions />
                </div>
                <div className="col-xs-1-12 col-lg-6">
                  <h2 className="authOptions--subtitle">
                    Con Correo electrónico
                  </h2>
                  <FormLogin />
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <h1 className="authOptions--title">Regístrate</h1>
              <button
                className="authOptions--btnCuenta"
                onClick={() => setEsRegistro(!esRegistro)}
              >
                {esRegistro
                  ? "¿No tienes Cuenta? Regístrate"
                  : "¿Ya estas Registrado? Inicia Sesión"}
              </button>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-xs-1-12 col-lg-6">
                <h2 className="authOptions--subtitle">Con Redes Sociales</h2>
                <AuthOptions />
              </div>
              <div className="col-xs-1-12 col-lg-6">
                <h2 className="authOptions--subtitle">
                  Con Correo electrónico
                </h2>
                <FormRegister />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Login;
