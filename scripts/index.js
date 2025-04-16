let input = document.getElementById("name")
let searchbtn = document.getElementById("searchbtn")
let moviesection = document.getElementById("movies")
let idlestate = document.getElementById("idlestate")
let noresponse = document.getElementById("noresponse")
let savedResults = JSON.parse(localStorage.getItem("searchResults"))
if (savedResults && savedResults.length > 0) {
    idlestate?.classList.add("nodisplay")
    moviesection?.classList.add("movies")
    rendermovies(savedResults)
}

searchbtn.addEventListener("click", function(){

    if (input.value === ""){
        console.log("input title")
    }
    else if (input.value){
        fetch(`https://www.omdbapi.com/?apikey=5aa9157c&s=${input.value}&type=movie`)
        .then(res=>res.json())
        .then(data=>{
            idlestate.classList.remove('idlestate')
            idlestate.classList.add('nodisplay')
            if (!data.Search){
                noresponse.classList.remove('nodisplay')
                noresponse.classList.add('noresponse')
            } else if (data.Search){
                movies.classList.remove('nodisplay')
                moviesection.classList.add('movies')
                // ✅ Save original search results (just imdbIDs)
                localStorage.setItem("searchResults", JSON.stringify(data.Search))
            }
            console.log(data.Search)
            rendermovies(data.Search)
        })
    }
})
localStorage.setItem("searchResults", JSON.stringify(data.Search))

async function rendermovies(movies){
    let htm = ''
        for (let movie of movies ){
        const response = await fetch(`https://www.omdbapi.com/?apikey=5aa9157c&i=${movie.imdbID}&plot=full`)
        const data = await response.json()
            htm += `
                <div class="movie">
                <image class="movieimg" src="${movie.Poster}"></image>

                <div class="description">

                    <div class="section1">
                        <div class="movietitle" id="movietitle">${movie.Title}</div>
                        <image class="staricon" id="staricon" src="/images/staricon.png"></image>
                        <div class="rating" id="rating"> ${data.imdbRating}</div>
                    </div>

                    <div class="section2">

                        <div class="time" id="time">${data.Runtime}</div>
                        <div class="genre" id="genre">${data.Genre}</div>
                        <button class="addbtn" id="addbutton">
                            <image class="addbuttonimg" src="/images/addicon.png"></image>
                            Watchlist
                        </button>
                        <button class="nodisplay" id="removebutton">
                            <image class="removebuttonimg" src="/images/removeicon.png"></image>
                            Remove
                        </button>

                    </div>
                    
                    <div class="section3">
                        <p class="moviedesc" id="moviedesc">${data.Plot}<span><button class="readmore" id="readmore" > Read more</button></span></p>
                    </div>
                 
                </div>

            </div>`
         
    }
    moviesection.innerHTML = htm
    let addbtns = document.querySelectorAll("#addbutton")
    addbtns.forEach(function(btn){
        btn.addEventListener("click", function(e){
            addtostorage(e)
            let addparent = e.target.parentElement.querySelector(".addbtn").classList
            let removeparent = e.target.parentElement.querySelector("#removebutton").classList
            addparent.remove("addbtn")
            addparent.add("nodisplay")
            removeparent.remove("nodisplay")
            removeparent.add("removebtn")
        })
    })
    let removebtns = document.querySelectorAll("#removebutton")
    
    removebtns.forEach(function(btn){
        btn.addEventListener("click", function(e){
            removefromstorage(e)
            let rem = e.target.parentElement.querySelector("#removebutton").classList
            let ad = e.target.parentElement.querySelector("#addbutton").classList
            ad.add("addbtn")
            ad.remove("nodisplay")
            rem.add("nodisplay")
            rem.remove("removebtn")
        })
    })
}

//--------------------------- LocalStorage add function logic ----------------------------//

function addtostorage(event){
    //accessing properties of movie added
    let element = event.target.closest(".movie")
    console.log(element.querySelector(".movietitle").textContent)
    let obj = {
        Poster: `${element.querySelector(".movieimg").src}`,
        Title: `${element.querySelector(".movietitle").textContent}`,
        Rating: `${element.querySelector(".rating").textContent}`,
        Time: `${element.querySelector(".time").textContent}`,
        Genere: `${element.querySelector(".genre").textContent}`,
        Plot: `${element.querySelector(".moviedesc").textContent}`,
    }

    //checking if the movie is already added to localstorage
    let moviesarray = []
        try {
            const stored = localStorage.getItem("movies")
            if (stored) {
                moviesarray = JSON.parse(stored)
            }
        } catch (e) {
            console.error("Error parsing localStorage data:", e)
        }

    console.log(moviesarray)
    let exists = false;
    for (let i=0; i<moviesarray.length; i++){
        if (moviesarray[i].Poster === obj.Poster){
            exists = true
            break
        }
    }
    if (!exists){
        moviesarray.push(obj)
    }
    localStorage.setItem("movies", JSON.stringify(moviesarray))
    console.log(moviesarray)
}

//--------------------------- LocalStorage remove function logic ----------------------------//

function removefromstorage(event){
    //accessing properties of movie added
    let element = event.target.closest(".movie")
    console.log(element.querySelector(".movietitle").textContent)
    let obj = {
        Poster: `${element.querySelector(".movieimg").src}`,
        Title: `${element.querySelector(".movietitle").textContent}`,
        Rating: `${element.querySelector(".rating").textContent}`,
        Time: `${element.querySelector(".time").textContent}`,
        Genere: `${element.querySelector(".genre").textContent}`,
        Plot: `${element.querySelector(".moviedesc").textContent}`,
    }

    //checking if the movie is already added to localstorage
    let moviesarray = []
        try {
            const stored = localStorage.getItem("movies")
            if (stored) {
                moviesarray = JSON.parse(stored)
            }
        } catch (e) {
            console.error("Error parsing localStorage data:", e)
        }

    let filteredarr = moviesarray.filter(function(movie){
        if (movie.Poster === obj.Poster){
            return false
        } else {
            return true
        }
    })
    localStorage.setItem("movies", JSON.stringify(filteredarr))
    console.log(filteredarr)
}