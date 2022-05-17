import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "moment/locale/es";
import moment from "moment";
import Countdown from "react-countdown";
import logo from "../../assets/logo/janz.png";
// import { useDispatch, useSelector } from "react-redux";
// import { startLogout } from "../Redux/Actions/auth";
// import { addAvailable, removeAvailable, readUser } from "../Redux/Actions/user";
// import { db } from "../firebase-config";
// import { isTime } from "../Redux/Actions/room";
// import { apiNotif } from "../components/Payments/Twilio";
import { useUiDataContext } from "../../context/uiContext";
import { useUserDataContext } from "../../context/userContext";

const Burger = () => {
  const [open, setOpen] = useState(false);
  const { userDb } = useUserDataContext();
  //   const {    name } = useSelector(
  //     (state) => state.user
  //   );
  //   const dispatch = useDispatch();
  const { active, role } = useUiDataContext();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [status, setStatus] = useState([]);
  const statusData = status.map((item) => item.available);
  const available = statusData.join();
  const notifClassData = status.map((item) => item.notifClass);
  const notifClass = notifClassData.join();
  const busyData = status.map((item) => item.busy);
  const busyState = busyData[0];
  const [busyDates, setBusyDates] = useState([]);
  const busyArray = busyDates.map((item) => item.classTime);
  const busy = busyArray[0];
  const classNowData = busyDates.map((item) => item.classNow);
  const classNow = classNowData[0];
  const now = new Date().getTime();
  const [lessons, setLessons] = useState([]);
  const [nextClass, setNextClass] = useState([]);
  const nextClassUser = nextClass.map((item) => item.classTime);
  const next = nextClassUser[0];
  const nameTeacherData = lessons.map((item) => item.nameTeacher);
  const nameTeacher = nameTeacherData[0];

  const Completionist = () => {
    // dispatch(isTime());
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <Fragment>
          {classNow && (
            <div>
              <h5 className="lobby--classWarning">Clase ahora entra!</h5>
              <div className="row justify-content-center">
                <h5> {`${moment(busy).calendar()}`} </h5>
              </div>
            </div>
          )}
          {!classNow && (
            <div>
              <div className="row justify-content-center">
                <h5> {`Clase: ${moment(busy).calendar()}`} </h5>
              </div>
              <h5 className="lobby--timeOut">Deberías estar en clase!</h5>
            </div>
          )}
        </Fragment>
      );
    } else {
      // Render a countdown
      return (
        <Fragment>
          <div className="row justify-content-center">
            <h5> {`Clase: ${moment(busy).calendar()}`} </h5>
          </div>
          <div className="row justify-content-center">
            <h5 className="lobby--countdown">
              {days}:{hours}:{minutes}:{seconds}
            </h5>
          </div>
        </Fragment>
      );
    }
  };

  const renderer2 = ({ completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <Fragment>
          {classNow & (next !== undefined) ? (
            <div>
              <h5 className="lobby--classWarning">Clase ahora entra!</h5>
              <div className="row justify-content-center">
                <h5> {`${moment(next).calendar()}`} </h5>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {!classNow & (next !== undefined) ? (
            <div>
              <div className="row justify-content-center">
                <h5> {`Clase: ${moment(next).calendar()}`} </h5>
              </div>
              <h5 className="lobby--timeOut">Deberías estar en clase!</h5>
            </div>
          ) : (
            <div></div>
          )}
        </Fragment>
      );
    } else {
      // Render a countdown
      return (
        <div>
          {next !== undefined && (
            <Fragment>
              <div className="row justify-content-center">
                <h5 className="text-primary">
                  {" "}
                  {`Clase: ${moment(next).calendar()}`}{" "}
                </h5>
              </div>
              <div className="row justify-content-center">
                <h5 className="lobby--countdown text-warning">{`Teacher: ${nameTeacher}`}</h5>
              </div>
            </Fragment>
          )}
        </div>
      );
    }
  };

  React.useEffect(() => {
    if (active) {
      cargarStatus();
      cargarStatus2();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarStatus = async () => {
    // if (role === "Teacher") {
    //   db.collection("users")
    //     .where("uid", "==", userDb.uid)
    //     .onSnapshot((query) => {
    //       const arrayUser = query.docs.map((item) => item.data());
    //       setStatus(arrayUser);
    //     });
    //   db.collection(`users/${userDb.email}/lessons`)
    //     .orderBy("classPlus")
    //     .where("classPlus", ">=", now)
    //     .limit(1)
    //     .onSnapshot((query) => {
    //       const arrayLessons = query.docs.map((item) => item.data());
    //       setBusyDates(arrayLessons);
    //     });
    // }
  };

  const cargarStatus2 = async () => {
    // if (role === "User") {
    //   db.collection(`users/${userDb.email}/lessons`)
    //     // .where("userDb.uid", "==", userDb.uid)
    //     .onSnapshot((query) => {
    //       const arrayUser = query.docs.map((item) => item.data());
    //       setLessons(arrayUser);
    //     });
    //   db.collection(`users/${userDb.email}/lessons`)
    //     .orderBy("classPlus")
    //     .where("classPlus", ">=", now)
    //     .limit(1)
    //     .onSnapshot((query) => {
    //       const arrayLessons = query.docs.map((item) => item.data());
    //       setNextClass(arrayLessons);
    //     });
    // }
  };

  const handleAvailable = () => {
    // dispatch(addAvailable(userDb.email));
    handleNotif();
  };

  const handleRemoveAvailable = () => {
    // dispatch(removeAvailable(userDb.email));
    handleNotifNoAvailable();
  };

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
    // dispatch(startLogout(userDb.email, name));
    scroll.scrollToTop({ duration: 500 });
  };

  const handleNotif = async () => {
    // await apiNotif.post("/api/notif", {
    //   phone: "+5217227098833",
    //   message: `Hola desde Janz! el Profesor: ${userDb.name} acaba de cambiar su estado a !Disponible!`,
    // });
  };

  const handleNotifNoAvailable = async () => {
    // await apiNotif.post("/api/notif", {
    //   phone: "+5217227098833",
    //   message: `Hola desde Janz! el Profesor: ${userDb.name} acaba de cambiar su estado a !No Disponible!`,
    // });
  };

  return (
    <Fragment>
      {notifClass === "true" && (
        <div className="row justify-content-center header--notif fixed-bottom">
          <Link to="/Lobby">
            <h4 className="header--notifTitle">
              Tienes una clase entra a la sala!!
            </h4>
          </Link>
        </div>
      )}
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
                        className="burgerMenu--userDb.photo"
                        src={userDb.photo}
                        alt=""
                      />
                    </Link>
                  )}
                  {role === "Teacher" && (
                    <Link to={`/@${userDb.nickName}`}>
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
                        className="burgerMenu--userDb.photo"
                        src={userDb.photo}
                        alt=""
                      />
                    </Link>
                  )}
                  {role === "Admin" && (
                    <>
                      <Link to={`/$${userDb.nickName}`}>
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
                          className="burgerMenu--userDb.photo"
                          src={userDb.photo}
                          alt=""
                        />
                      </Link>
                      <Link to="/JanzAdmin">
                        <span className="mr-3">Administrar</span>
                      </Link>
                      <Link to="/Tests">
                        <span>Test</span>
                      </Link>
                    </>
                  )}
                  <div className="mt-3 mb-2">
                    {(role === "Teacher") &
                    (available === "false") &
                    (notifClass === "false") &
                    (busyState === false) ? (
                      <button className="btnJanz" onClick={handleAvailable}>
                        Recibir Clases Instantaneas
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {(role === "Teacher") & (available === "true") ? (
                      <button className="btnGo" onClick={handleRemoveAvailable}>
                        Clases Instantaneas
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <Fragment>
                    {(role === "Teacher") & (busy !== undefined) ? (
                      <div className="col-xs-1-12">
                        <Countdown
                          date={moment(busy) + 0}
                          renderer={renderer}
                          onComplete={Completionist}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Fragment>
                  <Fragment>
                    {role === "User" ? (
                      <div className="col-xs-1-12">
                        <Countdown
                          date={moment(next) + 0}
                          renderer={renderer2}
                          onComplete={Completionist}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Fragment>
                </div>
              </div>
            )}

            {active ? (
              <div className="col-xs-1-12 col-lg-1 burgerMenu--nav mb-2">
                <Link to="/Profesores">
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
                    Encuentra un Profesor
                  </span>
                </Link>
              </div>
            ) : (
              <div className="col-xs-1-12 col-lg-1 burgerMenu--nav mb-2">
                <Link to="/ProfesoresLogout">
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
                    Encuentra un Profesor
                  </span>
                </Link>
              </div>
            )}

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

            {/* {active && ( */}
            <div className="row align-items-center mb-2">
              <div className="col-xs-1-12 col-lg-1 burgerMenu--nav">
                <Link to="/JanzBlog">
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
                    Blog
                  </span>
                </Link>
              </div>
            </div>
            <div className="row align-items-center mb-2">
              <div className="col-xs-1-12 col-lg-1 burgerMenu--nav">
                <Link to="/Blog">
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
                    News
                  </span>
                </Link>
              </div>
            </div>
            {/* )} */}

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
            {active && (
              <div className="row align-items-center mb-2">
                <div className="col-xs-1-12 col-lg-1 burgerMenu--nav ">
                  {role === "User" && (
                    <Link to="/Lobby">
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
                        Entrar a clase
                      </span>
                    </Link>
                  )}
                  {role === "Teacher" && (
                    <Link to="/Lobby">
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
                        Entrar a clase
                      </span>
                    </Link>
                  )}
                  {role === "Admin" && (
                    <Link to="/Lobby">
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
                        Entrar a clase
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            )}
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
