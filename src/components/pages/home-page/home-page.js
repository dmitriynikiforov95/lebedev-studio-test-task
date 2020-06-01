import React from "react";
import BreedsSelectorContainer from "../../../containers/breeds-selector-container";
import DogCardListContainer from './../../../containers/dog-card-list-container/index';

const HomePage = () => {
  return (
    <div>
      <BreedsSelectorContainer />
      <DogCardListContainer />
    </div>
  );
};

export default HomePage;
