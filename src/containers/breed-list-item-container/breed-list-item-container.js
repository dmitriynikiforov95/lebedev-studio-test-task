import React from "react";
import {connect} from "react-redux";
import BreedListItem from "../../components/breed-list-item";

const BreedListItemContainer = ({breed}) => {
    return <BreedListItem breed={breed}/>
}

export default connect()(BreedListItemContainer)