import React from "react";
import { connect } from "react-redux";


import BreedList from "../../components/breed-list";

const BreedListContainer = ({ breedList }) => {
  return (
    <BreedList breedList={breedList}/>
  );
};

const mapStateToProps = ({ breedList }) => {
  return {
    breedList,
  };
};

export default connect(mapStateToProps)(BreedListContainer);
