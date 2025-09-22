const searchInp = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const displayMovies = document.getElementById('display-movies')


searchBtn.addEventListener('click', function(){
    getMoives(searchInp.value)
    searchInp.value = ""
})

addEventListener("keyup", function(e){
    e.preventDefault()
    if(e.key === "Enter"){
        getMoives(searchInp.value)
        searchInp.value = ""
    }
})

async function getMoives(searchValue) {
    displayMovies.innerHTML = ""

   const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=89e5c911&s=${searchValue}`)
   const searchData = await searchResponse.json()

   if(searchData.Response === "False"){
        document.getElementById('hideHome').style.display = "none"
    displayMovies.innerHTML = 
        `<p>Unable to find what you’re looking for. Please try another search.</p>`
        return []
   }

   const movies = await Promise.all(
        searchData.Search.map(async (movie) => {
            const detailsResponse = await fetch(`https://www.omdbapi.com/?apikey=89e5c911&i=${movie.imdbID}&plot=short`)
            const detailsData = await detailsResponse.json()

            const movieDetails = {
                title: detailsData.Title,
                poster: detailsData.Poster,
                runtime: detailsData.Runtime,
                genres: detailsData.Genre.split(",").slice(0, 3),
                desc: detailsData.Plot,
                ratings: detailsData.imdbRating
            } 
            return movieDetails
        })
    )
    const render = movies.map(function(m){
        return `
        <div class="moive-container">
        <img src="${m.poster}" alt="${m.title}">
        <div class="moiveChild-container">
        <div class="divFlex">
        <h3>${m.title}</h3>
        <p class="ratings">
        <i class="fa-solid fa-star"></i> 
        ${m.ratings}
        </p>
        </div>
        <div class="divFlex">
        <p class="total-mins">${m.runtime}</p>
        <p class="genres">${m.genres}</p>
        <button>
        <i class="fa-solid fa-circle-plus"></i>
        Watchlist
        </button>
        </div>
        <p class="moive-decs">${m.desc}</p>
        </div>  
        </div>
        <hr>`
    }).join("")
    document.getElementById('hideHome').style.display = "none"
    displayMovies.innerHTML = render
}
        
// api key 89e5c911

 


