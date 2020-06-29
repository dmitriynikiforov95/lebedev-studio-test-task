function compareRandom(a, b) {
  return Math.random() - 0.5;
}

const sortAlphabetically = (a, b) => a.breed < b.breed ? -1 : a.breed >  b.breed ? 1 : 0;

const getBreedListWithCapitalLetters = (breedList) => {
  const allFirstLetters = [];

  for (let i = 0; i < breedList.length; i++) {
    allFirstLetters.push(breedList[i][0]);
  }

  return [...new Set(allFirstLetters)].map((letter) => ({
    letter,
    breeds: breedList.filter((breed) => breed[0] === letter),
  }));
};

export { compareRandom, sortAlphabetically, getBreedListWithCapitalLetters };
