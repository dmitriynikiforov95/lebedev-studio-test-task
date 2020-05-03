import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePageContainer from "../../containers/pages-container/home-page-container";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePageContainer} />
    </Switch>
  );
};

export default Pages;
