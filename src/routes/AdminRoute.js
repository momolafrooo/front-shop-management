import { AnimatePresence } from "framer-motion";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import AllArticles from "../pages/back_office/articles/AllArticles";
import Dashboard from "../pages/back_office/dashboard/Dashboard";
import Error403 from "../pages/back_office/errors/Error403";
import Error404 from "../pages/back_office/errors/Error404";
import AddExpense from "../pages/back_office/expenses/AddExpense";
import AllExpenses from "../pages/back_office/expenses/AllExpenses";
import AddShop from "../pages/back_office/shop/AddShop";
import AllShops from "../pages/back_office/shop/AllShops";
import ShowShop from "../pages/back_office/shop/ShowShop";
import UpdateShop from "../pages/back_office/shop/UpdateShop";
import AddUser from "../pages/back_office/users/AddUser";
import AllUsers from "../pages/back_office/users/AllUsers";
import ShowUser from "../pages/back_office/users/ShowUser";
import UpdateUser from "../pages/back_office/users/UpdateUser";

const AdminRoute = () => {
  const location = useLocation();
  return (
    <PrivateRoute>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route path="/" exact component={Dashboard} />
          <Route path="/articles/tous-les-articles" component={AllArticles} />
          <Route path="/boutiques/ajouter-boutique" component={AddShop} />

          <Route path="/boutiques/toutes-les-boutiques" component={AllShops} />
          <Route
            path="/boutiques/modifier-boutique/:id"
            component={UpdateShop}
          />
          <Route path="/boutiques/afficher-boutique/:id" component={ShowShop} />

          <Route
            path="/utilisateurs/tous-les-utilisateurs"
            component={AllUsers}
          />
          <Route path="/utilisateurs/ajouter-utilisateur" component={AddUser} />
          <Route
            path="/utilisateurs/afficher-utilisateur/:id"
            component={ShowUser}
          />
          <Route
            path="/utilisateurs/modifier-utilisateur/:id"
            component={UpdateUser}
          />
          <Route path="/dépenses/toutes-les-dépenses" component={AllExpenses} />
          <Route path="/dépenses/ajouter-dépense" component={AddExpense} />

          <Route path="/erreur-403" strict component={Error403} />
          <Route component={Error404} />
        </Switch>
      </AnimatePresence>
    </PrivateRoute>
  );
};

export default AdminRoute;

export const PrivateRoute = (props) => {
  const Children = props.children;
  const token = localStorage.getItem("SHOP-MANAGEMENT-TOKEN");
  const user = localStorage.getItem("SHOP-MANAGEMENT-USER");

  return token && user ? (
    Children
  ) : (
    <Redirect to={{ pathname: "/connexion" }} />
  );
};
