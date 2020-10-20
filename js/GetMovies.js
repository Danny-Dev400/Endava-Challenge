const container_catalogo = document.getElementById("container-peliculas")
const paginas = document.getElementById("paginacion")
const imgSlider = document.getElementById("img-carrusel")
const dataSlider = document.getElementById("dataCarrucel")
const top100 = document.getElementById("Top100")
const slider = document.getElementById("slider")

let paginaActual = 1


function GetMovies(pagActual){
    top100.innerHTML = ``
    let contAux=1;
    fetch('/dataset/DataSetMovies3.json')
        .then(function (response) {
            console.log("Hay data");
            return response.json();
        })
        .then(function (data){
            let cont=0;
            let linkTMDS;
            let poster;
            //console.log('data = ', data);
            container_catalogo.innerHTML = ``;
            for (let i in data){
                console.log(data[i]['movieId'])
                linkTMDS  = GetLinksMovies(data[i]['movieId'])
                linkTMDS.then(function(id){
                    //console.log('data = ', id)
                    poster = GetInfoAPIMovies(id)
                    poster.then(function(dataAPI){
                        //console.log(dataAPI)
                        if (contAux >= 36*(pagActual-1) & contAux < 36*pagActual){
                            container_catalogo.innerHTML += `
                                <div class="flip-card " style="width: 14rem; margin:40px; margin-left:20px; margin-right:20px; background-color:rgba(255, 255, 255, 0); border-radious: 40px;">
                                    <div class="flip-card-inner movie-card" >
                                    <div class="flip-card-front">
                                        <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="Avatar" style="width:100%; ">
                                        <div class="card-body justify-content-center flex" style="margin-left: 5px; padding: 0px; ">
                                            <h5 class="card-title marginAuto">${dataAPI['title']}</h5>
                                        </div>
                                    </div>
                                    <div class="flip-card-back ">
                                        <h1>${dataAPI['title']}</h1> 
                                        <h2>${data[i]['genres'].replace('|',' ').replace('|',' ').replace('|',' ').replace('|',' ')}</h2> 
                                        <p>${dataAPI['overview'].slice(0,500)}</p>
                                        <h2>☆ ${data[i]['rating']} </h2>
                                    </div>
                                    </div>
                                </div>
                            `
                            //console.log(contAux)
                        }
                        contAux+=1
                        
                    })
                })
                    

                
                cont++;
                if (cont >= pagActual*36){
                    break;
                }
            }
            
        })
        .catch(function (err){
            console.log("No se encontro la data");
            console.error(err);
        });
                    
        paginas.innerHTML = `
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a id="${pagActual}" class="page-link" href="#">${pagActual}</a></li>
                    <li class="page-item"><a id="${pagActual+1}" class="page-link" href="#">${pagActual+1}</a></li>
                    <li class="page-item"><a id="${pagActual+2}" class="page-link" href="#">${pagActual+2}</a></li>
                    <li class="page-item"><a id="${pagActual+3}" class="page-link" href="#">${pagActual+3}</a></li>
                    <li class="page-item"><a id="${pagActual+4}" class="page-link" href="#">${pagActual+4}</a></li>
                    <li class="page-item"><a id="${pagActual+5}" class="page-link" href="#">${pagActual+5}</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        `
}

function GetRecomendados(){
    dataSlider.innerHTML=``
    imgSlider.innerHTML = ``
    fetch('/dataset/ratingsOrdenados3.json')
        .then(function(responseL){
            console.log("Hay data");
            return responseL.json();
        })
        .then(function(dataL){
            //console.log(dataL)
            let cont=0
            let otro =0
            for(let i in dataL){
                //console.log(dataL[i])
                linkTMDB = GetLinksMovies(dataL[i]['movieId'])
                linkTMDB.then(function(link){
                    banner = GetInfoAPIMovies(link)
                    banner.then(function(dataAPI){
                        
                        if(otro == 0){
                            //console.log(dataAPI)
                            dataSlider.innerHTML+=`
                                <li data-target="#carouselExampleIndicators" data-slide-to="${otro} class="active""></li>
                            `
                            console.log(otro)

                            imgSlider.innerHTML += `
                                <div class="carousel-item active">
                                    <img class="d-block" style="width: 60%; margin: auto;" src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="First slide">
                                </div>
                            `
                        }else{
                            dataSlider.innerHTML+=`
                                <li data-target="#carouselExampleIndicators" data-slide-to="${otro}"></li>
                            `
                            console.log(otro)

                            imgSlider.innerHTML += `
                                <div class="carousel-item">
                                    <img class="d-block" style="width: 60%; margin: auto;" src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" alt="First slide">
                                </div>
                            `
                        }
                        otro+=1
      
                    })
                })
                cont++
                if(cont >= 5){
                    break;
                }
            }
        })
}

function GetTop100(){
    top100.innerHTML = ``
    container_catalogo.innerHTML = ``

    fetch('/dataset/ratingsOrdenados3.json')
        .then(function(response){
            console.log("Hay data");
            return response.json();
        })
        .then(function(data){
            let cont = 0
            let otroCont = 0
            for(i in data){
                //console.log(data[i])
                let cosa = data[i]['movieId'].toString();
                linkTMDB = GetLinksMovies(cosa);
                linkTMDB.then(function(link){
                    infoApi = GetInfoAPIMovies(link)
                    infoApi.then(function(dataAPI){
                        console.log(data[i])
                        top100.innerHTML += `
                            <div class="movie-Container">
                                <div class="imgTop100">
                                    <img src="${'https://image.tmdb.org/t/p/w500'+dataAPI['poster_path']}" width="100%" alt="">
                                </div>
                                <div class="tags">
                                    <h1> Top ${otroCont+1}: ${dataAPI['title']}</h1>
                                    <h3>Año: ${dataAPI['release_date']}</h3>
                                    <h3>Puntuacion: ${data[otroCont]['rating']}</h3>
                                    <h3>${dataAPI['overview']}</h3>
                                    <h3>generos: ${data[otroCont]['genres']}</h3>
                                </div>
                            </div>
                        `
                        otroCont+=1
                    })
                })
                cont++
                if(cont >= 100){
                    break;
                }
            }
        })
}

function GetLinksMovies(idMovie){
    let link =50;
    return fetch('/dataset/DataSetLinks.json')
        .then(function (response) {
            //console.log("Hay data");
            return response.json();
        })
        .then(function (data){
            console.log(idMovie)
            //console.log('data = ', data[idMovie])
            return data[idMovie]['tmdbId']
        })
}
function GetInfoAPIMovies(idMovieTMDB){
    url = 'https://api.themoviedb.org/3/movie/'+idMovieTMDB.toString()+'?api_key=cccf6d802f33c1dec9387157095de579'
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

GetMovies(1);
//GetLinksMovies("101");
GetRecomendados();
//GetTop100();
