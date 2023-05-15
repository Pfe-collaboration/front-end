import React from "react";

//import Home from "../../img/home.png";
//import Noti from "../../img/noti.png";
import Comment from "../../images/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        home
      </Link>
      <UilSetting />
      noti
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
