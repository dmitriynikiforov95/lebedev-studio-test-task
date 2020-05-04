import React from "react";
import { Link } from "react-router-dom";
import s from "./breed-list-item.module.css";

const BreedListItem = ({ breed }) => {
  const { value, isCapitalLetter } = breed;

  const link = (
    <Link className={s.link} to={`/${value}`}>
      {value}
    </Link>
  );

  const capitalLetter = <span className={s.capitalLetter}>{value}</span>;

  return <p>{isCapitalLetter ? capitalLetter : link} </p>;
};

export default BreedListItem;
