import React from "react";
import Menu from "./Menu";
import "../styles.css";
function Base({
  title = "",
  description = "",
  className = "bg-dark text-white ",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className=" jumbotron  py-4 bg-dark text-white text-center">
          <h1 className="">{title}</h1>
          <h4 className="">{description}</h4>
          <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto">
          <div className="container-fluid bg-success text-white text-center py-3">
            <h5>If you got any questions , feel free to reach out!</h5>
            <button className="btn btn-warning btn-lng">Contact Us</button>
          </div>
          <div className="container">
            <span className="text-muted">
              An amazing <span className="text-white">Place To Buy</span> Tshirt
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Base;
