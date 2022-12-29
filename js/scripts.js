alert('Hello family');
// added favorite food

let pokemonList =[]





for (let i=0; i< pokemonList.length;i++) {
  if (pokemonList[i].height >= 7) {
      document.write (pokemonList[i].name + "(height:" + pokemonList[i].height + "m) - Wow, that is big!" + "<br>")
  } else if (pokemonList[i].height >= 4 && pokemonList[i].height < 6) {
      document.write (pokemonList[i].name + "(height:" + pokemonList[i].height + " m ) - Wow, that is big!" + "<br>")
  } else {
      document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + " m ) - This is small Pokemon "+" <br>")
  }
}



