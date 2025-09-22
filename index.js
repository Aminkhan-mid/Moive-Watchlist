const searchInp = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const displayMovies = document.getElementById('display-movies')
const watchlistMoives = document.getElementById('watchlist-moives')
const emptyWatchlist = document.getElementById('empty-watchlist')

let watchlistArr = JSON.parse(localStorage.getItem("watchlistArr")) || []



document.addEventListener("click", function(e){
    if(e.target === searchBtn){
        getMoives(searchInp.value)
        searchInp.value = ""
    } 
    else if(e.target.closest(".watchlistBtn")){
        const btn = e.target.closest(".watchlistBtn")
        const movieID = btn.dataset.id
        const index = watchlistArr.indexOf(movieID)
        if(index === -1){
            watchlistArr.push(movieID)
        } else{
            watchlistArr.splice(index, 1)
        }
        localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
        renderWatchlist()
        watchlistArr = []
    }
})
document.addEventListener("DOMContentLoaded", function() {
    renderWatchlist()
})

addEventListener("keyup", function(e){
    e.preventDefault()
    if(e.key === "Enter"){
        getMoives(searchInp.value)
        searchInp.value = ""
    }
})

async function renderWatchlist(){
    let watchlistArr = JSON.parse(localStorage.getItem("watchlistArr")) || []

    if(watchlistArr.length === 0){
        renderEmptyWatchList()
        return
    }
    const movies = await Promise.all(
        watchlistArr.map(async (id)=>{
            const response = await fetch(`https://www.omdbapi.com/?apikey=89e5c911&i=${id}&plot=short`)
            const data = await response.json()
            return {
                 id: data.imdbID,
                title: data.Title,
                poster: data.Poster,
                runtime: data.Runtime,
                genres: data.Genre.split(",").slice(0, 3),
                desc: data.Plot,
                ratings: data.imdbRating
            }
        })
    )
   const render = movies.map(m => {
      return  `
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
        <button class="watchlistBtn" data-id="${m.id}">
        <i class="fa-solid fa-circle-minus"></i>
        Remove
        </button>
        </div>
        <p class="moive-decs">${m.desc}</p>
        </div>  
        </div>
        <hr>`
    }).join("")

    watchlistMoives.innerHTML = render
}

function renderEmptyWatchList(){
    if(watchlistArr.length === 0){
        emptyWatchlist.innerHTML = 
        `
        <div id="watchlist-empty" class="watchlist-empty">
        <p>Your watchlist is looking a little empty...</p>
        <button class="addMoives">
        <a href="./index.html">
        <i class="fa-solid fa-circle-plus"></i>
        Let's add some moives!
        </a>
        </button>
        </div>
        `
    }
}

async function getMoives(searchValue) {
    displayMovies.innerHTML = ""

   const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=89e5c911&s=${searchValue}`)
   const searchData = await searchResponse.json()

   if(searchData.Response === "False"){
        document.getElementById('hideHome').style.display = "none"
    document.getElementById('unavailable').innerHTML = 
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
                ratings: detailsData.imdbRating,
                id: detailsData.imdbID
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
                <button class="watchlistBtn" data-id="${m.id}">
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

 


