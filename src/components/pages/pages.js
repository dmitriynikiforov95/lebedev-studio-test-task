import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePageContainer from "../../containers/pages-container/home-page-container";
import SelectedBreedPageContainer from "../../containers/pages-container/selected-breed-page-container";
import FavoriteDogsPageContainer from "../../containers/pages-container/favorite-dogs-page-container";

const Pages = ({selectedBreed}) => {
  return (
    <Switch>
      <Route path="/" exact component={HomePageContainer} />
      <Route path={`/${selectedBreed}`} exact component={SelectedBreedPageContainer} />
      <Route path={`/favorites`}  component={FavoriteDogsPageContainer} />
    </Switch>
  );
};

export default Pages;
