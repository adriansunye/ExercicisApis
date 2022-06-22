const poke_container = document.getElementById('poke-container')
const pokemon_count = 898
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const APIURL = 'https://pokeapi.co/api/v2/pokemon/';

document.addEventListener( "DOMContentLoaded", getPokemon);

async function getPokemon(){
    
    for(let i = 1; i < pokemon_count; i++){
        const pokemonData = await fetch (APIURL + i, {
        headers: {
            'Accept': 'application/json',
        }
    });
    const pokemonObj = await pokemonData.json();   
    createCard(pokemonObj);
    }     
} 

function createCard(pokemon){
    const pokemonDiv = document.createElement("div"); 
    const imgContainer = document.createElement("div");
    const sprite = document.createElement("img");
    const info = document.createElement("div");
    const num = document.createElement("span");
    const name = document.createElement("h3");
    const type = document.createElement("small");
    const typeText = document.createElement("span");
    
    
    document.getElementById('poke-container').appendChild(pokemonDiv);
    pokemonDiv.setAttribute('class', 'pokemon');
    pokemonDiv.setAttribute('id', pokemon.name);
    for (const key in colors) {
        if (pokemon.types[0].type.name == key) {
            pokemonDiv.style.backgroundColor = colors[key];
        }
    }
    
    document.getElementById(pokemon.name).appendChild(imgContainer);
    imgContainer.setAttribute('class', 'img-container');
    
    document.querySelector('#' + pokemon.name + ' .img-container').appendChild(sprite);
    sprite.setAttribute('alt', pokemon.name);
    let rng = Math.floor(Math.random() * (1024 - 1) + 1);
    if(rng === 1023){
       sprite.setAttribute('src', pokemon.sprites.front_shiny);
       }
    else{
       sprite.setAttribute('src', pokemon.sprites.front_default); 
    }

    document.getElementById(pokemon.name).appendChild(info);
    info.setAttribute('class', 'info');

    document.querySelector('#' + pokemon.name + ' .info').appendChild(num);
    num.setAttribute('class', 'number');
    num.innerHTML = pokemon.id;

    document.querySelector('#' + pokemon.name + ' .info').appendChild(name);
    name.setAttribute('class', 'name');
    name.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    document.querySelector('#' + pokemon.name + ' .info').appendChild(type);
    type.setAttribute('class', 'type');
    document.querySelector('#' + pokemon.name + ' .info .type').appendChild(typeText);
    if(pokemon.types[1]){
       typeText.innerHTML = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1) + ' / ' + pokemon.types[1].type.name.charAt(0).toUpperCase() + pokemon.types[1].type.name.slice(1);
       }
    else{
       typeText.innerHTML = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    }    
}