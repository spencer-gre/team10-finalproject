<script>
  import hangman from './assets/hangman.png'
  let letters1 = ['A','B','C','D','E','F','G'];
  let letters2 = ['H','I','J','K','L','M','N'];
  let letters3 = ['O','P','Q','R','S','T','U'];
  let letters4 = ['V','W','X','Y','Z'];
  let letters = [letters1, letters2, letters3, letters4];
  async function postTest() {
      const json = {},
            body = JSON.stringify(json)

      const response = await fetch( "/", {
        method: "POST",
        body
      })
      const text = await response.text()
      console.log(text)
    }

    async function getTest() {
      const response = await fetch( "/", {
        method: "GET"
      })
      const text = await response.text()
      console.log(text)
    }


    const clickButton = function(button) {

    }
</script>


<main>
    <body>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 class="my-0 mr-md-auto font-weight-normal">WPI Games</h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <a class="p-2 text-dark" href="#">User: Joshua Cuneo</a>
        </nav>
        <a class="btn btn-outline-primary" href="../login.html">Log Out</a>
      </div>





      <div class="text-center">
        <h1 class="display-4">Hangman</h1>
      </div>


      <div class="text-center">
        <img src={hangman} class="img-thumbnail" alt="Hangman person" width="200" height="200">

        <div class="btn-group" role="group" aria-label="Basic example">
        {#each letters as letterList}
          <div class="btn-group-vertical" role="group" aria-label="Basic example">
            {#each letterList as letter}
              <button type="button" class="btn btn-primary" id="letter{letter}" on:click={() => clickButton(letter)}>{letter}</button>
            {/each}
          </div>
        {/each}
      </div>


      </div>


      <!-- Bootstrap core JavaScript
      ================================================== -->
      <!-- Placed at the end of the document so the pages load faster -->
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

























<!-- <style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->
