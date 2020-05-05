const toHomePage = () => {
  return {
    type: "LINK_TO_HOMEPAGE_CLICKED"
  }
}
const getDogsImagesConfig = (img) => {
  return {
    type: "DOGS_IMAGES_CONFING_GETTED",
    payload: img
  }
}

const getDogsImages = (img) => {
  return {
      type: "DOGS_IMAGES_GETTED",
      payload: img
  }
}
const getNewDogsImages = (img) => {
  return {
      type: "NEW_DOGS_IMAGES_GETTED",
      payload: img
  }
}


const getBreedList = (breedList) => {
  return {
    type: "BREED_LIST_GETTED",
    payload: breedList
  };
};
const changeDogsImagesCurrentPage = () => {
  return {
      type: "CHANGE_DOGS_IMAGES_CURRENT_PAGE"
  }
}

const selectBreed = (breed) => {
  return {
    type: "BREED_SELECTED",
    payload:breed
  }
}

// add dog images to ls logic

const addDogImageToFavorites = (dogImage) => {
  return {
    type:"DOG_IMAGE_ADDED_TO_FAVORITES",
    payload:dogImage,
  }
}
const getDogsImagesFromLS = (img) => {
  return {
      type: "DOGS_IMAGES_FROM_LS_GETTED",
      payload: img
  }
}

const getNewDogsImagesFromLS = (img) => {
  return {
      type: "NEW_DOGS_IMAGES_FROM_LS_GETTED",
      payload: img
  }
}

const fetchBreedList = (dispatch, dogApiService) => () => {
  dogApiService.getAllBreedsList()
  .then((res) => dispatch(getBreedList(Object.keys(res.message))));
}

export {
  toHomePage,
  getDogsImagesConfig,
  getDogsImages,
  getNewDogsImages,
  fetchBreedList,
  changeDogsImagesCurrentPage,
  selectBreed,
  addDogImageToFavorites,
  getDogsImagesFromLS,
  getNewDogsImagesFromLS,
}