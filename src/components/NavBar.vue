<template>
  <nav @mousewheel="$emit('teste', hideBottomMenu())" class="nav">
    <router-link to="/">
      <a class="logo color">Clonitter</a>
    </router-link>
    <div @click="toggleMenu()" class="menu is-link">
      <span id="cima" class="menu-traco"></span>
      <span id="meio" class="menu-traco"></span>
      <span id="baixo" class="menu-traco"></span>
    </div>
  </nav>

  <nav class="nav-bottom">
    <router-link to="/">
      <span class="color nav-bottom-icon">
        <font-awesome-icon class="nav-bottom-icon" icon="fa-solid fa-home" />
      </span>
    </router-link>

    <router-link to="/discover">
      <span class="color">
        <font-awesome-icon
          class="nav-bottom-icon"
          icon="fa-solid fa-magnifying-glass"
        />
      </span>
    </router-link>

    <router-link to="/">
      <span class="color nav-bottom-icon">
        <font-awesome-icon class="nav-bottom-icon" icon="fa-solid fa-bell" />
      </span>
    </router-link>

    <router-link :to="'/perfil/' + this.user.uuid">
      <span class="color">
        <font-awesome-icon class="nav-bottom-icon" icon="fa-solid fa-user" />
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  created() {
    this.user = {
      id: localStorage.getItem("id"),
      uuid: localStorage.getItem("uuid"),
      user_name: localStorage.getItem("user_name"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    };
  },
  data() {
    return {
      menuIsOpen: false,
      user: {},
    };
  },
  methods: {
    toggleMenu() {
      const menu = document.querySelector(".menu");
      this.menuIsOpen == false
        ? (this.menuIsOpen = true)
        : (this.menuIsOpen = false);

      if (this.menuIsOpen) {
        menu.classList.add("menu-open");
      } else {
        menu.classList.remove("menu-open");
      }
    },
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("id", "");
      localStorage.setItem("user_name", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
    },
  },
};
</script>

<style scoped>
.nav {
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 10px -7px #00000070;
}
.logo {
  padding: 5px 0;
  font-size: 1.7rem;
  font-weight: 900;
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #000;
}
.menu-traco {
  width: 25px;
  height: 2.7px;
  border-radius: 50px;
  background-color: #f5f5f5;
  transition: 0.3s;
}
.menu-traco:not(:last-child) {
  margin-bottom: 5px;
}
.menu-open #cima {
  margin-bottom: -2.7px;
  transform: rotate(135deg);
}
.menu-open #meio {
  margin-bottom: -2.7px;
  opacity: 0;
  transform: rotate(135deg);
}
.menu-open #baixo {
  transform: rotate(-135deg);
}

/* Nav Bottom */
.nav-bottom {
  padding: 15px 0;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #f5f5f5;
  box-shadow: 0px -2px 10px -7px #00000070;
  user-select: none;
  transition: 0.2s;
}
.nav-bottom-icon {
  width: 80px;
  font-size: 1.5rem;
}
</style>
