function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  function sortAlphabetically(a, b) {
    const aa = a.src.match(/.*\/(.*)\/(.*)$/)[1];
    const bb = b.src.match(/.*\/(.*)\/(.*)$/)[1];
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  }

  export {
    compareRandom,
    sortAlphabetically,
  }