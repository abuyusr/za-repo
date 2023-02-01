alert('Hello world');

let pokemonRepository =(function(){
    let pokemonList =[  ];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    
    function add(pokemon) {
      if ( typeof pokemon === "object" &&
      "name" in pokemon) 
      { pokemonList.push (pokemon);} 
      else {
        console.log (" pokemon is not correct");
      }
              
     }
  
    function getAll() {
      return pokemonList;
    }
   // Added click listeners.
    function addListItem (pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      button.addEventListener('click', function (pokemon) {
      console.log(pokemon);
      });
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener ("click", function (event){
        showDetails (pokemon);
      });
    }
  
    // Add loadList function.
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    // Add loadDetails function.
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
//////////////////////////////////////////////////////////////////////////////////////////////    
    // Showdetail function (1: Edited to open the modal instead of consol log, called showModal function wiht displaying images , height and name.)
    function showDetails(pokemon) {
      loadDetails (pokemon).then (function(){
        showModal ( pokemon.name,
                  pokemon.name + "'s height is :" + pokemon.height, pokemon.imageUrl);
      });
    }
   

    
 ////////////////////////////////////////////////////////////////////////////
    // Adding a showModal function to make the modal interactive.
    // Achieving dynamism of showModal fucntion by editing title and text as paramaters.
    
    function showModal( pokemon) {
       
          let modalBody = document.querySelector (".modal-body");
          let modalTitle = document.querySelector(".modal-title");
         
  
  
          // Emptying previous modal content
          modalTitle.innerHTML = '';
          modalBody.innerHTML = '';


          // Creating a new Div Element and class
            let modal = document.createElement('div');
            modal.classList.add ('modal');

   

            let titleElement = document.createElement('h1');
            titleElement.innerText = title;
            
          
            let contentElement = document.createElement('p');
            contentElement.innerText = text;
            

            let imageElement = document.createElement("img");
              imageElement.setAttribute ("src", img);
              imageElement.setAttribute ("widh", "304");
              imageElement.setAttribute ("height" , "228");
              imageElement.setAttribute ("alt", "The Pokemon picture");


              modalBody.appendChild(titleElement);
              modalBody.appendChild(contentElement);
              modalBody.appendChild(imageElement);
          
        }

        
       
     
       
        /*  let modalBody = document.querySelector (".modal-body");
         let modalTitle = document.querySelector(".modal-title");
         let modalHeader =document.querySelector(".modal-header");


         modalTitle.empty();
         modalBody.empty();

      // Creating a new Div Element and class
      let modal = document.createElement('div');
       modal.classList.add ('modal');

      // Adding closeButton,title and  content inside the modal
      let closeButtonElement = document.createElement ('button');
      closeButtonElement.classList.add ('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener ('click',hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
      
    
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
      

      let imageElement = document.createElement("img");
        imageElement.setAttribute ("src", img);
        imageElement.setAttribute ("widh", "304");
        imageElement.setAttribute ("height" , "228");
        imageElement.setAttribute ("alt", "The Pokemon picture");


      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild (imageElement);
      modalContainer.appendChild(modal);


      modalContainer.classList.add('is-visible');


     // Adding "click" event listener to remove the modal when clicking outside of the modal
       modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
      }
    
      document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
     }); // This will add #show-modal button Event which is "click" and function whichi is "showModal."
  
  // Adding a hideModal function in order to close the modal.
     function hideModal () {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove ('is-visible');
     } */

  // Declaring  ESC keyboard function (This will remove modal by pressing ESC Key) 
     window.addEventListener ('keydown',(e)=> {
      let modalContainer = document.querySelector ('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {hideModal()};
     })
     

   // Added loadList, showDetails and loadDetails returns.
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList:loadList,
      loadDetails: loadDetails,
      showDetails:showDetails,
    
     };
   })();
  
   // used forEach loop to retrieve the pokemonList array.
   // Added loadList and callback function.
   
   pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) { 
      pokemonRepository.addListItem (pokemon);
        
  })
   })