import React, { Fragment } from "react";
import notFound from "../assets/img/notFound.png";

function NotFound() {
  return (
    <Fragment>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-1-12">
            <img src={notFound} alt="not found" className="img-fluid" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotFound;
