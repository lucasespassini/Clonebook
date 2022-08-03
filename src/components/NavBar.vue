<template>
  <div class="nav">
    <router-link to="/">
      <a class="logo color">Clonitter</a>
    </router-link>
    <div @click="toggleMenu()" class="menu is-link">
      <span id="cima" class="menu-traco"></span>
      <span id="meio" class="menu-traco"></span>
      <span id="baixo" class="menu-traco"></span>
    </div>
  </div>

  <div @click="toggleMenu()" class="black-sidebar"></div>

  <nav class="sidebar-nav">
    <div class="sidebar-nav-item">
      <router-link to="/">
        <font-awesome-icon icon="fa-solid fa-gear" />
        Configurações
      </router-link>
    </div>
    <div class="sidebar-nav-item">
      <router-link @click="logout" to="/login">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        Sair
      </router-link>
    </div>
  </nav>

  <nav class="bottom-nav">
    <router-link to="/">
      <span class="color bottom-nav-icon">
        <font-awesome-icon class="bottom-nav-icon" icon="fa-solid fa-home" />
      </span>
    </router-link>

    <router-link to="/discover">
      <span class="color">
        <font-awesome-icon
          class="bottom-nav-icon"
          icon="fa-solid fa-magnifying-glass"
        />
      </span>
    </router-link>

    <router-link to="/">
      <span class="color bottom-nav-icon">
        <font-awesome-icon class="bottom-nav-icon" icon="fa-solid fa-bell" />
      </span>
    </router-link>

    <router-link :to="'/perfil/' + this.user.uuid">
      <span class="color">
        <font-awesome-icon class="bottom-nav-icon" icon="fa-solid fa-user" />
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
      const blackSideBar = document.querySelector(".black-sidebar");
      const sideBar = document.querySelector(".sidebar-nav");
      this.menuIsOpen == false
        ? (this.menuIsOpen = true)
        : (this.menuIsOpen = false);

      if (this.menuIsOpen) {
        menu.classList.add("menu-open");
        blackSideBar.style.display = "block";
        setTimeout(() => (blackSideBar.style.opacity = 1), 1);
        sideBar.style.right = "0";
      } else {
        menu.classList.remove("menu-open");
        blackSideBar.style.opacity = 0;
        setTimeout(() => (blackSideBar.style.display = "none"), 300);
        sideBar.style.right = "-50%";
      }
    },
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("id", "");
      localStorage.setItem("uuid", "");
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
  z-index: 1000;
  background-color: #000;
  transition: 0.3s;
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
/* Sidebar Nav */
.black-sidebar {
  display: none;
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 900;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.493);
  transition: 0.3s;
}
.sidebar-nav {
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -50%;
  z-index: 900;
  background-color: #fafaf9;
  box-shadow: -2px 0px 10px -5px #00000093;
  transition: 0.3s;
}
.sidebar-nav-item {
  margin: 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-nav-item a {
  padding: 5px 0;
  font-size: 1.05rem;
  font-weight: 600;
}

/* Nav Bottom */
.bottom-nav {
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
.bottom-nav-icon {
  width: 80px;
  font-size: 1.5rem;
}
</style>
