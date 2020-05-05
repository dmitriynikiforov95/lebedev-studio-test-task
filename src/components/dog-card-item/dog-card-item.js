import React from "react";
import s from "./doc-card-item.module.css";
import active from "./active.png";
import inactive from "./inactive.png";

const DogCardItem = ({ dogImage, addDogImageToFavorites }) => {
  const { src, isFavorite } = dogImage;

  const addToFavorites = (url) => {
    let dogImage = {
      src: url,
      isFavorite: true,
    };
    addDogImageToFavorites(dogImage);
  };
  let breedName = src.match(/.*\/(.*)\/(.*)$/)[1];

  return (
    <div className={s.container}>
      <img className={s.dogImg} src={`${src}`} alt="dog" />
      <img
        className={s.favoriteIcon}
        src={isFavorite ? active : inactive}
        alt="favortie icon"
        onClick={() => addToFavorites(src)}
      />
        <b className={s.breedName}>{breedName}</b>
    </div>
  );
};

export default DogCardItem;
