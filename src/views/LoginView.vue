<template>
  <div class="container column is-two-fifths">
    <div class="box mt-5 has-text-black-bis">
      <h1 class="is-size-2">Login</h1>
      <hr />

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
          <button @click="login" class="button is-link">Entrar</button>
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
      email: "",
      password: "",
      errorMsg: {
        emailError: undefined,
        passwordError: undefined,
      },
      alertEmail: undefined,
      alertPassword: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post("https://clonebookapi.herokuapp.com/user/login", {
          email: this.email,
          password: this.password,
        }) 
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "home" });
        })
        .catch(err => console.log(err))
        // .catch((err) => {
          
        //   this.errorMsg = err.response.data.error;

        //   if (this.errorMsg.emailError != undefined) {
        //     this.alertEmail = "is-danger";
        //   } else {
        //     this.alertEmail = "is-success";
        //   }

        //   if (
        //     this.errorMsg.passwordError != undefined ||
        //     this.errorMsg.emailError === "O usuário não existe!"
        //   ) {
        //     this.alertPassword = "is-danger";
        //   } else {
        //     this.alertPassword = "is-success";
        //   }
        // });
    },
  },
};
</script>
