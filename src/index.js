import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => {
      // console.log('response check', res.ok);
      // ternary operator
      return res.ok ? res.json() : [];
    })
    .then(object => {
      // console.log('object check', name, object);
      return object.map(item => {
        return {
          name: item.name.official,
          capital: item.capital,
          population: item.population,
          flags: item.flags.svg,
          languages: item.languages,
        };
      });
    });
}

function handleResults(results) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  if (results.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (results.length >= 2 && results.length <= 10) {
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
    fetchCountries(trimmedInputValue).then(result => {
      handleResults(result);
    });
  }, DEBOUNCE_DELAY)
);
