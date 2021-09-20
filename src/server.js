const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const obterFilme = require('./filmes')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
 
app.get('/', cors(), async (req, res) => {
    const movies = await obterFilme.getMoviesPlaying();
    res.send(movies)
})

app.get('/movies/:query', cors(), async (req, res) => {
    const movies = await obterFilme.searchMovie(req.params.query);
    res.send(movies)
})

app.get('/movie/:id', cors(), async (req, res) => {
    const movies = await obterFilme.getMovie(req.params.id);
    res.send(movies)
}) 

app.listen(3000)
//app.use(express.static('public'))