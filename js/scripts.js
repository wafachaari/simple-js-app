

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

 return{add:add,
 getAll:getAll
};
})();

 pokemonRepository.add(  { name: 'Bulbasaur',  height: 0.7, type: ['grass', 'poison'] });
 console.log(pokemonRepository.getAll());

//// IIFE function with loop to pokemonList array

(function () {
 pokemonRepository.getAll().forEach(function(pokemon) {
  document.write( pokemon.name + ' height:'+  pokemon.height  );
  if(pokemon.height > 1.0){
  document.write(' --- that\'s pretty tall' + '<br>') ;
}
else { document.write ("<br/>");    }
});
})();
