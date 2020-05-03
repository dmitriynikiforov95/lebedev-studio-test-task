import React from "react";
import "./app.css";
import AppHeaderContainer from "../../containers/app-header-container";
import PagesContainer from "../../containers/pages-container/pages-container";

const App = () => {
  return (
    <div>
      <AppHeaderContainer />
      <PagesContainer />
    </div>
  );
};

export default App;
