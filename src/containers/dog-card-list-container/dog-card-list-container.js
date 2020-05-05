import React from "react";
import { connect } from "react-redux";
import DogCardList from "../../components/dog-card-list";

const DogCardListContainer = ({ dogsImages }) => {

  return <DogCardList dogsImages={dogsImages}/>;
};

// const mapStateToProps = ({isSortDogsImagesAlphabetically}) => {
//     return {
//         isSortDogsImagesAlphabetically
//     }
// }

export default connect(null)(DogCardListContainer);
