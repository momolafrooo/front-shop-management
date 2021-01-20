import React, { useEffect } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AdminRoute from "../../routes/AdminRoute";

export function LayoutBackOffice() {
  useEffect(() => {
    const [body] = document.getElementsByTagName("body");
    const app = document.createElement("script");
    app.type = "text/javascript";
    app.src = "/assets/js/app.js";
    body.appendChild(app);

    return () => {
      app.remove();
    };
  }, []);

  return (
    <div>
      {/* <!--  BEGIN NAVBAR  --> */}
      <NavBar />
      {/* <!--  END NAVBAR  --> */}
      <div className="main-container" id="container">
        <div className="overlay"></div>
        <div className="search-overlay"></div>
        {/* <!--  BEGIN SIDEBAR  --> */}
        <SideBar />
        {/* <!--  END SIDEBAR  --> */}
        {/* <!--  BEGIN CONTENT AREA  --> */}
        <div id="content" className="main-content">
          <div className="layout-px-spacing">
            {/* <!-- CONTENT AREA --> */}
            <AdminRoute />
            {/* <!-- CONTENT AREA --> */}
          </div>
          {/* FOOTER */}
          <Footer />
          {/* END FOOTER */}
        </div>
        {/* <!--  END CONTENT AREA  --> */}
      </div>
    </div>
  );
}
