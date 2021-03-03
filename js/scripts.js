

// IIFE pokemonRepository
 let pokemonRepository =(function(){
  let pokemonList = [
    { name: 'Bulbasur', height: 3, types: ['grass', 'poison'] },
    { name: 'Ivysaur', height: 1, types: ['grass', 'psychic'] },
    { name: 'Charmander', height: 1.6, types: ['fire'] },
    ];
  function add(pokemon){
    if ((typeof pokemon) == 'object'  &&  (JSON.stringify (Object.keys(pokemon) ) === JSON.stringify( [ 'name', 'height', 'types' ])))
     { pokemonList.push(pokemon);
     console.log('a new pokemon added');
     }
    else console.log('this is not an object');
     }

function getAll(){
  return pokemonList;
}
//
function addListItem(pokemon){let ulelement =document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  ulelement.appendChild(listItem);
  button.addEventListener('click',function(event)
  {
showDetails(pokemon);
  });
  }
//showdetails of a pokemon when a button clicked
function showDetails(pokemon){
console.log(pokemon);
}

 return{add:add,
 getAll:getAll,
 addListItem:addListItem,

};
})();
 pokemonRepository.add( { name: 'Charmander', height: 1.6, types: ['fire'] });
 console.log(pokemonRepository.getAll());

 pokemonRepository.getAll().forEach(function (pokemon) {

  pokemonRepository.addListItem(pokemon);
});
