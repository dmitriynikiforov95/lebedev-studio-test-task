import React from "react";
import s from "./breed-list.module.css"
import BreedListItem from './../breed-list-item/breed-list-item';

const BreedList = ({ breedList }) => {

  return (
    <div className={s.list}>
      {breedList.map(({ breeds, letter }, idx) => {
        return (
          <span key={idx}>
            {breeds.map((breed, idx) => {
              if (idx === 0) {
                return (
                  <span className={s.nowrap}>
                    <span className={s.capitalLetter}>{letter.toUpperCase()}</span>
                    <BreedListItem breed={breed} />
                  </span>)
              }
              return <BreedListItem breed={breed} />
            })}
          </span>
        )
      })}
    </div>
  )
}

export default BreedList;
