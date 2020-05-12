'use strict';

// adds pokemon to the specified section
function getPokemon(pokedexNum, containerDiv) {
    let url = "https://pokeapi.co/api/v2/pokemon" + "/" + pokedexNum;
    fetch(url).then(response => response.json()).then(function(pokemon) {
        let name = $("<p>");
        let lowerCase = pokemon.species.name;
        name.text((lowerCase.charAt(0)).toUpperCase() + lowerCase.substring(1));
        name.addClass("text");
        let dexNum = pokemon.id;
        createPokeImage(dexNum, containerDiv, name.text());
        containerDiv.append(name);
        getDexEntry(pokemon.species.url, containerDiv)
    });
}

// gets background information about pokemon
function getDexEntry(pokemonURL, containerDiv) {
    fetch(pokemonURL).then(response => response.json()).then(function(pokemon) {
        let genera = $("<p>");
        genera.text((getEnglishEntry(pokemon.genera)).genus);
        genera.addClass("text");
        containerDiv.append(genera);
        let entry = $("<p>");
        entry.text((getEnglishEntry(pokemon.flavor_text_entries)).flavor_text);
        entry.addClass("text");
        containerDiv.append(entry);
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
    let pokeImage = $("<img>")
    pokeImage.attr({"alt":name, "srcset":`https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`});
    pokeImage.css("display", "block");
    containerDiv.append(pokeImage);
  }

let startDate = new Date(2020, 0, 1, 0, 0, 0, 0); // January 1st 2020 will be the start date
let today = new Date();
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
let diffDays = (Math.round(Math.abs((today - startDate) / oneDay)) % 807) + 1;
let section = $(".pokemon-of-day");

getPokemon(diffDays, section);