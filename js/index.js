'use strict';

let startDate = new Date(2020, 0, 1, 0, 0, 0, 0); // January 1st 2020 will be the start date
let today = new Date();
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
let diffDays = (Math.round(Math.abs((today - startDate) / oneDay)) % 807) + 1;
let section = document.querySelector(".pokemon-of-day");

getPokemon(diffDays, section);

// adds pokemon to the specified section
function getPokemon(pokedexNum, containerDiv) {
    let url = "https://pokeapi.co/api/v2/pokemon" + "/" + pokedexNum;
    fetch(url).then(response => response.json()).then(function(pokemon) {
        let name = document.createElement("p");
        let lowerCase = pokemon.species.name;
        name.textContent = (lowerCase.charAt(0)).toUpperCase() + lowerCase.substring(1);
        name.classList.add("text");
        let dexNum = pokemon.id;

        createPokeImage(dexNum, containerDiv, name.textContent);
        containerDiv.appendChild(name);
        getDexEntry(pokemon.species.url, containerDiv)
    });
}

// gets background information about pokemon
function getDexEntry(pokemonURL, containerDiv) {
    fetch(pokemonURL).then(response => response.json()).then(function(pokemon) {
        let genera = document.createElement("p");
        genera.textContent = (getEnglishEntry(pokemon.genera)).genus;
        genera.classList.add("text");
        containerDiv.appendChild(genera);

        let entry = document.createElement("p");
        entry.textContent = (getEnglishEntry(pokemon.flavor_text_entries)).flavor_text;
        entry.classList.add("text");
        containerDiv.appendChild(entry);
    });
}

// gets english entry of Pokemon
function getEnglishEntry(pokemonArr) {
    for (let i = 0; i < pokemonArr.length; i++) {
        if(pokemonArr[i].language.name == "en") {
            return pokemonArr[i];
        }
    }
}

// gets image of Pokemon
function createPokeImage(pokeID, containerDiv, name){
    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    pokeImage.alt = name;
    pokeImage.style.float = "center";
    containerDiv.appendChild(pokeImage);
  }