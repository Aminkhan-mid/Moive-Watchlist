const searchInp = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const moivesContainer = document.getElementById('moives-container')


searchBtn.addEventListener('click', async ()=>{
    let searchValue = searchInp.value
    const response = await fetch(`http://www.omdbapi.com/?apikey=89e5c911&s=${searchValue}&plot`)
    const data = await response.json()
    console.log(data)
    moivesContainer.innerHTML = renderMoivesList(data)
})


function renderMoivesList(moives){
    let html = ''
    for(let moive of moives){
      return  html =    
    `
        <img src="${moive.Poster}" alt="moive-poster">
        <p>${moive.Title}</p>
        <p>${moive.Year}</p>
        <p>${moive.Type}</p>
    `
    }

}

// api key 89e5c911

