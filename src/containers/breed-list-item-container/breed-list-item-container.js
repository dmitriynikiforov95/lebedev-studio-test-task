import React from "react";
import {connect} from "react-redux";
import BreedListItem from "../../components/breed-list-item";
import {selectBreed} from "../../actions";

const BreedListItemContainer = ({breed, selectBreed}) => {
    return <BreedListItem breed={breed} selectBreed={selectBreed}/>
}

const mapDispatchToProps = {
    selectBreed
}


export default connect(null, mapDispatchToProps)(BreedListItemContainer)