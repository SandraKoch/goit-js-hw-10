import './css/styles.css';
import _, { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');

console.log(inputEl);

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(object =>
      object.map(item => {
        return {
          name: item.name.official,
          capital: item.capital[0],
          population: item.population,
          flags: item.flags.svg,
          languages: item.languages,
        };
      })
    );
}

inputEl.addEventListener('input', () => {
  console.log(inputEl.value);
  _.debounce(
    fetchCountries(inputEl.value).then(result => console.log(result)),
    DEBOUNCE_DELAY
  );
});
