

// IIFE pokemonRepository
 let pokemonRepository =(function(){
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
   let modalContainer=document.querySelector('#modal-container');

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
   loadDetails(pokemon).then(function (response) {
      showModal(pokemon.name,response[0], response[1], response[2]);
    }) ;
}

//function to create modal containing pokemon details
function showModal(pokemonname,pokemonimg,pokemontype,pokemonheight){

       let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.add("isvisible");
      modalContainer.innerHTML = "";
      // Create modal
      let modal = document.createElement("div");
      modal.classList.add("modal");
      modalContainer.appendChild(modal);
//show pokemon-name
      let h2 = document.createElement("h2");
      h2.classList.add("modal-headline");
      h2.innerText = "name:  " + pokemonname;
      modal.appendChild(h2);
//show pokemon image
    let img = document.createElement("img");
      img.classList.add("modal-image");
      img.setAttribute("src", pokemonimg);
      modal.appendChild(img);

//show pokemon details in table
  let modalDetails = document.createElement("div");
    modalDetails.classList.add("modal-details");
    modal.appendChild(modalDetails);
    let table = document.createElement("table");
    modalDetails.appendChild(table);
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let trTypes = document.createElement("tr");
    tbody.appendChild(trTypes);
    let trHeight = document.createElement("tr");
    tbody.appendChild(trHeight);
       let thTypes = document.createElement("th");
    thTypes.innerHTML = "Types:";
    trTypes.appendChild(thTypes);
    pokemontype.forEach(function (item) {
      let tdTypes = document.createElement("td");
      tdTypes.innerHTML = (item.type.name);
      trTypes.appendChild(tdTypes)
    });
    let thHeight = document.createElement("th");
    thHeight.innerHTML = "Height:";
    trHeight.appendChild(thHeight);
    let tdHeight = document.createElement("td");
    tdHeight.innerHTML = pokemonheight ;
    trHeight.appendChild(tdHeight);
 //create button to close modal
let buttonclose=document.createElement('button');
buttonclose.classList.add('buttoncloseclass');
buttonclose.innerText='close';
modal.appendChild(buttonclose);
buttonclose.addEventListener("click", () => {
    hideModal()
  });
}

//function to hide modal
function hideModal() {
    let modal = document.querySelector("#modal-container");
    modal.classList.remove("isvisible");
    modal.parentElement.appendChild(modal);
  }

  //hide modal when
  window.addEventListener("keydown", (e) => {
     if (e.key === "Escape" && modalContainer.classList.contains("isvisible")) {
       hideModal();
     }
   });
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
            return response.json()
    }).then(function (json) {
      let details = [json.sprites.front_default, json.types,json.height];
      return details;
    }).catch(function (e) {
      console.log(e)
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
 loadDetails: loadDetails,
 showModal:showModal
};
})();

 let displayPokemon = function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
  }).catch(function (e) {
    console.log(e)
  });
};


displayPokemon();
