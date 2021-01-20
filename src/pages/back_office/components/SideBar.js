import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import {
  faCog,
  faDollarSign,
  faFileInvoiceDollar,
  faHome,
  faShoppingCart,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [user, setUser] = useState({});

  useEffect(function () {
    setUser(JSON.parse(localStorage.getItem("SHOP-MANAGEMENT-USER")));
  }, []);

  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div className="profile-info">
          <figure className="user-cover-image"></figure>
          <div className="user-info">
            <img src="/assets/img/profile-17.jpg" alt="avatar" />
            <h6 className="">{user.first_name}</h6>
            <p className="">Project Leader</p>
          </div>
        </div>
        <div className="shadow-bottom"></div>
        <ul className="list-unstyled menu-categories" id="accordionExample">
          <MenuItem title="Tableau de bord" url="/" icon={faHome} />
          <MenuItem title="Articles" expandable icon={faShoppingCart}>
            <SubMenuItem
              title="Tous les articles"
              url="/articles/tous-les-articles"
            />
            <SubMenuItem
              title="Ajouter un article"
              url="/articles/ajouter-article"
            />
          </MenuItem>
          <MenuItem title="Factures" expandable icon={faFileInvoiceDollar}>
            <SubMenuItem
              title="Toutes les factures"
              url="/factures/toutes-les-factures"
            />
            <SubMenuItem
              title="Ajouter une facture"
              url="/factures/ajouter-facture"
            />
          </MenuItem>
          <MenuItem title="Dépenses" expandable icon={faDollarSign}>
            <SubMenuItem
              title="Toutes les dépenses"
              url="/dépenses/toutes-les-dépenses"
            />
            <SubMenuItem
              title="Ajouter une dépense"
              url="/dépenses/ajouter-dépense"
            />
          </MenuItem>
          <MenuItem title="Utilisateurs" expandable icon={faUser}>
            <SubMenuItem
              title="Tous les utilisateurs"
              url="/utilisateurs/tous-les-utilisateurs"
            />
            <SubMenuItem
              title="Ajouter un utilisateur"
              url="/utilisateurs/ajouter-utilisateur"
            />
          </MenuItem>
          <MenuItem title="Boutiques" expandable icon={faStore}>
            <SubMenuItem
              title="Toutes les boutiques"
              url="/boutiques/toutes-les-boutiques"
            />
            <SubMenuItem
              title="Ajouter une boutique"
              url="/boutiques/ajouter-boutique"
            />
          </MenuItem>
          <MenuItem title="Paramètre" url="/parametre" icon={faCog} />
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
