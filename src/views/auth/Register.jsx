import React, { useEffect, useState } from "react";
import AuthOptions from "../../components/AuthOptions";
import FormRegister from "../../components/FormRegister";
import FormLogin from "../../components/FormLogin";
import LogoAnimation2 from "../../components/LogoAnimation";
import { useUiDataContext } from "../../context/uiContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { active, loading } = useUiDataContext();
  const [esRegistro, setEsRegistro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (active) {
      navigate("/");
    }
  }, []);

  const cancel = () => {
    // dispatch(finishLoading());
  };

  return (
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
              <h1 className="authOptions--title">Regístrate</h1>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-xs-1-12 col-lg-6">
                <h2>Con Redes Sociales</h2>
                <AuthOptions />
                <button
                  className="authOptions--btnCuenta"
                  onClick={() => setEsRegistro(!esRegistro)}
                >
                  {esRegistro
                    ? "¿Ya estas Registrado? Inicia Sesión"
                    : "¿No tienes Cuenta? Regístrate"}
                </button>
              </div>
              <div className="col-xs-1-12 col-lg-6">
                <h2>Con Correo electrónico</h2>
                <FormRegister />
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <h1 className="authOptions--title">Inicia Sesión</h1>
          </div>

          <div className="row justify-content-center text-center">
            <div className="col-xs-1-12 col-lg-6">
              <h2>Con Redes Sociales</h2>
              <AuthOptions />
              <button
                className="authOptions--btnCuenta"
                onClick={() => setEsRegistro(!esRegistro)}
              >
                {esRegistro
                  ? "¿Ya estas Registrado? Inicia Sesión"
                  : "¿No tienes Cuenta? Regístrate"}
              </button>
            </div>
            <div className="col-xs-1-12 col-lg-6">
              <h2>Con Correo electrónico</h2>
              <FormLogin />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
