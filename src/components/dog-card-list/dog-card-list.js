import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classNames from "classnames/bind";
import DogCardItemContainer from "../../containers/dog-card-item-container";
import "./dog-card-list.css";

const DogCardList = ({ dogs, currentBreed }) => (
  <div
    className={classNames({
      centeringСontainer: true,
      favoritesPageContainer: currentBreed === "favorites",
    })}
  >
    <TransitionGroup className="container">
      {dogs.map((item) => (
        <CSSTransition key={item.src} timeout={500} classNames="item">
          <DogCardItemContainer dog={item} currentBreed={currentBreed} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

export default DogCardList;
