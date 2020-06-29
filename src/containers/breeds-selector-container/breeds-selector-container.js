import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { dogsImagesError } from "../../actions";

import { getBreedListWithCapitalLetters } from "../../helper";
import withDogApiService from "../../components/hoc";
import BreedsSelector from "./../../components/breeds-selector/index";

const BreedsSelectorContainer = ({ breed, dogApiService, dogsImagesError }) => {
  const [isBreedListOpened, setIsBreedListOpenedValue] = useState(false);
  const [breedList, getBreedList] = useState([]);

  useEffect(() => {
    dogApiService
      .getAllBreedsList()
      .then(({ message }) => {
        const breedList = Object.keys(message);
        getBreedList(getBreedListWithCapitalLetters(breedList));
      })
      .catch((error) => {
        dogsImagesError(error.message);
      });
  }, [dogApiService, dogsImagesError]);

  return (
    <BreedsSelector
      breedList={breedList}
      setIsBreedListOpenedValue={setIsBreedListOpenedValue}
      isBreedListOpened={isBreedListOpened}
      currentBreed={breed}
    />
  );
};

const mapDispatchToProps = {
  dogsImagesError,
};

export default withDogApiService(
  connect(null, mapDispatchToProps)(BreedsSelectorContainer)
);
