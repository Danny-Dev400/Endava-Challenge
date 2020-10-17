cajaPrueba = document.getElementById("prueba");

function GetDataBase(){
    fetch('/dataset/DataSetMovies.json')
        .then(respuesta => respuesta.json())
        .then(respuesta => console.log(respuesta[5]))
}

function GetAPI(){
    fetch('https://api.themoviedb.org/3/movie/11862?api_key=cccf6d802f33c1dec9387157095de579')
        .then(respuest => respuest.json())
        .then(respuest => console.log(respuest))
}
GetDataBase();
GetAPI()