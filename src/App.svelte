<script>
  import { onMount } from "svelte";
  import crossword from "./assets/crossword.jpeg";
  import hangman from "./assets/hangman.png";

  let authUser;
  async function postTest() {
    const json = {},
      body = JSON.stringify(json);

    const response = await fetch("/", {
      method: "POST",
      body,
    });
    const text = await response.text();
    console.log(text);
  }

  async function getTest() {
    const response = await fetch("/", {
      method: "GET",
    });
    const text = await response.text();
    console.log(text);
  }

  async function goToHangman() {
    const res = await fetch('/hangman', {method: "GET"})
    if (res.status == 200) {
      const html = location.replace('../hangman.html');
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
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal">WPI Games</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">User: {authUser}</a>
      </nav>
      <a class="btn btn-outline-primary" href="../login.html">Log Out</a>
    </div>

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
              on:click={getTest}>Play now</button
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
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Other Game</h4>
          </div>
          <div class="card-body">
            <img src={crossword} width="200" height="200" />
            <p class="mt-3 mb-4">Guess which WPI word is being used</p>
            <button type="button" class="btn btn-lg btn-block btn-primary"
              >Play now</button
            >
          </div>
        </div>
      </div>

      <!-- <footer class="pt-4 my-md-5 pt-md-5 border-top">
          <div class="row">
            <div class="col-12 col-md">
              <img class="mb-2" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24">
              <small class="d-block mb-3 text-muted">© 2017-2018</small>
            </div>
            <div class="col-6 col-md">
              <h5>Features</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Cool stuff</a></li>
                <li><a class="text-muted" href="#">Random feature</a></li>
                <li><a class="text-muted" href="#">Team feature</a></li>
                <li><a class="text-muted" href="#">Stuff for developers</a></li>
                <li><a class="text-muted" href="#">Another one</a></li>
                <li><a class="text-muted" href="#">Last time</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Resources</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Resource</a></li>
                <li><a class="text-muted" href="#">Resource name</a></li>
                <li><a class="text-muted" href="#">Another resource</a></li>
                <li><a class="text-muted" href="#">Final resource</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>About</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Team</a></li>
                <li><a class="text-muted" href="#">Locations</a></li>
                <li><a class="text-muted" href="#">Privacy</a></li>
                <li><a class="text-muted" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </footer> -->
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
