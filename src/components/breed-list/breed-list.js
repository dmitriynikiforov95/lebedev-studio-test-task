import React from "react";
import BreedListItemContainer from "../../containers/breed-list-item-container";
import s from "./breed-list.module.css"
const BreedList = ({ breedList, selectBreed }) => {
  return (
    <ul className={s.list}>
      {breedList.map((item, idx) => {
        return (
          <li key={idx}>
            <BreedListItemContainer breed={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default BreedList;
