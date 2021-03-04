

// IIFE pokemonRepository
 let pokemonRepository =(function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
//function to add new pokemon to the list
  function add(pokemon){
    if ((typeof pokemon) == 'object'  &&
       "name" in pokemon)
     { pokemonList.push(pokemon);
     console.log('a new pokemon added');
     }
    else console.log('this is not an object');
     }
//function to get the list of the pokemon
function getAll(){
  return pokemonList;
}
// Function to create button and display it on the screen
function addListItem(pokemon){
  let ulelement =document.querySelector(".pokemon-list");
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
pokemonRepository.loadDetails(pokemon).then(function(){
  console.log(pokemon);
})
}
//function to load pokemon list using fetch
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);

      });
    }).catch(function (e) {hideLoadingMessage();
      console.error(e);
    })
  }
  //Function to load more details
function loadDetails(item){
  showLoadingMessage();
   let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) { hideLoadingMessage();
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {hideLoadingMessage();
            console.error(e);
        });
}

//function to show loading message
function showLoadingMessage(){
 let container = document.querySelector('.container');
 let message = document.createElement('p');
 message.innerText = " loading message....";
 container.appendChild(message);
}
//function to hide to loading message
function hideLoadingMessage(){
 let elementToRemove = document.querySelector('p');
 elementToRemove.parentElement.removeChild(elementToRemove);
}

 return{
   add:add,
 getAll:getAll,
 addListItem:addListItem,
 loadList:loadList,
 loadDetails: loadDetails
};
})();


 pokemonRepository.loadList().then(function() {
   pokemonRepository.getAll().forEach(function (pokemon) {
     pokemonRepository.addListItem(pokemon);
});
});
