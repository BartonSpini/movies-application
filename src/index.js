/**
 * es6 modules and imports
 */
import sayHello from './hello.js';

sayHello('World');

/**
 * require style imports
 */

$(window).on("load", function(){
    //$(".content").hidden;
    $(".content").fadeOut("slow");
});



const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

const movieTitle = document.querySelector(`#title`)
const formRating = document.querySelector(`#rating`)
const thisGenre = document.querySelector(`#genre`)
const formID = document.querySelector(`#formID`)
const insertMovie = document.querySelector(`#insert-movie`);

let refreshMovies = function () {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        insertMovie.innerHTML = ``;
        movies.forEach(({title, rating, id, genre}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            insertMovie.innerHTML += (`
        <tr>
          <td>${title}</td>
          <td>${rating}</td>
          <td>${id}</td>
          <td>${genre}</td>
            <td> <a href ="#" data-id="${id}" class="edit-btn">Edit</a></td>
            <td>  <a href ="#" data-id="${id}" class="del-btn">Delete</a> </td>
        </tr>
            `)
        });

        for (let btn of document.querySelectorAll(".del-btn")) {
            btn.addEventListener("click", function () {
                var id = btn.dataset.id;
                deleteMovie(id).then(function (response) {
                    refreshMovies()
                })
            })
        }

        for (let btn of document.querySelectorAll(".edit-btn")) {
            btn.addEventListener("click", function () {
                var id = btn.dataset.id;
                getMovie(id).then(function ({title, rating, id, genre}) {
                    movieTitle.value = title
                    formRating.value = rating
                    formID.value = id
                    thisGenre.value = genre
                })
            })
        }


    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });

}


let clearForm = function () {
    movieTitle.value = ``
    formRating.value = ``
    formID.value = ``
    thisGenre.value = ``
}
// function SomeDeleteRowFunction(btndel) {
//     if (typeof(btndel) == "object") {
//         $(btndel).closest("tr").remove();
//     } else {
//         return false;
//     }
// }

refreshMovies();
const url = '/api/movies';
$("#btn1").click(function () {
    let NewMovie = {};
    NewMovie.title = $("#movieName").val();
    NewMovie.rating = $('#ratingID1').val();
    postMovie(NewMovie).then((movies) => {
        console.log(movies);
        refreshMovies();
    })
});
//second submit button
$("#btn2").click(function () {
    let editMovie = {};
    editMovie.title = $("#changeMovieName").val();
    editMovie.rating = $('#ratingID2').val();
    editMovie.id = $('#editID').val();
    patchMovie(editMovie, editMovie.id).then((movies) => {
        console.log(movies)
        refreshMovies();
    });
});

//document.getElementById("search-by-title-button").addEventListener("click", postMovie);




const postBtn = document.querySelector('#search-by-title-button');
postBtn.addEventListener('click', () => {
    if (formID.value === "") {
        postMovie({title: movieTitle.value, rating: formRating.value, genre: thisGenre.value}).then((data) => {
            console.log(data);
            clearForm()
            refreshMovies()
        })

    }else {
        patchMovie({title: movieTitle.value, rating: formRating.value, genre: thisGenre.value}, formID.value).then((data) => {
            console.log(data);
            clearForm()
            refreshMovies()
        })
    }
})





// // message and replace it with HTML generated from the json response
// // your code receives 
