import React from "react";
import { Link } from "react-router-dom";

import s from "./app-header.module.css";
import appLogo from "./app-logo.png";
import favoritesIcon from "./favorites-icon.png";

const AppHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
      <Link to="/lebedev-studio">
          <img src={appLogo} alt="app-logo" />
        </Link>
        <div>
          <span className={s.favoriteDogsLinkText}>Избранные пёсели</span>
          <Link to="/lebedev-studio/favorites">
            <img className={s.favoritesIcon} src={favoritesIcon} alt="favorites-icon" width="16" height="14"/>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
