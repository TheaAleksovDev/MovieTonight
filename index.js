
const moviesGrid = document.querySelector(".movies-grid") 
let app = document.querySelector(".app")
let movieInfoPage = document.querySelector(".movieInfoPage")
const closeBtn = document.querySelector(".close-btn")
const input = document.querySelector(".search")
const searchRes = document.querySelector(".search-results")
const genresContainer = document.querySelector(".genres-container")
const moviesByGenrePage = document.querySelector(".movies-by-genre-page")
const byGenreGrid = document.querySelector(".by-genre-grid")
const movies = document.querySelector(".movies")
const searchBtn = document.querySelector(".fa-magnifying-glass")
const searchPage = document.querySelector(".search-page")
const searchGrid = document.querySelector(".search-grid")
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


genres.map((genre)=>{
  genresContainer.innerHTML += `<button class="${genre.name} genree" onclick="loadByGenre(${genre.id})">${genre.name}</button>`
})


async function loadTrendingMovies(){
  
    const URL = `${baseUrl}/discover/movie?sort_by=popularity.desc${key}`;
    const res = await fetch(`${URL}`);
    const trendingMovies = await res.json() 
    return trendingMovies
}

async function loadHighRatingMovies(){
  
    const URL = `${baseUrl}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc${key}`;
    const res = await fetch(`${URL}`);
    const highRateMovies = await res.json() 
    return highRateMovies
}



let trendingMovies = []
let reccomendations = []

document.addEventListener("DOMContentLoaded", loadSite())




function closeBtnFunction(){
  movieInfoPage.style.display = "none"
   app.style.display = "flex"
  
}


async function loadSite(){
    input.value = ""
    try{
        
        trendingMovies = await loadTrendingMovies()

        
        
        
    }catch(e){
        console.log("Error" + (e))
    }

         for(i=0; i<trendingMovies.results.length; i++){
        
        moviesGrid.innerHTML += `
        <div class="movie-card">
            <img class="imagee" src=${img_path+trendingMovies.results[i].poster_path}></img>
            <h1 class="title">${trendingMovies.results[i].title}</h1>
            <h3 class="rating">${trendingMovies.results[i].vote_average} <i class="fa-solid fa-star"></i></h3>
            <h3 class="id" style="display: none;">${trendingMovies.results[i].id}</h3>
            
        </div>`
    }
    allMovies = document.querySelectorAll(".movie-card")
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
    return movie 
}


async function loadRecommendations(movieID){
    const id = movieID
    const URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=67cf32bdad212a7cc907563a23e39342`;
    const res = await fetch(`${URL}`);
    const reccomendations = await res.json() 
    return reccomendations 
    
}

async function loadByGenre(genreID){
  input.value = ""
  app.style.display = "none"
  searchRes.style.display= "none"
  searchPage.style.display= "none"
  moviesByGenrePage.style.display = "flex"
  byGenreGrid.style.display = "grid"
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}&sort_by=revenue.desc&api_key=67cf32bdad212a7cc907563a23e39342`);
    const moviesByGenre = await res.json() 


byGenreGrid.innerHTML = ""
for(i=0; i<moviesByGenre.results.length; i++){
byGenreGrid.innerHTML += `
        <div class="movie-card">
            <img class="imagee" src=${img_path+moviesByGenre.results[i].poster_path}></img>
            <h1 class="title">${moviesByGenre.results[i].title}</h1>
            <h3 class="rating">${moviesByGenre.results[i].vote_average} <i class="fa-solid fa-star"></i></h3>
            <h3 class="id" style="display: none;">${moviesByGenre.results[i].id}</h3>            
        </div>`
}
allMovies = document.querySelectorAll(".movie-card")
    allMovies.forEach(movie=>{
        movie.addEventListener('click',()=>{
            const id = movie.querySelector(".id").textContent
            
            displayMovieDetails(id)
        })
    })
let genreTitle = ""
for(j=0 ;j<genres.length ; j++){
  if(genres[j].id == genreID){
    genreTitle = genres[j].name
  }
}
document.querySelector(".genre-title").textContent =  await genreTitle

}


async function displayMovieDetails(movieID){
  app.style.display = "none"
  moviesByGenrePage.style.display = "none"
   searchPage.style.display = "none"
  movieInfoPage.style.display = "flex"

  try{    
        reccomendations = await loadRecommendations(movieID)
  }catch(e){
        console.log("Error" + (e))
      }

    function getGenres(){
            for(i=0; i<movieInfo.genres.length ; i++){
                    return `<h3 class="genre">${movieInfo.genres[i].name}</h3>`
            }
         }
  let movieInfo = await loadMovie(movieID)
    movieInfoPage.innerHTML = `<div class="details">
            <div class="movie-info">
                <div class="infoo">
                    <img class="poster" src="${img_path+movieInfo.poster_path}" alt=""></img>
                    <div class="info">
                        <h1 class="movie-title">${movieInfo.title}</h1>
                        <h2 class="date">Relase date: ${movieInfo.release_date}</h2>
                        <div class="vote">
                            <h2 class="average-vote">rating: ${(movieInfo.vote_average).toFixed(1)} <i class="fa-solid fa-star"></i></h2>
                            <h2 class="vote-count">all votes: ${movieInfo.vote_count}</h2>
                        </div>
                        <div class="genres">
                              ${getGenres()}
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
                    
                    <h1 class="rec-title">People who watched "${movieInfo.title}" also watch:</h1>

                    <div class="rec-container">  

                    </div>
                    
                </div>
                <i class="fa-solid fa-circle-xmark close-btn" onclick="closeBtnFunction()"></i>
            </div>
            
        </div>`
        let recom = document.querySelector(".reccomendations")
        let movieInf = document.querySelector(".movie-info")
        if(reccomendations.results.length > 0){
          for(i=0; i<reccomendations.results.length; i++){
        let recContainer = document.querySelector(".rec-container")
        recContainer.innerHTML += `
        <div class="movie-card movie-rec">
  
            <img class="img-rec imagee" src=${img_path+reccomendations.results[i].poster_path} alt="Poster of ${reccomendations.results[i].title} "></img>
            <h3 class="id" style="display: none;">${reccomendations.results[i].id}</h3>
            
        </div>`
    }
        }else if (reccomendations.results.length === 0){
          recom.style.display="none"
          movieInf.style.height="500px"

        }
         
    allMovies = document.querySelectorAll(".movie-card")
    allMovies.forEach(movie=>{
        movie.addEventListener('click',()=>{
            const id = movie.querySelector(".id").textContent
            
            displayMovieDetails(id)
        })
    })
       
        

}

//      <h3 class="title-of-movie-rec">${reccomendations.results[i].title}</h3>
//  input.onkeypress = (e)=>{
  

  input.addEventListener("keyup", function(event) {
    if(input.value != " "){
        search(input.value)
        } 
    if (event.keyCode === 13) {
        searchPageFun(input.value)
    }
});
  window.addEventListener('click',(e)=>{
    if(!searchRes.contains(e.target)){
      searchRes.style.display= "none"
    }
  })
async function search(value){  
  searchRes.style.display= "flex"
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=67cf32bdad212a7cc907563a23e39342&query=${value}`;
    const res = await fetch(`${URL}`);
    const searchResults = await res.json() 

searchRes.innerHTML = ""
  for(i=0; i<5; i++){
    
     searchRes.innerHTML += `<div class="movie-result movie-card">
                    <img class="img-search" src="${img_path+searchResults.results[i].poster_path}"></img>
                    
                    <div class="search-item-text">
                        <h3 class="title-search">${searchResults.results[i].title}</h3>
                        <h4 class="desc-search">${(searchResults.results[i].overview).slice(0,180)}...</h4>
                        <h3 class="id" style="display: none;">${searchResults.results[i].id}</h3>
                    </div>
                </div>`
  }
     allMovies = document.querySelectorAll(".movie-card")

    allMovies.forEach(movie=>{
        movie.addEventListener('click',()=>{
            const id = movie.querySelector(".id").textContent
            searchRes.style.display= "none"
            displayMovieDetails(id)

        })
    })
       
  }

function homepage(){
  searchRes.style.display= "none"
  movieInfoPage.style.display = "none"
  moviesByGenrePage.style.display = "none"
  app.style.display = "flex"
}
document.querySelector(".app-title").addEventListener('click',()=>{homepage()})

searchBtn.addEventListener('click',()=>{searchPageFun(input.value)})

async function searchPageFun(value){
  searchRes.style.display= "none"
  app.style.display = "none"
  searchPage.style.display="flex"
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=67cf32bdad212a7cc907563a23e39342&query=${value}`;
    const res = await fetch(`${URL}`);
    const searchResults = await res.json() 
    console.log(searchResults)
    searchGrid.innerHTML= ""
    for(i=0; i<searchResults.results.length; i++){  
     searchGrid.innerHTML += `<div class="movie-card">
            <img class="imagee" src=${img_path+searchResults.results[i].poster_path}></img>
            <h1 class="title">${searchResults.results[i].title}</h1>
            <h3 class="rating">${searchResults.results[i].vote_average} <i class="fa-solid fa-star"></i></h3>
            <h3 class="id" style="display: none;">${searchResults.results[i].id}</h3>
            
        </div>`
  }
  allMovies = document.querySelectorAll(".movie-card")

    allMovies.forEach(movie=>{
        movie.addEventListener('click',()=>{
            const id = movie.querySelector(".id").textContent
            searchRes.style.display= "none"
            displayMovieDetails(id)

        })
    })

}