const initialState = {
  dogsImages: [],
  dogsImagesPerPage: 20,
  dogsImagesCurrentPage: 1,
  dogsImagesTotalPages: null,
  dogsImagesLength: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LINK_TO_HOMEPAGE_CLICKED":
      return { ...state };
    case "DOGS_IMAGES_CONFING_GETTED":
      return {
        ...state,
        dogsImagesLength: action.payload.length,
        dogsImagesTotalPages: Math.round(
          action.payload.length / state.dogsImagesPerPage
        ),
      };
    case "DOGS_IMAGES_GETTED":
      return {
        ...state,
        dogsImages: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
