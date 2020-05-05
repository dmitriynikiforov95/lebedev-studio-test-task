import React from "react";
import {connect} from "react-redux";
import {changeDogsImagesSortValue} from "../../actions";

import SwitchBtn from "../../components/switch-btn";

const SwitchBtnContainer = ({isSortDogsImagesAlphabetically, changeDogsImagesSortValue}) => {
  return <SwitchBtn 
  changeDogsImagesSortValue={changeDogsImagesSortValue}
  isSortDogsImagesAlphabetically={isSortDogsImagesAlphabetically} 
  />
}

const mapStateToProps = ({ isSortDogsImagesAlphabetically }) => {
    return {
      isSortDogsImagesAlphabetically,
    };
  };
  
  const mapDispatchToProps = {
    changeDogsImagesSortValue,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SwitchBtnContainer)