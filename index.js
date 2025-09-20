const searchInp = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')


searchBtn.addEventListener('click', async ()=>{
    let searchValue = searchInp.value
    const response = await fetch(`http://www.omdbapi.com/?apikey=89e5c911&s=${searchValue}`)
    const data = await response.json()
    console.log(data)
    
})


