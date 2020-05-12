function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function sortAlphabetically(a, b) {
  const aa = a.src.match(/.*\/(.*)\/(.*)$/)[1];
  const bb = b.src.match(/.*\/(.*)\/(.*)$/)[1];
  return aa < bb ? -1 : aa > bb ? 1 : 0;
}

// rename 
const getCurrentDogsImages = (
  images,
  getNewImages,
  dogsImagesCurrentPage,
  dogsImagesPerPage
) => {
  let indexOfLastItem = dogsImagesCurrentPage * dogsImagesPerPage;
  let indexOfFirstItem = indexOfLastItem - dogsImagesPerPage;
  let dogsImages = images.slice(indexOfFirstItem, indexOfLastItem);

  return getNewImages(dogsImages);
};

export { compareRandom, sortAlphabetically, getCurrentDogsImages };
