import {
  createStore
} from "redux";
import reducer from "./reducers";
import throttle from 'lodash.throttle';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('favoriteDogs');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favoriteDogs', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();

const initialState = {
  dogs: [],
  favoriteDogs: persistedState,
  isDogsImagesLoading: false,
  isDogsImagesLoadingError: null,
  isSortDogsImagesAlphabetically: false,
};

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(throttle(() => {
  saveState(store.getState().favoriteDogs);
}, 1000))

export default store;