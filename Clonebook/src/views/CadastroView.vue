<template>
  <div class="container column is-two-fifths">
    <div class="box mt-5 has-text-black-bis">
      <h1 class="is-size-2">Cadastro</h1>
      <hr />
      <div class="field">
        <label class="label">Nome de Usuário</label>
        <div class="control">
          <input
            class="input"
            :class="alertUserName"
            type="text"
            placeholder="Digite seu nome de usuário"
            v-model="user_name"
          />
        </div>
        <p class="help is-danger">{{ errorMsg.user_nameError }}</p>
      </div>

      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input
            class="input"
            :class="alertName"
            type="text"
            placeholder="Digite seu nome"
            v-model="name"
          />
        </div>
        <p class="help is-danger">{{ errorMsg.nameError }}</p>
      </div>

      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input
            class="input"
            :class="alertEmail"
            type="email"
            placeholder="Digite seu e-mail"
            v-model="email"
          />
        </div>
        <p class="help is-danger">{{ errorMsg.emailError }}</p>
      </div>

      <div class="field">
        <label class="label">Senha</label>
        <div class="control">
          <input
            class="input"
            :class="alertPassword"
            type="password"
            placeholder="Digite sua senha"
            v-model="password"
          />
        </div>
        <p class="help is-danger">{{ errorMsg.passwordError }}</p>
      </div>
      <hr />
      <div class="field is-offset-one-quarter">
        <div class="control">
          <button @click="register" class="button is-link">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_name: "",
      name: "",
      email: "",
      password: "",
      errorMsg: {
        user_nameError: undefined,
        nameError: undefined,
        emailError: undefined,
        passwordError: undefined,
      },
      alertUserName: undefined,
      alertName: undefined,
      alertEmail: undefined,
      alertPassword: undefined,
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:3000/user", {
          user_name: this.user_name,
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err.response.data.errors)
          this.errorMsg = err.response.data.errors;

          if (this.errorMsg.user_nameError != undefined) {
            this.alertUserName = "is-danger";
          } else {
            this.alertUserName = "is-success";
          }

          if (this.errorMsg.nameError != undefined) {
            this.alertName = "is-danger";
          } else {
            this.alertName = "is-success";
          }

          if (this.errorMsg.emailError != undefined) {
            this.alertEmail = "is-danger";
          } else {
            this.alertEmail = "is-success";
          }

          if (this.errorMsg.passwordError != undefined) {
            this.alertPassword = "is-danger";
          } else {
            this.alertPassword = "is-success";
          }
        });
    },
  },
};
</script>

<style scoped>
body {
  height: 100%;
}
</style>