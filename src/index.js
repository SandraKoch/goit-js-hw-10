import './css/styles.css';
// var debounce = require('lodash.debounce');
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => {
      // console.log('response check', res.ok);
      // ternary operator
      return res.ok ? res.json() : [];
    })
    .then(object => {
      // console.log('object check', object);
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
  console.log('results', results);
  if (results.length > 10) {
    //notiflix "Too many matches found. Please enter a more specific name."
    console.log(
      'Too many matches found. Please enter a more specific name.',
      results
    );
  } else if (results.length >= 2 && results.length <= 10) {
    //display function
    console.log('display results');
  } else {
    //display card
    console.log('display card');
  }
}

inputEl.addEventListener(
  'input',
  debounce(() => {
    const trimmedInputValue = inputEl.value.trim();
    console.log(trimmedInputValue);
    fetchCountries(trimmedInputValue).then(result => {
      handleResults(result);
    });
  }, DEBOUNCE_DELAY)
);
