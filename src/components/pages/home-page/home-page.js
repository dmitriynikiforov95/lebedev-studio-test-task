import React from "react";
import BreedsSelectorContainer from "../../../containers/breeds-selector-container";
import DogCardListContainer from './../../../containers/dog-card-list-container/index';

const HomePage = (props) => {
  const breed = props.location.pathname.split("/")[2];
  
    return (
    <>
      <BreedsSelectorContainer breed={breed} />
      <DogCardListContainer breed={breed} />
    </>
  );
};

export default HomePage;
