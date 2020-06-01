import React from "react";
import { Link } from "react-router-dom";

import s from "./app-header.module.css";
import appLogo from "./app-logo.png";
import favoritesIcon from "./favorites-icon.png";

const AppHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
      <Link to="/">
          <img src={appLogo} alt="app-logo" />
        </Link>
        <div>
          <span className={s.favoriteDogsLinkText}>Избранные песели</span>
          <Link to="/favorites">
            <img src={favoritesIcon} alt="favorites-icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
