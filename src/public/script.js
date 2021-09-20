const imgUrl = 'https://image.tmdb.org/t/p/w500/'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
var selectedGenre = []

getMovies()
function getMovie(id){
    fetch(`/movie/${id}`).then(res => res.json().then(data =>{
        showMovie(data)
    }))
}
function getMovies(){
    fetch('/movies').then(res => res.json().then(data =>{
        showMovies(data.results)
    }))
}
function searchMovies(query){
    fetch(`/movies/:${query}`).then(res => res.json().then(data =>{
        showMovies(data.results)
    }))
}

setGenre()
function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else {
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highligthSelection()
        });
        tagsEl.append(t);
    })
}

function highligthSelection() {
    const tags = document.querySelectorAll('tag')
    tags.forEach(tag => {
        tag.classList.remove('highligth')
    })
    cleatBtn()
    if(selectedGenre.legth != 0){
            selectedGenre.forEach(id => {
                const highligthedTag = document.getElementById(id);
                highligthedTag.classList.add('highligth');
            })
        }
}

function cleatBtn() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        cleatBtn.classList.add('highligth')
    }else{

    let clear = document.createElement('div');
    clear.classList.add('tag', 'highligth');
    clear.id = 'clear';
    clear.innerText = 'Clear x ';
    clear.addEventListener('click', () => {
        selectedGenre = [];
        setGenre();
        getMovies(API_URL);
    })
    tagsEl.append(clear);
    }

}

function showMovies(data){
    console.log(data);
    main.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,id} = movie;
        const movieElm = document.createElement('div');
        movieElm.classList.add('movie');
        movieElm.innerHTML = `
        <a >
            <img src="${imgUrl+poster_path}" alt="${title}">
        </a>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Sinopse</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieElm)
        movieElm.addEventListener("click",()=>{
            console.log(`clicked ${id}`);
            getMovie(id)
        })
    })
}

function showMovie(data){
    console.log(data);
    const {title, poster_path, vote_average, overview, homepage ,genres, original_title} = data;
    main.innerHTML = `
    <div>
        <img src="${imgUrl+poster_path}" alt="${title}">
        <div class="movie-info">
        <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview_mov">
        <h2>${title}</h2>
        <h3>${original_title}</h3>
        <h3>Sinopse</h3>
        ${overview}
        <h4>Mais informações:
        <a href='${homepage}'>${homepage}<a/>
        <h4>
        <h4><a href="index.html">VOLTAR</a></h4>
        </div>     
    </div>
    `
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchTerm = search.value;
    if (searchTerm) {
        searchMovies(searchTerm)
    }else{
        getMovies(API_URL)
    }
})