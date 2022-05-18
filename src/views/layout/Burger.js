import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "moment/locale/es";
import logo from "../../assets/logo/janz.png";
import { useUiDataContext } from "../../context/uiContext";
import { useUserDataContext } from "../../context/userContext";
import { logout } from "../../services/auth";

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
      <div
        className={`${
          open ? "container burger isActiveBurger" : "container burger"
        }`}
      >
        <div className="">
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
        </div>
      </div>
      {/* Hamburger Menu a partir de aquí para que al dar click en enlaces tambien se oculte */}
      <div ref={ref} className={`${open ? "burgerMenu isActive" : ""}`}>
        <Fragment>
          <div className="container text-center burgerMenu">
            <div className="row align-items-center mb-2">
              <div className="col-xs-1-12 col-lg-8 burgerMenu--nav">
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
              </div>
            </div>

            {active && (
              <div className="row align-items-center mb-2">
                <div className="col-xs-1-12 col-lg-8 burgerMenu--nav">
                  {role === "User" && (
                    <Link to={`/+${userDb.uid}`}>
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
                </div>
              </div>
            )}

            <div className="col-xs-1-12 col-lg-1 burgerMenu--nav mb-2">
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
            </div>

            <div className="row align-items-center mb-2">
              {!active && (
                <div className="col-xs-1-12 col-lg-1 burgerMenu--nav ">
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
                </div>
              )}
            </div>

            <div className="row align-items-center mb-2">
              {!active && (
                <div className="col-xs-1-12 col-lg-1 burgerMenu--nav">
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
                </div>
              )}
            </div>
            <div className="row align-items-center mb-5">
              {active && (
                <div className="col-xs-1-12 col-lg-1 burgerMenu--nav">
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
                </div>
              )}
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Burger;
