const initialState = {
  dogsImages: [],
  dogsImagesPerPage: 20,
  dogsImagesCurrentPage: 1,
  dogsImagesTotalPages: null,
  dogsImagesTotalLength: null,
  breedList: [],
  selectedBreed:null,
};

const transformDogsImages = (dogsImages) => {
  // check in LS
  let newDogsImages = dogsImages.map((item) => {
    return {
      src: item,
      isFavorite: false,
    };
  });

  return newDogsImages;
};

const getBreedListWithCapitalLetters = (breedList) => {
  let capitalLetter = "";
  let breedListWithCapitalLetters = breedList.slice();

  breedListWithCapitalLetters = breedListWithCapitalLetters.map((item) => {
    return {
      value: item,
      isCapitalLetter: false,
    };
  });

  for (let i = 0; i < breedListWithCapitalLetters.length; i++) {
    let letter = {
      value: breedListWithCapitalLetters[i].value[0].toUpperCase(),
      isCapitalLetter: true,
    };
    if (letter.value !== capitalLetter) {
      capitalLetter = letter.value;
      breedListWithCapitalLetters.splice(i, 0, letter);
    }
  }
  capitalLetter = "";

  return breedListWithCapitalLetters;
};

const changeCurrentPage = (state) => {
  if (state.dogsImagesCurrentPage === state.dogsImagesTotalPages)
    return state.dogsImagesCurrentPage;
  return state.dogsImagesCurrentPage + 1;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LINK_TO_HOMEPAGE_CLICKED":
      return {
        ...state,
        selectedBreed: null,
        dogsImagesCurrentPage: 1,
        dogsImagesTotalPages: null,
        dogsImagesTotalLength: null,
      };
    case "DOGS_IMAGES_CONFING_GETTED":
      return {
        ...state,
        dogsImagesTotalLength: action.payload.length,
        dogsImagesTotalPages: Math.round(
          action.payload.length / state.dogsImagesPerPage
        ),
      };
    case "DOGS_IMAGES_GETTED":
      return {
        ...state,
        dogsImages: transformDogsImages(action.payload),
      };
    case "NEW_DOGS_IMAGES_GETTED":
      return {
        ...state,
        dogsImages: [
          ...state.dogsImages,
          ...transformDogsImages(action.payload),
        ],
      };
    case "BREED_LIST_GETTED":
      return {
        ...state,
        breedList: getBreedListWithCapitalLetters(action.payload),
      };
    case "CHANGE_DOGS_IMAGES_CURRENT_PAGE":
      return {
        ...state,
        dogsImagesCurrentPage: changeCurrentPage(state, action.payload),
      };
    case "BREED_SELECTED":
      return {
        ...state,
        selectedBreed: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
