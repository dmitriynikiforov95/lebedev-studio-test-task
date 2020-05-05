import React from "react";
import { Link } from "react-router-dom";
import s from "./breed-list-item.module.css";

const BreedListItem = ({ breed, selectBreed }) => {
  const { value, isCapitalLetter } = breed;

  const link = (
    <Link
      onClick={() => selectBreed(value)}
      className={s.link}
      to={`/${value}`}
    >
      {value}
    </Link>
  );

  const capitalLetter = <span className={s.capitalLetter}>{value}</span>;

  return <p>{isCapitalLetter ? capitalLetter : link} </p>;
};

export default BreedListItem;
