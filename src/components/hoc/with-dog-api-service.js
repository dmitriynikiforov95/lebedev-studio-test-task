import React from "react";
import { DogApiConsumer } from "../dog-api-context";

const withDogApiService = (Wrapped) => {
  return (props) => {
    return (
      <DogApiConsumer>
        {(dogApiService) => {
          return <Wrapped {...props} dogApiService={dogApiService} />;
        }}
      </DogApiConsumer>
    );
  };
};

export default withDogApiService;
