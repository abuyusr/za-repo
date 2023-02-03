let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let pokemonListEl = $(".pokemon-list");
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let listItem = $('<li class= " list-group-item"></li>');
    let button = $(
      '<button class = "pokemon-button btn btn-warning" data-target="#pokemon-modal" data-toggle="modal">' +
        pokemon.name +
        "</button>"
    );
    listItem.append(button);
    pokemonListEl.append(listItem);
    button.on("click", function () {
      showDetails(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
        });
      })
      ["catch"](function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(type => type.type.name);
        item.abilities = details.abilities.map(
          abilities => abilities.ability.name
        );
      })
      ["catch"](function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalBody.empty();
    modalTitle.text(pokemon.name);
    let height = $("<p>" + "Height: " + pokemon.height + "</p>");
    let image = $(
      '<img class = "pokemon-img" src = " ' + pokemon.imageUrl + '" />'
    );
    let types = $("<p>" + "Types: " + pokemon.types + "</p>");
    let abilities = $("<p>" + "abilities: " + pokemon.abilities + "</p>");
    modalBody.append(image);
    modalBody.append(height);
    modalBody.append(types);
    modalBody.append(abilities);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
