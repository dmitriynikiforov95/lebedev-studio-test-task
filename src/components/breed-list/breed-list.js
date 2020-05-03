import React from "react";

const BreedList = ({ breedList }) => {
    return (
      <ul>
        {breedList.map((item, idx) => {
          return <li key={idx}>{item.value}</li>;
        })}
      </ul>
    );
  };


  export default BreedList;