const dataSet = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchBtn = document.getElementById("search-button");
const input = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const image = document.getElementById("spin-image");
const types = document.getElementById("types");

const fetchData = async () => {
  try {
    const res = await fetch(dataSet);
    const data = await res.json();
    findId(data.results);
  } catch (err) {
    console.log(err);
  }
};

const cleanHTML = () =>{
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  hp.innerText =  "";
  attack.innerText =  "";
  defense.innerText =  "";
  specialAttack.innerText =  "";
  specialDefense.innerText =  "";
  speed.innerText =  "";
  image.innerHTML =  "";
  types.innerHTML = "";
}

const findId = async (data) => {
  
  cleanHTML();

  const [ids, names, urls] = [data.map(({ id }) => id), data.map(({ name }) => name), data.map(({ url }) => url)];

  const inputValue = input.value;
  const intInput = parseInt(inputValue);
  const lowerInput = inputValue.toLowerCase();
  const stringIndex = names.indexOf(lowerInput);

  if(intInput && intInput < 1026){
    pokemonName.innerText = names[intInput-1].toUpperCase();
    pokemonId.innerText = `#${ids[intInput-1]}`;
    const pokemonUrl = await fetch(urls[intInput-1]);
    const pokemonUrl2 = await pokemonUrl.json();
    weight.innerText = `Weight: ${pokemonUrl2.weight}`;
    height.innerText = `Height: ${pokemonUrl2.height}`;
    const stats = pokemonUrl2.stats;
    hp.innerText = stats[0].base_stat;
    attack.innerText = stats[1].base_stat;
    defense.innerText = stats[2].base_stat;
    specialAttack.innerText = stats[3].base_stat;
    specialDefense.innerText = stats[4].base_stat;
    speed.innerText = stats[5].base_stat;
    image.innerHTML = `<img id="sprite" src="${pokemonUrl2.sprites.front_default}" data-front="${pokemonUrl2.sprites.front_default}" data-back="${pokemonUrl2.sprites.back_default}">`;
    pokemonUrl2.types.forEach((type) =>{
      types.innerHTML +=`<div class="types" id="${type.type.name}"> ${type.type.name.toUpperCase()}</div>`});
      flipSide();
  } 
  else if(names.indexOf(lowerInput)!== -1) 
  {
    pokemonName.innerText = names[stringIndex].toUpperCase();
    pokemonId.innerText = `#${ids[stringIndex]}`;
    const pokemonUrl = await fetch(urls[stringIndex]);
    const pokemonUrl2 = await pokemonUrl.json();
    weight.innerText = `Weight: ${pokemonUrl2.weight}`;
    height.innerText = `Height: ${pokemonUrl2.height}`;
    const stats = pokemonUrl2.stats;
    hp.innerText = stats[0].base_stat;
    attack.innerText = stats[1].base_stat;
    defense.innerText = stats[2].base_stat;
    specialAttack.innerText = stats[3].base_stat;
    specialDefense.innerText = stats[4].base_stat;
    speed.innerText = stats[5].base_stat;
    image.innerHTML = `<img id="sprite" src="${pokemonUrl2.sprites.front_default}" data-front="${pokemonUrl2.sprites.front_default}" data-back="${pokemonUrl2.sprites.back_default}">`;
    pokemonUrl2.types.forEach((type) =>{
      types.innerHTML +=`<div class="types" id="${type.type.name}"> ${type.type.name.toUpperCase()}</div>`});
      flipSide();
  } else {
    alert("Pokémon not found");
  }
}

const flipSide = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) {
    sprite.addEventListener("mouseover", () => {
      sprite.src = sprite.dataset.back; 
    });

    sprite.addEventListener("mouseout", () => {
      sprite.src = sprite.dataset.front; 
    });
  }
};


searchBtn.addEventListener("click",fetchData);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});
