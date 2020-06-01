import React from "react";

import s from "./breed-list.module.css"
import BreedListItem from './../breed-list-item/breed-list-item';
const BreedList = ({ breedList }) => {
  return (
    <ul className={s.list}>
      {breedList.map((item, idx) => {
        return (
          <li key={idx}>
            <BreedListItem breed={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default BreedList;
