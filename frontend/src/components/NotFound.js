import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const NotFound = () => (
  <div className="ui two column centered grid ">
    <div className="column">
      <Nav />
      <h4>
        {" "}
        Opps! Page Not Found - <Link to="/">Return Home</Link>
      </h4>
    </div>
  </div>
);

export default NotFound;
