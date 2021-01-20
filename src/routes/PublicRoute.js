import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PublicRoute(props) {
  const token = localStorage.getItem("SHOP-MANAGEMENT-TOKEN");
  const user = localStorage.getItem("SHOP-MANAGEMENT-USER");

  function isAuthenticated() {
    if (token && user) {
      return <Redirect to="/erreur-403" />;
    } else {
      return <props.component />;
    }
  }

  return (
    <Route path={props.path} exact={props.exact} render={isAuthenticated} />
  );
}
