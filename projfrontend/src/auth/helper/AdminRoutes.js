import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { isAutheticated } from ".";

const AdminRoute = ({ component: Component, ...rest }) => {
  // console.log(isAutheticated().user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
