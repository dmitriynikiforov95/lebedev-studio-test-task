import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from './home-page/index';
import FavoriteDogsPage from './favorite-dogs-page/favorite-dogs-page';
import SelectedBreedPage from './selected-breed-page/selected-breed-page';

const Pages = () => {

const breed = useLocation().pathname.split("/")[2];

  return (
    <Switch>
      <Route path={"/lebedev-studio"} exact component={HomePage} />
      <Route path={`/lebedev-studio/favorites`} exact component={FavoriteDogsPage} />
      <Route path={`/lebedev-studio/${breed}`} component={SelectedBreedPage} />
    </Switch>
  );
};

export default Pages;
