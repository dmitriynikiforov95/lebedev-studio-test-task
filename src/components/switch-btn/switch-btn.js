import React from "react";
import Switch from "react-switch";
import "./switch-btn.css";

const SwitchBtn = ({
  isSortDogsImagesAlphabetically,
  changeDogsSortingValue,
}) => {
  let switchClazz = "react-switch";
  let textClazz = "text";

  if (isSortDogsImagesAlphabetically) {
    switchClazz += " active";
    textClazz += " active";
  }

  return (
    <label>
      <span className={textClazz}>Сортировка по алфавиту</span>
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
        className={switchClazz}
        id="material-switch"
      />
    </label>
  );
};

export default SwitchBtn;
