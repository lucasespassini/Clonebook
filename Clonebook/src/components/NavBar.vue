<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 id="logo" class="button is-white is-link is-inverted">Clonebook</h1>
      </a>
      <div class="navbar-burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/"> Home </a>
      
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a
                class="button is-link is-rounded"
                data-social-network="Twitter"
                data-social-action="tweet"
                data-social-target="https://bulma.io"
                target="_blank"
                
              >
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                <span> Tweet </span>
              </a>
            </p>
            <p class="control">
              <a
                class="button is-primary"
                href="/login"
                @click="logout"
              >
                <span class="icon">
                  <i class="fas fa-download"></i>
                </span>
                <span>Sair</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.setItem("token", '')
      localStorage.setItem("id", '')
      localStorage.setItem("user_name", '')
      localStorage.setItem("name", '')
      localStorage.setItem("email", '')
    }
  }
};
</script>

<style>
#logo {
  font-size: 20px;
  font-weight: 900;
}
</style>
