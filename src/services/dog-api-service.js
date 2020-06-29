export default class DogApiService {
  
  async getAllBreedsList() {
    const apiBase = "https://dog.ceo/api/breeds/list/all";

    const res = await fetch(apiBase);
   
    if (!res.ok) {
      throw new Error(`Could not fetch  ${apiBase} +
                , received ${res.status}`);
    }

    return await res.json();
  }

  async getBreedImages(url) {
    const apiBase = `https://dog.ceo/api/breed/${url}/images`;

    const res = await fetch(apiBase);
    if (!res.ok) {
      throw new Error(`Could not fetch  ${apiBase} +
                , received ${res.status}`);
    }
    
    return await res.json();
  }

}
