import React, { useRef } from "react";

import BreedList from "./../breed-list/index";
import SwitchBtnContainer from "./../../containers/switch-btn-container/switch-btn-container";
import classNames from 'classnames/bind';
import s from "./breeds-selector.module.css";

const BreedsSelector = ({
  breedList,
  setIsBreedListOpenedValue,
  isBreedListOpened,
  currentBreed,
}) => {
  
  let cx = classNames.bind(s);

  const contentRef = useRef(null);

  const expansionPanelContentStyle = {
    opacity: isBreedListOpened ? "1" : "0",
    transitionProperty: "max-height, opacity",
    transitionDuration: "0.4s, 0.4s",
    transitionTimingFunction: "ease-in-out, ease-in",
    maxHeight: isBreedListOpened
      ? `${contentRef.current.scrollHeight}px`
      : "0px",
  };

  return (
    <div className={s.container}>
      <div className={s.expansionPanelWrapper}>
        <div>
          <div className={s.header}>
            <span
              className={s.desc}
              type="button"
              onClick={() =>
                setIsBreedListOpenedValue(
                  (isBreedListOpened) => !isBreedListOpened
                )
              }
            >
              Породы
              <i className={cx({
                arrow: true,
                arrowActive: isBreedListOpened
              })}></i>
            </span>
            {!currentBreed && <SwitchBtnContainer />}
          </div>
        </div>
        <div ref={contentRef} style={expansionPanelContentStyle}>
          <div className={s.listWrapper}>
            <BreedList breedList={breedList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedsSelector;
