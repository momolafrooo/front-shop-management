import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MenuItem(props) {
  const selectedMenu = useSelector((state) => state.selectedMenu);
  const expanded_area = useSelector((state) => state.expandedArea);

  function isMenuActive(menu) {
    return selectedMenu === menu ? "active" : "";
  }

  function isOpened(menu) {
    return selectedMenu === menu ? "show" : "";
  }

  function isExpendable() {
    return props.expandable ? "#" + props.title.split(" ").join("") : props.url;
  }

  function areaExpended() {
    return expanded_area === props.title;
  }

  return (
    <li className={`menu ${isMenuActive(props.title)}`}>
      {props.expandable ? (
        <a
          href={isExpendable()}
          data-toggle="collapse"
          aria-expanded={areaExpended()}
          className="dropdown-toggle"
        >
          <div className="">
            <FontAwesomeIcon icon={props.icon} />
            <span> {props.title}</span>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </a>
      ) : (
        <Link
          to={isExpendable()}
          aria-expanded="false"
          className="dropdown-toggle"
        >
          <div className="">
            <FontAwesomeIcon icon={props.icon} />
            <span> {props.title}</span>
          </div>
        </Link>
      )}
      <ul
        className={`collapse submenu list-unstyled ${isOpened(props.title)}`}
        id={props.title.split(" ").join("")}
        data-parent="#accordionExample"
      >
        {props.children}
      </ul>
    </li>
  );
}

export default MenuItem;
