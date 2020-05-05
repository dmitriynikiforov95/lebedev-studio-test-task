import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePageContainer from "../../containers/pages-container/home-page-container";
import SelectedBreedPageContainer from "../../containers/pages-container/selected-breed-page-container";

const Pages = ({selectedBreed}) => {
  return (
    <Switch>
      <Route path="/" exact component={HomePageContainer} />
      <Route path={`/${selectedBreed}`} exact component={SelectedBreedPageContainer} />
    </Switch>
  );
};

export default Pages;
