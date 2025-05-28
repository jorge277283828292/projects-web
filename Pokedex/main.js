const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = []; // Guardamos los Pokémon en memoria

async function fetchPokemon() {
    for (let i = 1; i <= 1025; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();
        allPokemon.push(data);
        mostrarPokemon(data);
    }
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    let pokeID = poke.id.toString().padStart(4, "0"); // Optimización

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon_id_back">#${pokeID}</p>
        <div class="pokemonImagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemonInfo">
            <div class="nombreContenedor">
                <p id="pokemonID">#${pokeID}</p>
                <h2 class="pokemonNombre">${poke.name}</h2>
            </div>
            <div class="pokemonTipos">${tipos}</div>
            <div class="pokemonStats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}Kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonID = event.currentTarget.id; 
    listaPokemon.innerHTML = "";

    const filtrados = botonID === "ver-todos"
        ? allPokemon
        : allPokemon.filter(poke => poke.types.some(type => type.type.name === botonID));

    filtrados.forEach(mostrarPokemon);
}));

fetchPokemon();
