

let pokemonList = [
  { name: 'Bulbasur', height: 3, types: ['grass', 'poison'] },
  { name: 'Ivysaur', height: 1, types: ['grass', 'psychic'] },
  { name: 'Charmander', height: 1.6, types: ['fire'] },
  { name: 'Bulbasaur',  height: 0.7, type: ['grass', 'poison'] },
 ];
 for (var i = 0; i < pokemonList.length; i++) {
     document.write( pokemonList[i].name + ' height:'+  pokemonList[i].height  );
     //comments on pokemon height
     if(pokemonList[i].height > 1.0){
     document.write(' --- that\'s pretty tall' + '<br>') ;
   }
   else { document.write ("<br/>");    }
}
