import React from "react";
import Switch from "react-switch";
import classNames from 'classnames/bind';
import "./switch-btn.css";

const SwitchBtn = ({
  isSortDogsImagesAlphabetically,
  changeDogsSortingValue,
}) => {

  return (
    <div className="switch-btn-wrapper"> 
      <span className={classNames({
        text: true,
        active: isSortDogsImagesAlphabetically
      })}>Сортировка по алфавиту</span>
      <Switch
        checked={isSortDogsImagesAlphabetically}
        onChange={changeDogsSortingValue}
        offColor="#626262"
        offHandleColor="#626262"
        onColor="#111013"
        onHandleColor="#3C59F0"
        handleDiameter={9.67}
        uncheckedIcon={false}
        checkedIcon={false}
        height={14.5}
        width={29}
        className={classNames({
         "react-switch": true,
         active: isSortDogsImagesAlphabetically
        })}
        id="material-switch"
      />
    </div>
  );
};

export default SwitchBtn;
