import React from "react";
import DogCardItemContainer from "../../containers/dog-card-item-container";

const DogCardList = ({dogsImages}) => {
  const dogCards = dogsImages.map((item, idx) => {
    return <DogCardItemContainer dogImage={item} key={idx} />;
  });
  return <div>{dogCards}</div>;
};

export default DogCardList;
