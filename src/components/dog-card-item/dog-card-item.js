import React from "react";
import s from "./doc-card-item.module.css";
import active from "./active.png";
import inactive from "./inactive.png";

const DogCardItem = ({ dogImage }) => {
  const { src, isFavorite} = dogImage;

  return (
    <div className={s.container}>
      <img className={s.dogImg} src={`${src}`} alt="dog image" />
      <img className={s.favoriteIcon} src={isFavorite ? active : inactive } alt="favortie icon"/>
    </div>
  );
};

export default DogCardItem;
