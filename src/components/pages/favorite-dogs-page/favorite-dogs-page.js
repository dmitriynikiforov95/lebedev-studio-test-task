import React from "react";
import DogCardListContainer from './../../../containers/dog-card-list-container/index';

const FavoriteDogsPage = (props) => {
    const breed = props.location.pathname.split("/")[2];
    
    return (
        <DogCardListContainer breed={breed}/>
    )
}

export default FavoriteDogsPage;