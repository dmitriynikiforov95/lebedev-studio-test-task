import React from "react";

import BreedList from './../breed-list/index';
import SwitchBtnContainer from './../../containers/switch-btn-container/switch-btn-container';

const BreedsSelector = ({breedList, setIsBreedListOpenedValue, isBreedListOpened, currentBreed}) => {
    return (
      <div>
        <button type="button" onClick={() => setIsBreedListOpenedValue(isBreedListOpened => !isBreedListOpened)}>
          Породы
        </button>
        
        {isBreedListOpened && <BreedList breedList={breedList} />}
        {!currentBreed && <SwitchBtnContainer />}
      </div>
    );
}

export default BreedsSelector;