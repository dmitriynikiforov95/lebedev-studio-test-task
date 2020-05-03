const initialState = {
  test: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LINK_TO_HOMEPAGE_CLICKED":
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
