import React from "react";
import { connect } from "react-redux";
import DogCardItem from "../../components/dog-card-item";
import {toggleDogFavorites, removeDogFromFavorites} from "../../actions";

const DogCardItemContainer = (props) => {
  return <DogCardItem {...props}/>;
};
const mapDispatchToProps = {
  toggleDogFavorites,
  removeDogFromFavorites,
}

export default connect(null, mapDispatchToProps)(DogCardItemContainer);
