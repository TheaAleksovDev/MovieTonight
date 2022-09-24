
// (async function loadMovie(){
//     const id = 532639
// const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=67cf32bdad212a7cc907563a23e39342`;
// const res = await fetch(`${URL}`);
// const movivie = await res.json() 
// console.log("THIS MOVIE UNDER")
// console.log(movivie)
// console.log("THIS MOVIE ABOVE")
// })()


(async function loadMovie(){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=67cf32bdad212a7cc907563a23e39342`);
    const movivie = await res.json() 
console.log("GENRE MOVIES UNDER")
console.log(movivie)
console.log("GENRE MOVIES ABOVE")
})()

// async function loadTrendingMovies(){
//     const URL = `${base}/discover/movie?sort_by=popularity.desc${keyy}`;
//     const res = await fetch(`${URL}`);
//     const trendingMovies = await res.json() 
//     return trendingMovies
// }
// console.log("UNDERR")
// console.log(loadTrendingMovies())
// console.log("ABOVEE")
