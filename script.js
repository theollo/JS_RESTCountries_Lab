console.log("Testing, testing, 1 2 3 ...")

const url = "https://restcountries.com/v3.1/all"
let countries = [];


const fetchCountries = function(){
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
countries = data;
return countries;
    });
}
const createCountryElement = function(country){
    const li = document.createElement('li');
    const name = document.createElement('h2');
const population = document.createElement('p')
name.textContent = country.name.common;
population.textContent = 'Population: ' + country.population;
li.appendChild(name);
li.appendChild(population);
return li;
}

const displayCountries = function() {
    const countriesList = document.getElementById('countries');
    countriesList.innerHTML = '';
    for (let i = 0; i < countries.length; i++) {
      const countryElement = createCountryElement(countries[i]);
      countriesList.appendChild(countryElement);
    }
  }
  const filterCountries=function(searchTerm) {
    const filteredCountries = countries.filter(function(country) {
      const name = country.name.common.toLowerCase();
      return name.includes(searchTerm.toLowerCase());
    });
    return filteredCountries;
  }

  const handleSearch =function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value;
    const filteredCountries = filterCountries(searchTerm);
    displayFilteredCountries(filteredCountries);
  }
  function displayFilteredCountries(filteredCountries) {
    const countriesList = document.getElementById('countries');
    countriesList.innerHTML = '';
    for (let i = 0; i < filteredCountries.length; i++) {
      const countryElement = createCountryElement(filteredCountries[i]);
      countriesList.appendChild(countryElement);
    }
  }

  const setUp=function() {
    fetchCountries()
      .then(function() {
        displayCountries();
        const form = document.querySelector('form');
        form.addEventListener('submit', handleSearch);
      });
  }
  
  setUp();