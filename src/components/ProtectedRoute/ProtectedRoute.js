import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? props.children : <Redirect to="./signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;