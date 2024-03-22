const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImg = document.querySelector('.pokemon__image')

const classForm = document.querySelector('.form')
const input = document.querySelector('.input__search')

const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando..."
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Pokemon inválido';
        pokemonNumber.innerHTML = '';
    }
}

classForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    renderPokemon(input.value.toLowerCase())
})

prevBtn.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

nextBtn.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)