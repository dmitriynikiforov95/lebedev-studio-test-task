import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getBreedListWithCapitalLetters } from "../../helper";
import withDogApiService from "../../components/hoc";
import BreedsSelector from "./../../components/breeds-selector/index";

const BreedsSelectorContainer = ({ dogApiService }) => {
  const location = useLocation();
  const currentBreed = location.pathname.slice(1);

  const [isBreedListOpened, setIsBreedListOpenedValue] = useState(false);
  const [breedList, getBreedList] = useState([]);

  useEffect(() => {
    dogApiService.getAllBreedsList().then(({ message }) => {
      const breedList = Object.keys(message);
      getBreedList(getBreedListWithCapitalLetters(breedList));
    });
  }, []);

  return (
    <BreedsSelector
      breedList={breedList}
      setIsBreedListOpenedValue={setIsBreedListOpenedValue}
      isBreedListOpened={isBreedListOpened}
      currentBreed={currentBreed}
    />
  );
};

export default withDogApiService(BreedsSelectorContainer);

