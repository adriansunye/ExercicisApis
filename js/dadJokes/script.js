const jokeEl = document.querySelector('.container .joke');
const jokeBtn = document.querySelector('.container .btn');
document.addEventListener('DOMContentLoaded', generateJoke)
jokeBtn.addEventListener('click', generateJoke);

async function generateJoke(){
    const jokeData = await fetch ('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
        }
    });
    const jokeObj = await jokeData.json();
    jokeEl.innerHTML = jokeObj.joke;
}