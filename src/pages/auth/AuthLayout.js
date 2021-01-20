import React, { Component } from "react";
import "./css/Auth.css";

class AuthLayout extends Component {
  render() {
    const backgroundImage = {
      backgroundImage: "url(/assets/img/background/background-auth.jpg)",
      backgroundSize: "cover",
    };

    return (
      <div>
        <div className="form-container outer" style={backgroundImage}>
          <div className="form-form">
            <div className="form-form-wrap">
              <div className="form-container">
                <div className="form-content">
                  {/* FORM */}
                  {this.props.children}
                  {/* END FORM */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
