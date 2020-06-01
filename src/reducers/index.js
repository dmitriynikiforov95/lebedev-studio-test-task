const initialState = {
  dogs: [],
  isDogsImagesLoading: false,
  isDogsImagesLoadingError: null,
  isSortDogsImagesAlphabetically: false,
};

const removeDogFromFavorites = (state, dogImageSrc) => {
  const favoriteDogs = state.dogs.filter(
    ({src}) => src !== dogImageSrc
  );

  localStorage.setItem(
    "favoriteDogs",
    JSON.stringify(favoriteDogs)
  );

  return {
    ...state,
    dogs: favoriteDogs,
  };
};

const toggleDogFavortites = (state, dogImageSrc) => {
  const {dogs} = state;
  
  const dog = dogs.find(({src}) => src === dogImageSrc);
  const dogIdx = dogs.findIndex(({src}) => src === dogImageSrc);

  let newFavoriteDog = {
    ...dog,
    isFavorite: true,
  };
  
  let favoriteDogs = localStorage.getItem("favoriteDogs")
    ? JSON.parse(localStorage.getItem("favoriteDogs"))
    : [];

  if (favoriteDogs.find(({src}) => src === dogImageSrc)) {
    newFavoriteDog.isFavorite = false;
  }

  const newDogs = [
    ...dogs.slice(0, dogIdx),
    newFavoriteDog,
    ...dogs.slice(dogIdx + 1),
  ];

  if (favoriteDogs.find(({src}) => src === dogImageSrc)) {
    favoriteDogs = favoriteDogs.filter(
      ({src}) => src !== dogImageSrc
    );
  } else {
    favoriteDogs = [newFavoriteDog, ...favoriteDogs];
  }

  localStorage.setItem(
    "favoriteDogs",
    JSON.stringify(favoriteDogs)
  );

  return {
    ...state,
    dogs: newDogs,
  };
};

const transformDogsImages = (dogsImages, currentBreed) => {
  if (currentBreed === "favorites") {
    return dogsImages;
  } else {
    
    let transformedDogsImages = dogsImages.map((src) => {
      return {
        src,
        breed: src.match(/.*\/(.*)\/(.*)$/)[1],
        isFavorite: false,
      };
    });

    if (localStorage.getItem("favoriteDogs")) {
      const favoriteDogs = JSON.parse(
        localStorage.getItem("favoriteDogs")
      );

      for (let dog of transformedDogsImages) {
        for (let {src} of favoriteDogs) {
          if (dog.src === src) {
            dog.isFavorite = true;
          }
        }
      }
    }
    return transformedDogsImages;
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DOGS_IMAGES_REQUEST":
      return {
        ...state,
        isDogsImagesLoading: true,
      };
    case "FETCH_DOGS_IMAGES_SUCCESS":
      return {
        ...state,
        dogs: transformDogsImages(action.images, action.page),
        dogsLoading: false,
      };
    case "FETCH_NEW_DOGS_IMAGES_SUCCESS":
      return {
        ...state,
        dogs: [
          ...state.dogs,
          ...transformDogsImages(action.images, action.page),
        ],
        isDogsImagesLoading: false,
      };
      case "FETCH_DOGS_IMAGES_FAILURE":
        return {
          ...state,
          isDogsImagesLoading: false,
          isDogsImagesLoadingError: action.error
        }
    case "DOG_TOGGLED_FAVORITES":
      return toggleDogFavortites(state, action.dog);
    case "DOG_REMOVED_FROM_FAVORITES":
      return removeDogFromFavorites(state, action.dog);
    case "DOGS_SORTING_VALUE_CHANGED":
      return {
        ...state,
        isSortDogsImagesAlphabetically: !state.isSortDogsImagesAlphabetically,
      };
    default:
      return state;
  }
};

export default reducer;
