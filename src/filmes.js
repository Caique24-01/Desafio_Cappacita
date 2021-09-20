const axios = require('axios');
const API_KEY = 'api_key=68cc2096be2caf3339cfca32eba90cba'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;


async function getMoviesPlaying(){
    try {
        const {data} = await axios.get(API_URL);
        return data
    } catch (error) {
        return (error)
    }
}

async function getMovie(id){
     URL_ID = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    try {
        const {data} = await axios.get(URL_ID);
        return data
    } catch (error) {
        return (error)
    }
}

async function searchMovie(query){
    const URL_QUERY = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=1&include_adult=true`
    try {
        const {data} = await axios.get(URL_QUERY);
        return data
    } catch (error) {
        return (error)
    }
}

module.exports = {getMoviesPlaying, getMovie, searchMovie}