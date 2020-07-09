import React from "react";
import { connect } from "react-redux";
import { changeDogsSortingValue } from "../../actions";

import SwitchBtn from "../../components/switch-btn";

const SwitchBtnContainer = ({
  isSortDogsImagesAlphabetically,
  changeDogsSortingValue,
}) => (
  <SwitchBtn
    changeDogsSortingValue={changeDogsSortingValue}
    isSortDogsImagesAlphabetically={isSortDogsImagesAlphabetically}
  />
);

const mapStateToProps = ({ isSortDogsImagesAlphabetically }) => ({
  isSortDogsImagesAlphabetically,
})

const mapDispatchToProps = {
  changeDogsSortingValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchBtnContainer);
