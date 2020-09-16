import React from "react";
import Menu from "./Menu";
import "../styles.css";
function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
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
