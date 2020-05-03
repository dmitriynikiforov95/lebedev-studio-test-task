import React from "react";
import { dogApiConsumer } from "../dog-api-context";

const withDogApiSerivce = (Wrapped) => {
  return (props) => {
    return (
      <dogApiConsumer>
        {(dogApiService) => {
          return <Wrapped {...props} dogApiService={dogApiService} />;
        }}
      </dogApiConsumer>
    );
  };
};

export default withDogApiSerivce;
