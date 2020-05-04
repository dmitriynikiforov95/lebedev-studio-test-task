import React from "react";

const DogCardItem = ({ dogImage }) => {
  const { src } = dogImage;

  return (
    <div>
      <img src={`${src}`} alt="Изображение собаки" />
    </div>
  );
};

export default DogCardItem;
