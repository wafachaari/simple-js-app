

let pokemonList = [
  { name: 'Bulbasur', height: 3, types: ['grass', 'poison'] },
  { name: 'Ivysaur', height: 1, types: ['grass', 'psychic'] },
  { name: 'Charmander', height: 1.6, types: ['fire'] },
 ];
 for (var i = 0; i < pokemonList.length; i++) {
     document.write( pokemonList[i].name + ' height:'+  pokemonList[i].height + '<br>' );
}
