import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import { DogApiProvider } from "./components/dog-api-context";

import DogApiService from "./services/dog-api-service";

const dogApiService = new DogApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <DogApiProvider value={dogApiService}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DogApiProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);


