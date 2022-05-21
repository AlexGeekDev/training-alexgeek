import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "moment/locale/es";
import logo from "../../assets/logo/janz.png";
import { useUiDataContext } from "../../context/uiContext";
import { useUserDataContext } from "../../context/userContext";
import { logout } from "../../services/auth";
import { Container, Row, Col } from "react-bootstrap";

const Burger = () => {
  const [open, setOpen] = useState(false);
  const { userDb } = useUserDataContext();
  const { active, role } = useUiDataContext();
  const ref = useRef(null);
  const ref2 = useRef(null);

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !ref2.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleLogout = () => {
    logout(userDb.email);
    scroll.scrollToTop({ duration: 500 });
  };

  return (
    <Fragment>
      <Container
        className={`${open ? "burger isActiveBurger" : "container burger"}`}
      >
        <Fragment>
          <button
            ref={ref2}
            className={`${
              open
                ? "hamburger hamburger--slider is-active"
                : "hamburger hamburger--slider"
            }`}
            type="button"
            open={open}
            onClick={() => {
              if (open === true) {
                setOpen(false);
                handleClickOutside(false);
              } else {
                setOpen(true);
              }
            }}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </Fragment>
      </Container>
      {/* Hamburger Menu a partir de aquí para que al dar click en enlaces tambien se oculte */}
      <div ref={ref} className={`${open ? "burgerMenu isActive" : ""}`}>
        <Fragment>
          <Container className="text-center burgerMenu">
            <Row className="align-items-center mb-5 mt-4">
              <Col xs={12} className="burgerMenu--nav">
                <Link to="/">
                  <img
                    onClick={() => {
                      if (open === true) {
                        setOpen(false);
                        handleClickOutside(false);
                      } else {
                        setOpen(true);
                      }
                      scroll.scrollToTop({ duration: 500 });
                    }}
                    className="burgerMenu--logo"
                    src={logo}
                    alt="logo janz"
                  />
                </Link>
              </Col>
            </Row>

            {active && (
              <Fragment>
                <Row className="align-items-center mb-2">
                  <Col xs={12} className="burgerMenu--nav">
                    {role === "User" && (
                      <Link to={`/@${userDb.path}`}>
                        <img
                          onClick={() => {
                            if (open === true) {
                              setOpen(false);
                              handleClickOutside(false);
                            } else {
                              setOpen(true);
                            }
                            scroll.scrollToTop({ duration: 500 });
                          }}
                          className="burgerMenu--photo"
                          src={userDb.photo}
                          alt=""
                        />
                      </Link>
                    )}
                  </Col>
                </Row>
                <Col xs={12} className="burgerMenu--nav mb-5">
                  <Link to={`/@${userDb.path}`}>
                    <span
                      onClick={() => {
                        if (open === true) {
                          setOpen(false);
                          handleClickOutside(false);
                        } else {
                          setOpen(true);
                        }
                        scroll.scrollToTop({ duration: 500 });
                      }}
                      className="font-weight-light"
                    >
                      {userDb.name}
                    </span>
                  </Link>
                </Col>
              </Fragment>
            )}

            <Col xs={12} className="burgerMenu--nav mb-4">
              <Link to="/finder">
                <span
                  onClick={() => {
                    if (open === true) {
                      setOpen(false);
                      handleClickOutside(false);
                    } else {
                      setOpen(true);
                    }
                    scroll.scrollToTop({ duration: 500 });
                  }}
                  className="font-weight-light"
                >
                  Encuentra un Curso
                </span>
              </Link>
            </Col>

            <Row className="align-items-center mb-5 mt-5">
              {!active && (
                <Col xs={12} className="burgerMenu--nav ">
                  <Link to="/Login">
                    <span
                      onClick={() => {
                        if (open === true) {
                          setOpen(false);
                          handleClickOutside(false);
                        } else {
                          setOpen(true);
                        }
                        scroll.scrollToTop({ duration: 500 });
                      }}
                      className="font-weight-light"
                    >
                      Iniciar Sesión
                    </span>
                  </Link>
                </Col>
              )}
            </Row>

            <Row className="align-items-center mb-4">
              {!active && (
                <Col xs={12} className="burgerMenu--nav">
                  <Link to="/Register">
                    <button
                      onClick={() => {
                        if (open === true) {
                          setOpen(false);
                          handleClickOutside(false);
                        } else {
                          setOpen(true);
                        }
                        scroll.scrollToTop({ duration: 500 });
                      }}
                      className="burgerMenu--btn"
                    >
                      Regístrate
                    </button>
                  </Link>
                </Col>
              )}
            </Row>
            <Row className="align-items-center mb-5">
              {active && (
                <Col xs={12} className="burgerMenu--nav">
                  <button
                    onClick={() => {
                      if (open === true) {
                        setOpen(false);
                        handleClickOutside(false);
                        handleLogout();
                      } else {
                        setOpen(true);
                      }
                      scroll.scrollToTop({ duration: 500 });
                    }}
                    className="burgerMenu--btn"
                  >
                    Cerrar Sesión
                  </button>
                </Col>
              )}
            </Row>
          </Container>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Burger;
