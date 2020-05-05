import React from "react";
import { connect } from "react-redux";
import DogCardItem from "../../components/dog-card-item";
import {addDogImageToFavorites} from "../../actions";

const DogCardItemContainer = ({ dogImage, addDogImageToFavorites}) => {
  return <DogCardItem dogImage={dogImage} addDogImageToFavorites={addDogImageToFavorites}/>;
};
const mapDispatchToProps = {
  addDogImageToFavorites
}
export default connect(null, mapDispatchToProps)(DogCardItemContainer);
