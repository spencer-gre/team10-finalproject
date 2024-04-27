<script>
  import hangman from './assets/hangman.png'
  import { onMount } from "svelte";
  import Header from './lib/Header.svelte';
  
  let authUser;
  let letters1 = ['A','B','C','D','E','F','G'];
  let letters2 = ['H','I','J','K','L','M','N'];
  let letters3 = ['O','P','Q','R','S','T','U'];
  let letters4 = ['V','W','X','Y','Z'];
  let letters = [letters1, letters2, letters3, letters4];

  let selectedButtons = [];

  let guessWord = "HELLO HELLO";
  let wordArray = [];
  let displayedWord = [];
  
  let limbsCount = 0;

  let hangmanWords = []; // from database

  let endMessage = ""

  let buttonsDisabled = false;

  let limbs = [
        "  ____\n |    |\n |\n |\n |\n_|_",
        "  ____\n |    |\n |    O\n |\n |\n_|_",
        "  ____\n |    |\n |    O\n |    |\n |\n_|_",
        "  ____\n |    |\n |    O\n |   /|\n |\n_|_",
        "  ____\n |    |\n |    O\n |   /|\\\n |\n_|_",
        "  ____\n |    |\n |    O\n |   /|\\\n |   / \n_|_",
        "  ____\n |    |\n |    O\n |   /|\\\n |   / \\\n_|_"
  ];

  const getUser = async function () {
    const response = await fetch("/auth/user", {
      method: "GET",
    });
    let data = await response.json();
    return data.user;
  };

  onMount(async () => {
    let user = await getUser();
    authUser = user;
  });

  // when a button is clicked
  const clickButton = function(event) {
    let letter = event.target.innerText;
    selectedButtons = [...selectedButtons, letter];
    event.target.disabled = true;

    // determine if the letter exists
    let indices = [];
    let index = guessWord.indexOf(letter);

    if(index === -1) {
      limbsCount++;
    } else{
      // determine if there are multiple letters
      while (index !== -1) {
        indices.push(index);
        index = guessWord.indexOf(letter, index + 1);
      }
    }

    // add letters in displayed word if exist
    indices.forEach(index => {
      guessWord
      displayedWord[index] = wordArray[index];      
    });

    // if win
    if(!displayedWord.includes("_")) {
      endMessage = "You Win!";
      buttonsDisabled = true;
    }

    // if lose
    if(limbsCount === 6) {
      endMessage = "You Lose :(";
      buttonsDisabled = true;
    }
  }

  // Getting data from the server
  const getWords = async function() {
    const response = await fetch( "/hangmanWords", {
      method:"GET"
    }).then(async function(response) {
      hangmanWords = JSON.parse(await response.text());
      
      for (let i = 0; i < hangmanWords.length; i++) {
        hangmanWords[i] = hangmanWords[i].word;
      }

      guessWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
      wordArray = guessWord.split("");

      wordArray.forEach(letter => {
        if(letter != " ") {
          displayedWord.push("_");
        } else {
          displayedWord.push("|");
        }
      });
      displayedWord[0] = "_";
    })
  }

  const newWord = function() {
    location.reload();
  }

  getWords();
</script>


<main>
    <body>
      <Header authUser={authUser}/>



      <div class="text-center">
        <h1 class="display-4">Hangman</h1>
      </div>

      <div class="row mb-3 text-center">

        <div class="col-md-4 themed-grid-col">
          <div id="hangman-container">
            <pre>{limbs[limbsCount]}</pre>
          </div>
        </div>
        
        <div class="col-md-4 themed-grid-col">
          <div class="btn-group" role="group" id="hangman-buttons">
          {#each letters as letterList}
            <div class="col-md-3 themed-grid-col">
              <div class="btn-group-vertical" role="group">
                {#each letterList as letter}
                  <button type="button" class="btn btn-primary" disabled={buttonsDisabled} on:click={clickButton}>{letter}</button>
                {/each}
              </div>
            </div>
          {/each}
          </div>
        </div>

        <div class="col-md-4 themed-grid-col">
          <p class="display-5">Guessed Letters</p>
          {#each selectedButtons as button}
            <p>{button}</p>
          {/each}
        </div>

      </div>

      <div class="text-center">
        <p class="display-1">{displayedWord.join(" ")}</p>
        <button type="button" class="btn btn-secondary" on:click={newWord}>New Word</button>
        <p class="display-3">{endMessage}</p>
      </div>

      


      <!-- Bootstrap core JavaScript - Placed at the end of the document so the pages load faster -->
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
      <script src="../../assets/js/vendor/popper.min.js"></script>
      <script src="../../dist/js/bootstrap.min.js"></script>
      <script src="../../assets/js/vendor/holder.min.js"></script>
      <script>
        Holder.addTheme('thumb', {
          bg: '#55595c',
          fg: '#eceeef',
          text: 'Thumbnail'
        });
      </script>
    

  </body>
</main>
