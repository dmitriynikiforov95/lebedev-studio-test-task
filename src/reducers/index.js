const EQUALITY = "equality";

const searchDogBySrc = (dogImgSrc, condition) => ({ src }) =>
  (condition === "equality") ? src === dogImgSrc : src !== dogImgSrc;

const toggleDogFavorites = (state, dogImgSrc) => {
  const { dogs, favoriteDogs } = state;

  const dog = dogs.find(searchDogBySrc(dogImgSrc, EQUALITY));
  const dogIdx = dogs.findIndex(searchDogBySrc(dogImgSrc, EQUALITY));

  const toggledDog = Object.assign({}, dog);

  let newFavoriteDogs;

  if (favoriteDogs.find(searchDogBySrc(dogImgSrc, EQUALITY))) {
    newFavoriteDogs = favoriteDogs.filter(searchDogBySrc(dogImgSrc));
    toggledDog.isFavorite = false;
  } else {
    newFavoriteDogs = [toggledDog, ...favoriteDogs];
    toggledDog.isFavorite = true;
  }

  return {
    ...state,
    dogs: [...dogs.slice(0, dogIdx), toggledDog, ...dogs.slice(dogIdx + 1)],
    favoriteDogs: newFavoriteDogs,
  }

};


const transformDogsImages = (favoriteDogs, dogsImages) =>
  dogsImages.map((dogImgSrc) => {
    const isFavorite = favoriteDogs.find(searchDogBySrc(dogImgSrc, EQUALITY))
      ? true
      : false;

    return {
      isFavorite,
      src: dogImgSrc,
      breed: dogImgSrc.match(/.*\/(.*)\/(.*)$/)[1],
    };
  });


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DOGS_IMAGES_REQUEST":
      return {
        ...state,
        isDogsImagesLoading: true,
      };
    case "FETCH_DOGS_IMAGES_SUCCESS":
      return {
        ...state,
        dogs: transformDogsImages(state.favoriteDogs, action.images),
        isDogsImagesLoading: false,
      };
    case "FETCH_DOGS_IMAGES_FAILURE":
      return {
        ...state,
        isDogsImagesLoading: false,
        isDogsImagesLoadingError: action.error,
      };
    case "GET_NEW_DOGS_IMAGES":
      return {
        ...state,
        dogs: [
          ...state.dogs,
          ...transformDogsImages(state.favoriteDogs, action.images),
        ],
        isDogsImagesLoading: false,
      };
    case "DOG_TOGGLED_FAVORITES":
      return toggleDogFavorites(state, action.dog);
    case "DOG_REMOVED_FROM_FAVORITES":
      return {
        ...state,
        favoriteDogs: state.favoriteDogs.filter(searchDogBySrc(action.dog)),
      };
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
