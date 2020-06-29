import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import App from "./components/app";
import ErrorBoundary from "./components/error-boundary";
import { DogApiProvider } from "./components/dog-api-context";

import DogApiService from "./services/dog-api-service";

const dogApiService = new DogApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <DogApiProvider value={dogApiService}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DogApiProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);


