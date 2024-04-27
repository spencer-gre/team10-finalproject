<script>
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";

  let user;
  

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
      // maybe do something
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
      // maybe do something
    }
  }

  onMount(async () => {
    let github = await getUser();
    user = github;
  });
</script>


<main>
    <body>
      <Header authUser={user}/>
   

      <div class="container">
        <div class="card-deck mb-3 text-center">
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Crossword - Management</h4>
            </div>
            <div class="card-body">
              <p class="mt-3 mb-4">Guess which WPI word is being used</p>
              <button
                type="button"
                class="btn btn-lg btn-block btn-primary"
                >Play now</button
              >
              <!--on:click added for testing purposes-->
            </div>
          </div>
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
