
const dogsImagesRequest = () => {
  return {
    type: "FETCH_DOGS_IMAGES_REQUEST",
  };
};
const dogsImagesError = (error) => {
  return {
    type: "FETCH_DOGS_IMAGES_FAILURE",
    error,
  };
};

const loadDogsImages = (images, page) => {
  return {
    type: "FETCH_DOGS_IMAGES_SUCCESS",
    images,
    page,
  };
};

const loadNewDogsImages = (images) => {
  return {
    type: "GET_NEW_DOGS_IMAGES",
    images,
  };
};

const toggleDogFavorites = (dogImageSrc) => {
  return {
    type: "DOG_TOGGLED_FAVORITES",
    dog: dogImageSrc,
  };
};

const changeDogsSortingValue = () => {
  return {
    type: "DOGS_SORTING_VALUE_CHANGED",
  };
};

const removeDogFromFavorites = (dogImageSrc) => {
  return {
    type: "DOG_REMOVED_FROM_FAVORITES",
    dog: dogImageSrc,
  };
};

export {
  dogsImagesRequest,
  dogsImagesError,
  loadDogsImages,
  loadNewDogsImages,
  toggleDogFavorites,
  removeDogFromFavorites,
  changeDogsSortingValue,
};
