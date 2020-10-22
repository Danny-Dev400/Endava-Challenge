const container_catalogo = document.getElementById("container-peliculas")
const paginas = document.getElementById("paginacion")
const imgSlider = document.getElementById("img-carrusel")
const dataSlider = document.getElementById("dataCarrucel")
const top100 = document.getElementById("Top100")
const slider = document.getElementById("slider")
const nombrePelicula = document.getElementById('Name-Movie')

const genres = ["Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","Musical"
                ,"Mystery","Romance","Sci-Fi","Thriller","War","Western"]

let paginaActual = 1

function startPage(){
    getPagina(1)
    getRecomendados()
}
function changePage(pagActual){
    paginaActual = parseInt(pagActual.id)
    getPagina(paginaActual);
}

function getPagina(paginaActual){
    //getRecomendados();
    let infoAPI;
    let movie;
    container_catalogo.innerHTML = ``
    top100.innerHTML = ``
    for(let i=(paginaActual-1)*36; i<paginaActual*36;  i++){
        movie = getMovie(i)
        movie.then(function(dataJson){
            infoAPI = getInfoAPI(dataJson['links'])
            infoAPI.then(function(dataAPI){
                container_catalogo.innerHTML += `
                    <div class="flip-card " style="width: 14rem; margin:40px; margin-left:20px; margin-right:20px; background-color:rgba(255, 255, 255, 0); border-radious: 40px;">
                        <div class="flip-card-inner movie-card" >
                        <div class="flip-card-front">
                            <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="Avatar" style="width:100%; ">
                            <div class="card-body justify-content-center flex" style="margin-left: 5px; padding: 0px; ">
                                <h5 class="card-title card-title2 marginAuto">${dataAPI['title']}</h5>
                            </div>
                        </div>
                        <div class="flip-card-back ">
                            
                            <h1>${dataAPI['title']}</h1> 
                            <h2>${dataJson['genres'].replace('|',' ').replace('|',' ').replace('|',' ').replace('|',' ')}</h2> 
                            <p>${dataAPI['overview'].slice(0,400)}</p>
                            <h2>☆ ${dataJson['rating']} </h2>
                        </div>
                        </div>
                    </div>

                `
            })

        })
    }
    if(paginaActual <=4){
        paginas.innerHTML = `
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a id="1" class="page-link" href="#" onclick="changePage(this)">1</a></li>
                    <li class="page-item"><a id="2" class="page-link" href="#" onclick="changePage(this)">2</a></li>
                    <li class="page-item"><a id="3" class="page-link" href="#" onclick="changePage(this)">3</a></li>
                    <li class="page-item"><a id="4" class="page-link" href="#" onclick="changePage(this)">4</a></li>
                    <li class="page-item"><a id="5" class="page-link" href="#" onclick="changePage(this)">5</a></li>
                    <li class="page-item"><a id="6" class="page-link" href="#" onclick="changePage(this)">6</a></li>
                    <li class="page-item"><a id="36" class="page-link" href="#" onclick="changePage(this)">36</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        `
    }else if(paginaActual >=33){
        paginas.innerHTML = `
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a id="1" class="page-link" href="#" onclick="changePage(this)">1</a></li>
                    <li class="page-item"><a id="31" class="page-link" href="#" onclick="changePage(this)">31</a></li>
                    <li class="page-item"><a id="32" class="page-link" href="#" onclick="changePage(this)">32</a></li>
                    <li class="page-item"><a id="33" class="page-link" href="#" onclick="changePage(this)">33</a></li>
                    <li class="page-item"><a id="34" class="page-link" href="#" onclick="changePage(this)">34</a></li>
                    <li class="page-item"><a id="35" class="page-link" href="#" onclick="changePage(this)">35</a></li>
                    <li class="page-item"><a id="36" class="page-link" href="#" onclick="changePage(this)">36</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        `
    }
    else{
        paginas.innerHTML = `
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a id="1" class="page-link" href="#" onclick="changePage(this)">1</a></li>
                    <li class="page-item"><a id="${paginaActual-2}" class="page-link" href="#" onclick="changePage(this)">${paginaActual-2}</a></li>
                    <li class="page-item"><a id="${paginaActual-1}" class="page-link" href="#" onclick="changePage(this)">${paginaActual-1}</a></li>
                    <li class="page-item"><a id="${paginaActual}" class="page-link" href="#" onclick="changePage(this)">${paginaActual}</a></li>
                    <li class="page-item"><a id="${paginaActual+1}" class="page-link" href="#" onclick="changePage(this)">${paginaActual+1}</a></li>
                    <li class="page-item"><a id="${paginaActual+2}" class="page-link" href="#" onclick="changePage(this)">${paginaActual+2}</a></li>
                    <li class="page-item"><a id="36" class="page-link" href="#" onclick="changePage(this)">36</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        `
    }
    
}

function getTop100(){
    top100.innerHTML = ``
    container_catalogo.innerHTML = ``
    paginas.innerHTML = ``
    let infoAPI;
    let movie;
    for(let i=0; i<100; i++){
        console.log(i)
        movie = getMovie100(i)
        movie.then(function(dataJson){
            infoAPI  = getInfoAPI(dataJson['links'])
            infoAPI.then(function(dataAPI){
                top100.innerHTML += `
                    <div class="movie-Container">
                        <div class="imgTop100">
                            <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" width="100%" alt="">
                        </div>
                        <div class="tags">
                            <h1> Top ${i+1}: ${dataAPI['title']}</h1>
                            <h3> Year: ${dataAPI['release_date']}</h3>
                            <h3> Score: ${dataJson['rating']} ☆</h3>
                            <h3> Synopsis: ${dataAPI['overview']}</h3>
                            <h3>Genres: ${dataJson['genres']}</h3>
                        </div>
                    </div>
                `
            })
        })
    }
}

function getRecomendados(){
    let infoAPI;
    let movie;
    for(let i=0;i<5;i++){
        let numRand = Math.floor(Math.random() * (50 - 0)) + 0;
        movie = getMovie100(numRand)
        movie.then(function(dataJson){
            infoAPI  = getInfoAPI(dataJson['links'])
            infoAPI.then(function(dataAPI){
                if(i == 0){
                    //console.log(dataAPI)
                    dataSlider.innerHTML+=`
                        <li data-target="#carouselExampleIndicators" data-slide-to="${i} class="active""></li>
                    `
                    imgSlider.innerHTML += `
                        <div class="carousel-item active">
                            <img class="d-block" style="width: 60%; margin: auto;" src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="First slide">
                        </div>
                    `
                }else{
                    dataSlider.innerHTML+=`
                        <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
                    `
                    imgSlider.innerHTML += `
                        <div class="carousel-item">
                            <img class="d-block" style="width: 60%; margin: auto;" src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="First slide">
                        </div>
                    `
                }
            })
        })
    }
}

function getMovieSerch(){
    top100.innerHTML = ``
    container_catalogo.innerHTML = ``
    paginas.innerHTML = ``
    let keyWord = nombrePelicula.value
    let infoAPI;
    let movie;
    let index;
    console.log(keyWord)
    for(let i=0;i<1296;i++){
        movie = getMovie(i)
        movie.then(function(dataJson){
            index = dataJson['title'].toLowerCase().indexOf(keyWord.toLowerCase())
            if(index >= 0){
                infoAPI = getInfoAPI(dataJson['links'])
                infoAPI.then(function(dataAPI){
                    console.log('encontre datos')
                    top100.innerHTML += `
                    <div class="movie-Container">
                        <div class="imgTop100">
                            <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" width="100%" alt="">
                        </div>
                        <div class="tags">
                            <h1> Title: ${dataAPI['title']}</h1>
                            <h3> Year: ${dataAPI['release_date']}</h3>
                            <h3> Score: ${dataJson['rating']} ☆</h3>
                            <h3> Synopsis: ${dataAPI['overview']}</h3>
                            <h3>Genres: ${dataJson['genres']}</h3>
                        </div>
                    </div>
                    `
                })
            }

        })
    }
}

function getByGenres(idGenres){
    let keyWord = genres[idGenres]
    top100.innerHTML = ``
    container_catalogo.innerHTML = ``
    paginas.innerHTML = ``
    let infoAPI;
    let movie;
    let index;
    console.log(keyWord)
    cont =0
    for(let i=0;i<1296;i++){
        movie = getMovie(i)
        movie.then(function(dataJson){
            index = dataJson['genres'].toLowerCase().indexOf(keyWord.toLowerCase())
            if(index >= 0  & cont <=50){
                infoAPI = getInfoAPI(dataJson['links'])
                infoAPI.then(function(dataAPI){
                    console.log('encontre datos')
                    top100.innerHTML += `
                    <div class="movie-Container">
                        <div class="imgTop100">
                            <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" width="100%" alt="">
                        </div>
                        <div class="tags">
                            <h1> Title: ${dataAPI['title']}</h1>
                            <h3> Year: ${dataAPI['release_date']}</h3>
                            <h3> Score: ${dataJson['rating']} ☆</h3>
                            <h3> Synopsis: ${dataAPI['overview']}</h3>
                            <h3>Genres: ${dataJson['genres']}</h3>
                        </div>
                    </div>
                    `


                })

                cont ++;
            }

        })
    }
}

function getMovie(idMovie){
    return fetch('/dataset/DataSetMovies4.json')
        .then(function(response){
            //console.log('hay data')
            return response.json()
        })
        .then(function(data){
            //console.log(data[idMovie])
            return data[idMovie]
        })
        .catch(function(err){
            console.log('no se ha encontrado data')
            console.log(err)
        })
}

function getMovie100(idMovie){
    return fetch('/dataset/ratingsOrdenados4.json')
        .then(function(response){
            console.log('hay data')
            return response.json()
        })
        .then(function(data){
            //console.log(data[idMovie])
            return data[idMovie]
        })
        .catch(function(err){
            console.log('no se ha encontrado data')
            console.log(err)
        })
}

function getInfoAPI(idLink){
    url = 'https://api.themoviedb.org/3/movie/'+idLink.toString()+'?api_key=cccf6d802f33c1dec9387157095de579'
    return fetch(url)
        .then(function (response) {
            //console.log("Hay data");
            return response.json();
        })
        .then(function (data){
            //console.log('data = ', data)
            return data
        })
}

//getTop100();