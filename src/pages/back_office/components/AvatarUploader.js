import { Avatar } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

function AvatarUploader({ defaultImage, onUploadComplete }) {
  const [avatarImage, setAvatarImage] = useState("");
  const uploadAvatarImage = useRef();

  const [avatarStyle, setAvatarStyle] = useState({
    width: "130px",
    height: "130px",
    boxShadow: "0px 0px 15px #888888",
  });

  function handleMouseOver() {
    setAvatarStyle({
      boxShadow: "0px 0px 15px #888888",
      width: "140px",
      height: "140px",
      cursor: "pointer",
      transition: ".3s ease",
    });
  }

  function handleMouseOut() {
    setAvatarStyle({
      boxShadow: "0px 0px 15px #888888",
      width: "130px",
      height: "130px",
      transition: ".3s ease",
    });
  }

  function handleClick(e) {
    e.preventDefault();
    uploadAvatarImage.current.click();
  }

  function handleChange(e) {
    e.preventDefault();
    setAvatarImage(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
    onUploadComplete(e.target.files[0]);
  }

  useEffect(
    function () {
      setAvatarImage(defaultImage);
    },
    [defaultImage]
  );

  return (
    <div>
      <Avatar
        style={avatarStyle}
        alt="Photo de profil"
        src={avatarImage}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      />
      <input
        type="file"
        ref={uploadAvatarImage}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default AvatarUploader;
