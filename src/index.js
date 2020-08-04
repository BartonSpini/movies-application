/**
 * es6 modules and imports
 */
import sayHello from './hello.js';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});


//user data appends to api


//When the initial ajax request comes back, remove the "loading..."
// // message and replace it with HTML generated from the json response
// // your code receives 