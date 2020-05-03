export default class DogApiService {
  async getAllBreedsList() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    return await res.json();
  }
  async getBreedImages(url) {
    const res = await fetch(`https://dog.ceo/api/breed/${url}/images`);
    return await res.json();
  }
}
