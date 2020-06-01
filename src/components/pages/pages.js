import React from "react";
import { Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from './home-page/index';
import FavoriteDogsPage from './favorite-dogs-page/favorite-dogs-page';
import SelectedBreedPage from './selected-breed-page/selected-breed-page';

const Pages = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path={`/favorites`} component={FavoriteDogsPage} />
      <Route path={`/${path}`} component={SelectedBreedPage} />
    </Switch>
  );
};

export default Pages;
