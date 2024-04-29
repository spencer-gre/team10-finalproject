<script>
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";

  let user;
  let hangmans = [];
  

  const getUser = async function () {
    const response = await fetch("/auth/user", {
      method: "GET",
    });
    let data = await response.json();
    return data.user;
  };

  const insertHangman = async function(event) {
    event.preventDefault();

    const form = document.getElementById("hangmanForm");
    const word = document.querySelector("#hangmanInputWord"),
      json = { word: word.value },
      body = JSON.stringify(json);
    
    form.reset();

    const response = await fetch ("/hangman/add", {
      method: "POST",
			headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.ok) {
      window.location.reload()
    }
  }

  const removeHangman = async function(event) {
    event.preventDefault();

    const form = document.getElementById("hangmanForm");
    const word = document.querySelector("#hangmanInputWord"),
      json = { word: word.value },
      body = JSON.stringify(json);
    
    form.reset();

    const response = await fetch ("/hangman/remove", {
      method: "POST",
			headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.ok) {
      window.location.reload()
    }
  }

  const getHangmans = async function() {
    const response = await fetch("/hangmanWords", {
      method: "GET",
    });
    let data = await response.json();
    let words = [];
    for (let val of Object.values(data)) {
      words.push(val.word);
    }
    return words;
  }

  onMount(async () => {
    let github = await getUser();
    user = github;
    hangmans = await getHangmans();
    // console.log(hangmans)
    console.log(Object.values(hangmans))
  });
</script>


<main>
    <body>
      <Header authUser={user}/>
   

      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Hangman - Management</h4>
            </div>
            <div class="card-body">
              <p class="mt-3 mb-4">Insert/Remove a Word in The Hangman Word List</p>
              <form id="hangmanForm">
                <div class="form-control">
                  <label for="hangmanInputWord">Input A Word</label>
                  <input type="text" class="form-control" name="hangmanInputWord" id="hangmanInputWord">
                </div>
                <button on:click={insertHangman} type="submit" class="btn btn-lg btn-block btn-primary" value="insert">Insert</button>
                <button on:click={removeHangman} type="submit" class="btn btn-lg btn-block btn-primary" value="remove">Remove</button>
              </form>
            </div>
          </div>
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Hangman - Word List</h4>
            </div>
            <div class="card-body">
              <p class="mt-3 mb-4">List of Hangman Words</p>
              <ul class="list-group">
                {#each Object.values(hangmans) as hangmany}
                  <li class="list-group-item">
                    {hangmany}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
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
