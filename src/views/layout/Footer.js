import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import facebook from "../../assets/socialMedia/facebook.png";
import linkedin from "../../assets/socialMedia/linkedin.png";
import instagram from "../../assets/socialMedia/instagram.png";
import whatsapp from "../../assets/socialMedia/whatsapp.png";
import youtube from "../../assets/socialMedia/youtube.png";
import twitter from "../../assets/socialMedia/twitter.png";
import playstore from "../../assets/socialMedia/playstoreavailable.png";
import appstore from "../../assets/socialMedia/app-store apple.png";
import microsoftstore from "../../assets/socialMedia/microsoftstore.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Footer = () => {
  const toTop = () => {
    scroll.scrollToTop({ duration: 500 });
  };
  const handleStores = () => {
    Swal.fire(
      "Muy pronto estaremos en todos lados",
      "Estamos desarrollando el código para tener presencia en todas las plataforma ya falta muy poco",
      "info"
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid footer">
        <div className="row justify-content-center text-center">
          <div className="col-xs-1-12 col-lg-2">
            <Link to="/about">
              <h5 onClick={toTop}>Acerca de Nosotros</h5>
            </Link>
          </div>
          <div className="col-xs-1-12 col-lg-2">
            <Link
              to={{
                pathname: "https://wa.me/527227098833",
              }}
              target="_blank"
            >
              <h5>Ayuda</h5>
            </Link>
          </div>
          <div className="col-xs-1-12 col-lg-2">
            <Link to="/policy">
              <h5 onClick={toTop} className="footer--item">
                Política de Privacidad
              </h5>
            </Link>
          </div>
          <div className="col-xs-1-12 col-lg-2">
            <Link to="/privacy">
              <h5 onClick={toTop} className="footer--item">
                Terminos y Condiciones
              </h5>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center footer--socialMedia text-center py-2">
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname: "https://www.facebook.com/JanzLearning",
              }}
              target="_blank"
            >
              <img
                src={facebook}
                alt="facebook"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname:
                  "https://api.whatsapp.com/send?phone=527227098833&text=Hola%20Janz!%20necesito%20ayuda!",
              }}
              target="_blank"
            >
              <img
                src={whatsapp}
                alt="whatsapp"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname: "https://twitter.com/Janz36173646",
              }}
              target="_blank"
            >
              <img
                src={twitter}
                alt="facebook"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname:
                  "https://www.youtube.com/channel/UClQpeJINgA7fJDjChnl5nyw",
              }}
              target="_blank"
            >
              <img
                src={youtube}
                alt="facebook"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname: "https://www.linkedin.com/company/janzlearning",
              }}
              target="_blank"
            >
              <img
                src={linkedin}
                alt="facebook"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
          <div className="col-3 col-lg-1">
            <Link
              to={{
                pathname: "https://www.instagram.com/janzlearning/",
              }}
              target="_blank"
            >
              <img
                src={instagram}
                alt="instagram"
                className="img-fluid footer--img my-2"
              />
            </Link>
          </div>
        </div>
        <div className="row justify-content-center footer--socialMedia text-center pt-1">
          <h4>Síguenos en Redes sociales</h4>
        </div>

        <div className="row justify-content-center">
          <div className="col-xs-1-12 text-center">
            <p className="px-3">
              2022 Janz Copyright todos los derechos reservados®© De México con
              amor <FontAwesomeIcon icon={faHeart} /> para el mundo
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
