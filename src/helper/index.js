const EQUALITY = "equality";

const compareRandom = (a, b) => Math.random() - 0.5;

const sortAlphabetically = (a, b) => a.breed < b.breed ? -1 : a.breed > b.breed ? 1 : 0;

const getBreedListWithCapitalLetters = (breedList) => {
  const allBreedsNamesFirstLetters = [];

  for (let i = 0; i < breedList.length; i++) {
    const breedNameFirstLetter = breedList[i][0];
    allBreedsNamesFirstLetters.push(breedNameFirstLetter);
  }

  return [...new Set(allBreedsNamesFirstLetters)].map(
    breedNameFirstLetter => {
      const breeds = breedList.filter((breed) => breed[0] === breedNameFirstLetter);
      return {
        breedNameFirstLetter,
        breeds,
      }
    });
};

export {EQUALITY, compareRandom, sortAlphabetically, getBreedListWithCapitalLetters };
