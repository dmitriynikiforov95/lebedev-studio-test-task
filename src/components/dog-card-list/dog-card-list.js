import React from "react";
import DogCardItemContainer from "../../containers/dog-card-item-container";

const DogCardList = ({ dogs, currentBreed }) => {
  return (
    <div>
      {dogs.map((item, idx) => (
        <DogCardItemContainer
          dog={item}
          key={idx}
          currentBreed={currentBreed}
        />
      ))}
    </div>
  );
};

export default DogCardList;
