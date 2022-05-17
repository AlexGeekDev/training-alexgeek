import React from "react";
import { Row } from "react-bootstrap";
import janz from "../assets/logo/Janz blanco.png";

class LogoAnimation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="row">
          <div className="col-xs-1-12 col-lg-6 hero--container__deca">
            <div className="view">
              <div className="plane main">
                <img
                  className="circle hero--container__janz"
                  src={janz}
                  alt="janz"
                />
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default LogoAnimation;
