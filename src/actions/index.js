const dogsImagesRequest = () => ({
  type: "FETCH_DOGS_IMAGES_REQUEST",
});

const dogsImagesError = (error) => ({
  type: "FETCH_DOGS_IMAGES_FAILURE",
  error,
});

const loadDogsImages = (images, page) => ({
  type: "FETCH_DOGS_IMAGES_SUCCESS",
  images,
  page,
});

const toggleDogFavorites = (dogImageSrc) => ({
  type: "DOG_TOGGLED_FAVORITES",
  dog: dogImageSrc,
});

const changeDogsSortingValue = () => ({
  type: "DOGS_SORTING_VALUE_CHANGED",
});

const removeDogFromFavorites = (dogImageSrc) => ({
  type: "DOG_REMOVED_FROM_FAVORITES",
  dog: dogImageSrc,
});

export {
  dogsImagesRequest,
  dogsImagesError,
  loadDogsImages,
  toggleDogFavorites,
  removeDogFromFavorites,
  changeDogsSortingValue,
};
