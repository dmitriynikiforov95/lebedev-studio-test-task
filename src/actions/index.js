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


export {
  toHomePage,
  getDogsImagesConfig,
  getDogsImages,
}