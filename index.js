const searchInp = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const moivesContainer = document.getElementById('moives-container')


searchBtn.addEventListener('click', function(){
    getMoives(searchInp.value).then(console.log)
})

async function getMoives(searchValue) {
    const searchRes = await fetch(`http://www.omdbapi.com/?apikey=89e5c911&s=${searchValue}`)
    const searchData = await searchRes.json()
    if(searchData.Response === "False") {
        console.log('Unable to find what you’re looking for. Please try another search.')
        return []
    }
    const movies = await Promise.all(
        searchData.Search.map(async (movie)=>{
            const detailsRes = await fetch(`http://www.omdbapi.com/?apikey=89e5c911&i=${movie.imdbID}&plot=short`)
            const detailsData = await detailsRes.json()
             const movieDetails = {
                title: detailsData.Title,
                poster: detailsData.Poster,
                runtime: detailsData.Runtime,
                genres: detailsData.Genre.split(",").slice(0, 3),
                desc: detailsData.Plot,
                ratings: detailsData.imdbRating
            } 

                 document.getElementById('display-movies').innerHTML += `
       <div class="moive-container">
        <img src="${movieDetails.poster}" alt="movie photo">
        <div class="moiveChild-container">
            <div class="divFlex">
                <h3>${movieDetails.title}</h3>
                <p class="ratings">
                    <i class="fa-solid fa-star"></i> 
                    ${movieDetails.ratings}
                </p>
            </div>
            <div class="divFlex">
                <p class="total-mins">${movieDetails.runtime}</p>
                <p class="genres">${movieDetails.genres}</p>
                <button>
                    <i class="fa-solid fa-circle-plus"></i>
                    Watchlist
                </button>
            </div>
            <p class="moive-decs">${movieDetails.desc}</p>
        </div>  
    </div>
    <hr>`
        })
    )
    return movies
}

// api key 89e5c911

 