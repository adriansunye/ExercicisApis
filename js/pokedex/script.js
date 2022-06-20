const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
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
    const pokemonName = pokemonObj.map(item => item.name);    
    console.log(pokemonName[i]);
    }     
}   