import React, { useState, useContext, useEffect } from "react";
import Base from "../core/Base";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";
import { cartCounter } from "../core/helper/cartHelper";
import { CartCountContext } from "../CartCountContext";

const Signin = () => {
  const [values, setValues] = useState({
    email: "john@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    setCartCount(cartCounter());
  }, []);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("sign in request failed"));
  };
  const performRedirect = () => {
    if (didRedirect) {
      const { user } = isAutheticated();

      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () =>
    loading && (
      <div className="alert alert-info">
        <h2>loading...</h2>
      </div>
    );
  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In Page" description="A page for user to signin!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center"> {JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
