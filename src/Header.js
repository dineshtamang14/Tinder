import React from 'react';
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import { Link } from 'react-router-dom';


function Header() {
  return (<div className="header">
    <Link to="/post">
      <IconButton>
          <PersonIcon fontSize="large" className="header__icon" />
      </IconButton>
      </Link>

      <Link to="/">
      <img 
        className="header__logo"
        src="https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png"
        alt="inder logo"
      />
      </Link>
      
      <IconButton>
        <ForumIcon fontSize="large" className="header__icon" />
      </IconButton> 
  </div>);
}

export default Header;
