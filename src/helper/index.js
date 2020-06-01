function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function sortAlphabetically(a, b) {
  const aa = a.src.match(/.*\/(.*)\/(.*)$/)[1];
  const bb = b.src.match(/.*\/(.*)\/(.*)$/)[1];
  return aa < bb ? -1 : aa > bb ? 1 : 0;
}


const getBreedListWithCapitalLetters = (breedList) => {
    
  let letter = "";

  let breedListWithCapitalLetters = breedList.map((item) => {
    return {
      value: item,
      isCapitalLetter: false,
    };
  });

  for (let i = 0; i < breedListWithCapitalLetters.length; i++) {
    let capitalLetter = {
      value: breedListWithCapitalLetters[i].value[0].toUpperCase(),
      isCapitalLetter: true,
    };
    if (capitalLetter.value !== letter) {
      letter = capitalLetter.value;
      breedListWithCapitalLetters.splice(i, 0, capitalLetter);
    }
  }
  letter = "";

  return breedListWithCapitalLetters;
};



export { compareRandom, sortAlphabetically, getBreedListWithCapitalLetters };
