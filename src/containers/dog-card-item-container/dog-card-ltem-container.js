import React from "react";
import { connect } from "react-redux";
import DogCardItem from "../../components/dog-card-item";

const DogCardItemContainer = ({ dogImage }) => {
  return <DogCardItem dogImage={dogImage}/>;
};

export default connect(null)(DogCardItemContainer);
