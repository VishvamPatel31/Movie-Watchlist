let watchlist = document.getElementById("watchlist")
let emptywatchlist = document.getElementById("emptywatchlist")

function renderWatchlist(){
    let html = ''
    let movies = JSON.parse(localStorage.getItem("movies"))
    if (movies){
        movies.forEach(function(movie){
            html += `
            <div class="movie">
            <image class="movieimg" src="${movie.Poster}"></image>

            <div class="description">

                <div class="section1">
                    <div class="movietitle" id="movietitle">${movie.Title}</div>
                    <image class="staricon" id="staricon" src="/images/staricon.png"></image>
                    <div class="rating" id="rating"> ${movie.Rating}</div>
                </div>

                <div class="section2">

                    <div class="time" id="time">${movie.Time}</div>
                    <div class="genre" id="genre">${movie.Genere}</div>
                    <button class="nodisplay" id="addbutton">
                            <image class="addbuttonimg" src="/images/addicon.png"></image>
                            Watchlist
                    </button>
                    <button class="removebtn" id="removebutton">
                        <image class="removebuttonimg" src="/images/removeicon.png"></image>
                        Remove
                    </button>

                </div>
                
                <div class="section3">
                    <p class="moviedesc clamp">${movie.Plot}</p>
                    <button class="readmore">Read more</button>
                </div>
             
            </div>

        </div>`
        })
    
        if (emptywatchlist && watchlist) {
            emptywatchlist.classList.remove("emptywatchlist")
            emptywatchlist.classList.add("nodisplay")
            watchlist.classList.remove("nodisplay")
            watchlist.classList.add("movies")
            watchlist.innerHTML = html
        }
        
    }

    let toggleread = document.querySelectorAll(".readmore")
    toggleread.forEach(function(btn){
    btn.addEventListener("click", function(e){
            const paragraph = e.target.parentElement.querySelector(".moviedesc")
            const readbtn = e.target
            console.log(paragraph)

            if (paragraph.classList.contains("clamp")) {
                paragraph.classList.remove("clamp")
                readbtn.textContent = "Read less"
            } else {
                paragraph.classList.add("clamp")
                readbtn.textContent = "Read more"
            }
        })
    })


    let removebtns = document.querySelectorAll("#removebutton")
    
    removebtns.forEach(function(btn){
        btn.addEventListener("click", function(e){
            removefromstorage(e)
            let rem = e.target.parentElement.querySelector("#removebutton").classList
            rem.add("nodisplay")
            rem.remove("removebtn")
        })
    })
    
}

renderWatchlist()

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
    renderWatchlist()
}