<script>
  import wpi from "./assets/wpi.png";
  function login() {
    const html = location.replace("/auth/github");
  }
</script>

<main>
  <body class="text-center">
    <!-- <img class="mb-4" src="" alt="" width="72" height="72"> -->
    <img src={wpi}/>
    <h1 class="h3 mb-3 font-weight-normal">Welcome to WPI Games!</h1>

    <button class="btn btn-lg btn-block btn-primary" on:click={login}>
      <!-- <a aria-describedby="Enables access to the site by signing in with GitHub." href="/auth/github">Login with GitHub</a> -->
      Login with GitHub
    </button>
  </body>
</main>
