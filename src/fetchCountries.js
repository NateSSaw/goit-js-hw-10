export default class APIRestCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const API_URL = 'https://restcountries.com/v3.1/name/';

    return fetch(
      `${API_URL}${this.searchQuery}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      .then(countries => {
        return countries;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
