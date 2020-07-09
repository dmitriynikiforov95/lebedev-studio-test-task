import React from "react";
import s from "./breed-list.module.css";
import BreedListItem from "./../breed-list-item/breed-list-item";

const BreedList = ({ breedList }) => (
  <div className={s.list}>
    {breedList.map(({ breeds, breedNameFirstLetter }, idx) => (
      <span key={idx}>
        {breeds.map((breed, idx) => {
          if (idx === 0) {
            return (
              <span className={s.nowrap}>
                <span className={s.capitalLetter}>
                  {breedNameFirstLetter.toUpperCase()}
                </span>
                <BreedListItem breed={breed} />
              </span>
            );
          }
          return <BreedListItem breed={breed} />;
        })}
      </span>
    ))}
  </div>
);

export default BreedList;
