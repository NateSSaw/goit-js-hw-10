import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import APIRestCountries from './fetchCountries';

const DEBOUNCE_DELAY = 3000;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

const APIRestCountriesSearch = new APIRestCountries();
input.addEventListener('input', debounce(onType, DEBOUNCE_DELAY));

function onType(e) {
  e.preventDefault();
  APIRestCountriesSearch.query = e.target.value.trim();
  if (APIRestCountriesSearch.query === '') {
    clearPage();
    return;
  }

  APIRestCountriesSearch.fetchCountries().then(searchResult).catch(onError);
}

function createMarkup({ name, capital, population, flags, languages }) {
  const markup = `<img src="${flags.svg}" width="30", height="20">
  <h2>${name.official}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>
    `;
  countryCard.insertAdjacentHTML('beforeend', markup);
}

function searchResult(countries) {
  clearPage();
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    createListOfCuntries(countries);
  } else if (countries.length === 1) {
    createMarkup(countries[0]);
  } else {
    Notify.failure('Oops, there is no country with that name.');
  }
}

function createListOfCuntries(countries) {
  const markup = countries
    .map(
      ({ flags, name }) =>
        `<li><img src="${flags.svg}"><p>${name.official}</p></li>`
    )
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);
}

function clearPage() {
  countryList.innerHTML = '';
  countryCard.innerHTML = '';
}

function onError(err) {
  Notify.failure(err);
}
