
const moviesGrid = document.querySelector(".movies-grid") 
let app = document.querySelector(".app")
let movieInfoPage = document.querySelector(".movieInfoPage")
const closeBtn = document.querySelector(".close-btn")
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
document.addEventListener("DOMContentLoaded", loadSite())




function abc(){
  movieInfoPage.style.display = "none"
   app.style.display = "flex"
  
}






async function loadSite(){
    
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
}








async function loadMovie(movieID){
    const id = movieID
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=67cf32bdad212a7cc907563a23e39342`;
    const res = await fetch(`${URL}`);
    const movie = await res.json() 
    console.log("THIS MOVIE UNDER")
    console.log(movie)
    console.log("THIS MOVIE ABOVE")
    return movie 
    }


async function loadRecommendations(movieID){
    const id = movieID
    const URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=67cf32bdad212a7cc907563a23e39342`;
    const res = await fetch(`${URL}`);
    const movie = await res.json() 
    console.log("THIS MOVIE UNDER")
    console.log(movie)
    console.log("THIS MOVIE ABOVE")
    return movie 
    }


















async function displayMovieDetails(movieID){
  app.style.display = "none"
  movieInfoPage.style.display = "flex"
  let movieInfo = await loadMovie(movieID)
  //THIS IS SUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    // let movieInfo = (function loadMovie(){
    // let movieData
    // fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=67cf32bdad212a7cc907563a23e39342`)
    // .then((res)=>res.json())
    // .then((data)=> movieData = data) 
    // return movieData
    // })()

  


    console.log(movieInfo)
    //THIS IS SUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    movieInfoPage.innerHTML = `<div class="details">
            <div class="movie-info">
                <div class="infoo">
                    <img class="poster" src="${img_path+movieInfo.poster_path}" alt=""></img>
                    <div class="info">
                        <h1 class="movie-title">${movieInfo.title}</h1>
                        <h2 class="date">Relase date: ${movieInfo.release_date}</h2>
                        <div class="vote">
                            <h2 class="average-vote">rating: ${movieInfo.vote_average} <i class="fa-solid fa-star"></i></h2>
                            <h2 class="vote-count">all votes: ${movieInfo.vote_count}</h2>
                        </div>
                        <div class="genres">
                    
                            <h3 class="genre">Drama</h3>
                            <h3 class="genre">Action</h3>
                        </div>
                        <div class="desc">
                            <h2>Plot: ${movieInfo.overview}</h2>
                        </div>
                    
                    </div>
                </div>
                
                <a href="${movieInfo.homepage}" class="link" target="_blank">OFFICIAL PAGE</a>
                

                <div class="reccomendations">
                    <div class="sep-container">
                        <div class="separator"></div>
                    </div>
                    
                    <h1 class="rec-title">People who watched Pinokio also watch:</h1>
                    <div class="rec-container">
                        <div class="movie-card movie-rec">
                            <img class="img-rec"></img>
                            <h3 class="title-of-movie-rec">Little Mermaid</h3>
                        </div>
                        
                    </div>
                    
                </div>
                <i class="fa-solid fa-circle-xmark close-btn" onclick="abc()"></i>
            </div>
            
        </div>`
         function getGenres(movie){
            for(i=0; i<movie.genre_ids.length ; i++){
                    return `<h3>${genres[movie.genre_ids]}</h3>`
            }
         }

}
