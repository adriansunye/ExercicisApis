const APIURL = 'https://api.themoviedb.org/3/movie/popular/';
const KEY = '?api_key=7715948e664c6e129be057fb76a55a6d';
const IMGURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const NUMBEROF = 20;
document.addEventListener( "DOMContentLoaded", getMovies);

async function getMovies(){
    
    for(let i = 0; i < NUMBEROF; i++){
        try{
            let rng = Math.floor(Math.random() * (100000 - 1) + 1);
            const movieData = await fetch (APIURL + KEY, {
            headers: {
                'Accept': 'application/json',
                }
            });
            const movieObj = await movieData.json(); 
            if(!movieObj) throw "empty";
           
         createCard(movieObj, i);
        } catch(err) {
            console.log("Input is " + err);
            i--;
        }
    }
    showMain();
} 
function createCard(movie, pos){
    const movieDiv = document.createElement("div"); 
    const imgContainer = document.createElement("div");
    const poster = document.createElement("img");
    const info = document.createElement("div");
    const name = document.createElement("h3");
    const score = document.createElement("span");
    const infoCollapsed = document.createElement("div");
    const overview = document.createElement("strong");
    const overviewText = document.createElement("span");
    const description = document.createElement("span");
    
    const movieid = 'id' + movie.results[pos].id;
    document.getElementById('movieContainer').appendChild(movieDiv);
    movieDiv.setAttribute('class', 'movie');
    
    movieDiv.setAttribute('id', movieid);
    
    document.getElementById(movieid).appendChild(imgContainer);
    imgContainer.setAttribute('class', 'imgContainer');
    
    document.querySelector('#' + movieid + ' .imgContainer').appendChild(poster);
    poster.setAttribute('alt', movie.results[pos].title); 
    poster.setAttribute('src',  IMGURL + movie.results[pos].poster_path);     
}

function showMain(){
    document.getElementById('movieContainer').setAttribute('class', 'fadeIn');
}