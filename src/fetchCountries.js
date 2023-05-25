export function fetchCountries(name) {
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
