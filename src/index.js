import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

function handleResults(results) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  if (results.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (results.length >= 2) {
    displayCountryList(results);
  } else if (results.length === 1) {
    const CountryObj = results[0];
    displayCountryInfo(CountryObj);
  } else {
    Notify.failure('Oops, there is no country with that name');
  }
}

function displayCountryList(results) {
  for (let i = 0; i < results.length; i++) {
    const country = results[i];
    const countryFlag = country.flags;
    const countryName = country.name;

    // console.log('loop results', country);
    const instance = document.createElement('li');
    instance.insertAdjacentHTML(
      'beforeend',
      `<div><img src="${countryFlag}"><span>${countryName}</span></div>`
    );
    countryListEl.append(instance);
  }
}

function displayCountryInfo(result) {
  // console.log('country info', result);

  const countryFlag = result.flags;
  const countryName = result.name;
  const countryCapital = result.capital;
  const countryPopulation = result.population;
  const countryLanguages = result.languages;
  countryInfoEl.insertAdjacentHTML(
    'beforeend',
    `<div class="country-main-info"><img src="${countryFlag}"><b><span class="country-name">${countryName}</span></b></div>
    <p><b>Capital: </b>${countryCapital}</p>
    <p><b>Population: </b>${countryPopulation}</p>
    <p><b>Languages: </b>${Object.values(countryLanguages)}</p>`
  );
}

inputEl.addEventListener(
  'input',
  debounce(() => {
    const trimmedInputValue = inputEl.value.trim();
    if (trimmedInputValue) {
      fetchCountries(trimmedInputValue).then(result => {
        handleResults(result);
      });
    }
  }, DEBOUNCE_DELAY)
);
