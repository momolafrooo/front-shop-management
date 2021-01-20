import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SubMenuItem(props) {
  const selectedSubMenu = useSelector((state) => state.selectedSubMenu);

  function isSubMenuActive(sub_menu) {
    return selectedSubMenu === sub_menu ? "active" : "";
  }

  return (
    <li className={isSubMenuActive(props.title)}>
      <Link to={props.url}>{props.title}</Link>
    </li>
  );
}

export default SubMenuItem;
