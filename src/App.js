import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import Login from "./pages/auth/components/Login";
import ResetPassword from "./pages/auth/components/ResetPassword";
import { LayoutBackOffice } from "./pages/back_office";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <div className="h-100">
      <Router>
        <Switch>
          <PublicRoute path="/connexion" exact={true} component={Login} />
          <PublicRoute
            path="/mot-de-passe-oublié"
            exact={true}
            component={ForgotPassword}
          />
          <PublicRoute
            path="/réinitialiser-mot-de-passe/:token"
            exact={true}
            component={ResetPassword}
          />
          <LayoutBackOffice />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
