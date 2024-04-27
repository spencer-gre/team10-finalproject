<script>
  import { onMount } from "svelte";
  import crossword from "./assets/crossword.jpeg";
  import hangman from "./assets/hangman.png";
  import Header from "./lib/Header.svelte";

  let authUser;
  
  async function goToHangman() {
    const res = await fetch('/hangman', {method: "GET"})
    if (res.status == 200) {
      const html = location.replace('../hangman.html');
    }
  }

  async function goToAdmin() {
    const res = await fetch('/admin', {method: "GET"})
    if (res.status == 200) {
      const html = location.replace('../admin.html');
    }
  }

  async function goToCrossword() {
    const res = await fetch('/crossword', {method: "GET"})
    if (res.status == 200) {
      const html = location.replace('../crossword.html');
    }
  }


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
</script>

<main>
  <body>
    <Header authUser={authUser}/>
   

    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Games</h1>
      <p class="lead">Choose a game to learn more about WPI</p>
    </div>

    <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Crossword</h4>
          </div>
          <div class="card-body">
            <img src={crossword} width="200" height="200" />
            <p class="mt-3 mb-4">Guess which WPI word is being used</p>
            <button
              type="button"
              class="btn btn-lg btn-block btn-primary"
              on:click={goToCrossword}>Play now</button
              >Play now</button
            >
            <!--on:click added for testing purposes-->
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Hangman</h4>
          </div>
          <div class="card-body">
            <img src={hangman} width="200" height="200" />
            <p class="mt-3 mb-4">Guess which WPI word is being used</p>
            <button
              type="button"
              class="btn btn-lg btn-block btn-primary"
              on:click={goToHangman}>Play now</button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript - Placed at the end of the document so the pages load faster -->
    <!-- Bootstrap core JavaScript - Placed at the end of the document so the pages load faster -->
    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"
    ></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
    <script src="../../assets/js/vendor/popper.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <script>
      Holder.addTheme("thumb", {
        bg: "#55595c",
        fg: "#eceeef",
        text: "Thumbnail",
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
