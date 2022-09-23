
const moviesGrid = document.querySelector(".movies-grid") 
const app = document.querySelector(".app")
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

let img_path="https://image.tmdb.org/t/p/w500"
let baseUrl = `https://api.themoviedb.org/3`
let key = `&api_key=67cf32bdad212a7cc907563a23e39342`
let URL = `${baseUrl}/discover/movie?sort_by=popularity.desc${key}`

async function loadTrendingMovies(){
    const URL = `${baseUrl}/discover/movie?sort_by=popularity.desc${key}`;
    const res = await fetch(`${URL}`);
    const trendingMovies = await res.json() 
    return trendingMovies
}
let trendingMovies = []
document.addEventListener("DOMContentLoaded", async()=>{
    

    try{
        trendingMovies = await loadTrendingMovies()
        
    }catch(e){
        console.log("Error" + (e))
    }
console.log(trendingMovies.results[1])
    for(i=0; i<trendingMovies.results.length; i++){
        moviesGrid.innerHTML += `
        <div class="movie-card">
            <img src=${img_path+trendingMovies.results[i].poster_path}></img>
            <h1 class="title">${trendingMovies.results[i].title}</h1>
            <h3 class="rating">${trendingMovies.results[i].vote_average} <i class="fa-solid fa-star"></i></h3>
            <h3 class="id" style="display: none;">${trendingMovies.results[i].id}</h3>
            
        </div>`
        //document.querySelector(".movie-card").addEventListener()
    }
    allMovies = document.querySelectorAll(".movie-card")
    console.log(allMovies)
    allMovies.forEach(movie=>{
        movie.addEventListener('click',()=>{
            const id = movie.querySelector(".id").textContent
            
            displayMovieDetails(id)
        })
    })
})

function displayMovieDetails(movie){
    app.innerHTML = `<div class="details">
            <div class="movie-info">
                <img class="poster" src="${img_path+movie.poster_path}" alt=""></img>
                <div class="info">
                    <h1 class="movie-title">${movie.title}</h1>
                    <h2 class="date">Relase date: ${movie.release_date}</h2>
                    <div class="vote">
                        <h2 class="average-vote">rating: ${movie.vote_average} <i class="fa-solid fa-star"></i></h2>
                        <h2 class="vote-count">all votes: ${movie.vote_count}</h2>
                    </div>
                    <div class="genres">
                        
                        <h3 class="genre">Drama</h3>
                        <h3 class="genre">Action</h3>
                    </div>
                    <div class="desc">
                        <h2>${movie.overview}</h2>
                    </div>
                </div>
                
            </div>
            
         </div>`
         function getGenres(movie){
            for(i=0; i<movie.genre_ids.length ; i++){
                    return `<h3>${genres[movie.genre_ids]}</h3>`
            }
         }
}