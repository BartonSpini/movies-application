/**
 * es6 modules and imports
 */
import sayHello from './hello.js';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie} = require('./api.js');

const movieTitle = document.querySelector(`#title`)
const formRating = document.querySelector(`#rating`)

const insertMovie = document.querySelector(`#insert-movie`);

let refreshMovies = function() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        insertMovie.innerHTML=``;
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            insertMovie.innerHTML+=(`
          <tr>
          <td>${title}</td>
          <td>${rating}</td>
            <td>#button</td>
            </tr>
            `)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}
refreshMovies();

//document.getElementById("search-by-title-button").addEventListener("click", postMovie);

const postBtn = document.querySelector('#search-by-title-button');
postBtn.addEventListener('click', () => {
   postMovie({title: movieTitle.value, rating: formRating.value}).then((data) => {
       console.log(data);
       refreshMovies()
   })
})

// // message and replace it with HTML generated from the json response
// // your code receives 