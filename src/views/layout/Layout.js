import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import NavBar from "./Header";
import Burger from "./Burger";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { firebase, db } from "../firebase-config";
import Swal from "sweetalert2";
import { useUiDataContext } from "../../context/uiContext";

const Layout = (props) => {
  const { verified } = useUiDataContext();
  const [visible, setVisble] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 991;
  const location = useLocation();
  const pathName = location.pathname;

  const reSendVer = () => {
    // firebase
    //   .auth()
    //   .currentUser.sendEmailVerification()
    //   .then(function () {
    //     Swal.fire(
    //       "Revisa tu correo",
    //       "Te reenviamos el correo de verificación, en cuanto hayas verificado tu cuenta solo actualiza la página para poder navegar con tu cuenta verificada",
    //       "success"
    //     );
    //     setVisble(false);
    //   })
    //   .catch(function (error) {
    //     Swal.fire("Error", error.message, "error");
    //   });
  };

  const ShowNavbar = () => {
    if (pathName !== "/JanzVideo") {
      return <NavBar />;
    } else {
      return null;
    }
  };

  const ShowFooter = () => {
    if (pathName !== "/JanzVideo") {
      return <Footer />;
    } else {
      return null;
    }
  };

  const ShowBurger = () => {
    if (pathName !== "/JanzVideo") {
      return <Burger />;
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Fragment>
      {width < breakpoint ? (
        <div className="marginBurger">
          <ShowBurger />
        </div>
      ) : (
        <div className="marginNavbar">
          <ShowNavbar />
        </div>
      )}
      {verified === false && (
        <div className="row justify-content-center text-center">
          <h6 className="text-warning mx-3">
            Tu cuenta no esta verificada porfavor verificala para poder acceder
            a todas las funciones, te enviamos un correo electrónico
          </h6>
          {visible ? (
            <button className="btnWarningLight mb-3" onClick={reSendVer}>
              Reenviar Verificación
            </button>
          ) : (
            <h6 className="text-primary">
              Al verificar tu cuenta porfavor actualiza la página
            </h6>
          )}
        </div>
      )}
      {props.children}
      <div className="marginFooter">
        <ShowFooter />
      </div>
    </Fragment>
  );
};

export default Layout;
