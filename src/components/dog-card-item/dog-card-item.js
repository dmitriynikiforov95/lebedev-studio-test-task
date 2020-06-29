import React from "react";
import s from "./doc-card-item.module.css";
import active from "./active.png";
import inactive from "./inactive.png";

const DogCardItem = ({ dog, toggleDogFavorites, currentBreed, removeDogFromFavorites }) => {
  const { src, isFavorite, breed } = dog;

  return (
    <div className={s.container}>
      <img className={s.dogImg} src={`${src}`} alt="dog" width="367" height="290"/>
      <img
        className={s.favoriteIcon}
        src={isFavorite ? active : inactive}
        alt="favortie icon"
        onClick={currentBreed === "favorites" ? () => removeDogFromFavorites(src) : () => toggleDogFavorites(src)}
      />
        <b className={s.breedName}>{breed}</b>
    </div>
  );
};

export default DogCardItem;
