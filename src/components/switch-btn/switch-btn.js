import React from "react";
import Switch from "react-switch";
import "./switch-btn.css";

const SwitchBtn = ({ isSortDogsImagesAlphabetically,
  changeDogsImagesSortValue}) => {

    let clazz = "react-switch";
    return (
      <label>
        <span
          className={isSortDogsImagesAlphabetically ? "text-active" : "text"}
        >
          Сортировка по алфавиту
        </span>
        <Switch
          checked={isSortDogsImagesAlphabetically}
          onChange={changeDogsImagesSortValue}
          offColor="#626262"
          offHandleColor="#626262"
          onColor="#111013"
          onHandleColor="#3C59F0"
          handleDiameter={9.67}
          uncheckedIcon={false}
          checkedIcon={false}
          height={14.5}
          width={29}
          className={
            isSortDogsImagesAlphabetically ? `${clazz} active` : clazz
          }
          id="material-switch"
        />
      </label>
    );
  
}

export default SwitchBtn;
