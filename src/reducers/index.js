const initialState = {
  dogsImages: [],
  dogsImagesPerPage: 20,
  dogsImagesCurrentPage: 1,
  dogsImagesTotalPages: null,
  dogsImagesTotalLength: null,
  breedList: [],
  selectedBreed: null,
  favoriteDogsImages: [],
  isSortDogsImagesAlphabetically: false,
};

const transformDogsImages = (dogsImages) => {
  let newDogsImages = dogsImages.map((item) => {
    return {
      src: item,
      isFavorite: false,
    };
  });
  // Проверка в LocalStorage на присутствие изображения
  if (localStorage.hasOwnProperty("favoriteDogsImages")) {
    let favoriteDogsImages = JSON.parse(
      localStorage.getItem("favoriteDogsImages")
    );

    for (let dogImage of newDogsImages) {
      for (let dogImageInLocalStorage of favoriteDogsImages) {
        if (dogImage.src === dogImageInLocalStorage.src) {
          dogImage.isFavorite = dogImageInLocalStorage.isFavorite;
        }
      }
    }
  }
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

const addDogImageToFavorite = (state, dogImage) => {
  const idx = state.dogsImages.findIndex((item) => item.src === dogImage.src);

  const isCardFavorite = state.dogsImages.findIndex(
    (item) => item.src === dogImage.src && item.isFavorite === true
  );
  let newDogImage;

  newDogImage = !(isCardFavorite > -1)
    ? {
        ...dogImage,
        isFavorite: true,
      }
    : {
        ...dogImage,
        isFavorite: false,
      };
  const newDogsImages = [
    ...state.dogsImages.slice(0, idx),
    newDogImage,
    ...state.dogsImages.slice(idx + 1),
  ];

  return newDogsImages;
};

const addDogImageToLocalStorage = (state, card) => {
  let newFavoriteDogsImages = [...state.favoriteDogsImages];
  if (localStorage.hasOwnProperty("favoriteDogsImages")) {
    let favoriteDogsImages = JSON.parse(
      localStorage.getItem("favoriteDogsImages")
    );

    // Проверим ЛС на присутствие карты
    const hasInLC = favoriteDogsImages.findIndex(
      (item) => item.src === card.src
    );

    // Проверим стор
    const hasInStore = state.favoriteDogsImages.findIndex(
      (item) => item.src === card.src
    );

    if (hasInLC !== -1) {
      favoriteDogsImages = [
        ...favoriteDogsImages.slice(0, hasInLC),
        ...favoriteDogsImages.slice(hasInLC + 1),
      ];
    } else {
      favoriteDogsImages.push(card);
    }

    if (hasInStore !== -1) {
      newFavoriteDogsImages = [
        ...newFavoriteDogsImages.slice(0, hasInStore),
        ...newFavoriteDogsImages.slice(hasInStore + 1),
      ];
    } else {
      newFavoriteDogsImages.push(card);
    }
    localStorage.setItem(
      "favoriteDogsImages",
      JSON.stringify(favoriteDogsImages)
    );
    return newFavoriteDogsImages;
  } else {
    let favoriteDogsImages = [card];
    localStorage.setItem(
      "favoriteDogsImages",
      JSON.stringify(favoriteDogsImages)
    );
    newFavoriteDogsImages.push(card);
    return newFavoriteDogsImages;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "DOG_IMAGE_ADDED_TO_FAVORITES":
      return {
        ...state,
        dogsImages: addDogImageToFavorite(state, action.payload),
        favoriteDogsImages: addDogImageToLocalStorage(state, action.payload),
      };
    case "DOGS_IMAGES_FROM_LS_GETTED":
      return {
        ...state,
        favoriteDogsImages: action.payload,
      };
    case "NEW_DOGS_IMAGES_FROM_LS_GETTED":
      return {
        ...state,
        favoriteDogsImages: [...state.favoriteDogsImages, ...action.payload],
      };
    case "DOGS_IMAGES_VALUE_CHANGED":
      return {
        ...state,
        isSortDogsImagesAlphabetically: !state.isSortDogsImagesAlphabetically,
      };
      case "LINK_TO_HOMEPAGE_CLICKED":
        return {
          ...state,
          selectedBreed: null,
          dogsImagesCurrentPage: 1,
          dogsImagesTotalPages: null,
          dogsImagesTotalLength: null,
        };
        case "LINK_TO_FAVORITE_DOGS_PAGE_CLICKED": 
        return {
          ...state,
          selectedBreed: null,
          dogsImagesCurrentPage: 1,
          dogsImagesTotalPages: null,
          dogsImagesTotalLength: null,
        };
    default:
      return state;
  }
};

export default reducer;
