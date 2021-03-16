// IIFE pokemonRepository
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  let search = document.querySelector('.search');
  //function to add new pokemon to the list
  function add(pokemon) {
    if (typeof pokemon == 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
      console.log('a new pokemon added');
    } else
      console.log('this is not an object');
  }

  //function to get the list of the pokemon
  function getAll() {
    return pokemonList;
  }

  // Function to create button and display it on the screen
  function addListItem(pokemon) {
    let ulelement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    listItem.classList.add('col-6');
    listItem.classList.add('col-md-4');
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.classList.add('btn-primary');
    button.setAttribute('data-target', '#pokemon-modal');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-bs-name', pokemon.name);
    listItem.appendChild(button);
    ulelement.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  //showdetails of a pokemon when a button clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(response) {
      showModal(pokemon.name, response[0], response[1], response[2]);
    });
  }

  //function to create modal containing pokemon details
  function showModal(pokemonname, pokemonimg, pokemontype, pokemonheight) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    let modalHeader = document.querySelector('.modal-header');
    modalBody.innerHTML = '';
    modalTitle.innerText = pokemonname;
    //
    let modalImg = document.createElement('img');
    modalImg.classList.add('modal-image');
    modalImg.setAttribute('src', pokemonimg);
    modalBody.appendChild(modalImg);
    modalImg.classList.add('img-fluid');
    modalImg.classList.add('mx-1');
    //modalImg.setAttribute('width', '200px');

    //
    let table = document.createElement('table');
    modalBody.appendChild(table);
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    let trTypes = document.createElement('tr');
    tbody.appendChild(trTypes);
    let trHeight = document.createElement('tr');
    tbody.appendChild(trHeight);
    let thTypes = document.createElement('th');
    thTypes.innerHTML = 'Types:';
    trTypes.appendChild(thTypes);
    pokemontype.forEach(function(item) {
      let tdTypes = document.createElement('td');
      tdTypes.innerHTML = item.type.name;
      trTypes.appendChild(tdTypes);
    });
    let thHeight = document.createElement('th');
    thHeight.innerHTML = 'Height:';
    trHeight.appendChild(thHeight);
    let tdHeight = document.createElement('td');
    tdHeight.innerHTML = pokemonheight;
    trHeight.appendChild(tdHeight);
  }

  //function to load pokemon list using fetch
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideLoadingMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,

            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //Function to load more details
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let details = [json.sprites.front_default, json.types, json.height];
        return details;
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  //function to show loading message
  function showLoadingMessage() {}
  //function to hide to loading message
  function hideLoadingMessage() {}

  //search input

  search.addEventListener('input', function() {
    let listallpokemon = document.querySelector('.pokemon-list');
    const li = listallpokemon.querySelectorAll('li');
    let searchvalue = search.value.toUpperCase();
    li.forEach(function(item) {
      console.log(typeof listallpokemon);
      console.log(typeof item.innerText);
      console.log(item.innerText);
      if (item.innerText.toUpperCase().indexOf(searchvalue) > -1) {
        console.log(item.innerText.toUpperCase().indexOf(searchvalue));
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

let displayPokemon = function() {
  pokemonRepository
    .loadList()
    .then(function() {
      pokemonRepository
        .getAll()
        .forEach(pokemon => pokemonRepository.addListItem(pokemon));
    })
    .catch(function(e) {
      console.log(e);
    });
};
displayPokemon();
