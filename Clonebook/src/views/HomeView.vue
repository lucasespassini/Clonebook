<template>
  <div id="app">
    <NavBar />
    <div class="container column is-two-fifths">
      <p>Home page</p>
      <p>User: {{ user }}</p>

      <input type="text" v-model="body" />
      <button @click="postar">Postar</button>

      <hr />
      <div v-for="userPost in usersPosts" :key="userPost.user_ID">
        <PostContainer
          :userName="userPost.user_USERNAME"
          :name="userPost.user_NAME"
          :post="userPost.post_BODY"
          :likes="userPost.post_LIKES"
          :datetime="userPost.post_DATETIME"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostContainer from "@/components/PostContainer.vue";
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  created() {
    this.user = {
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      userName: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
    };

    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("http://localhost:3000", req)
      .then((usersPosts) => {
        this.usersPosts = usersPosts.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      usersPosts: [],
      body: "",
      user: {},
    };
  },
  methods: {
    postar() {
      let req = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post("http://localhost:3000/post", {
          body: this.body,
          user_id: this.user.id,
        })
        .then(() => {
          axios
            .get("http://localhost:3000", req)
            .then((usersPosts) => {
              this.usersPosts = usersPosts.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => console.log(err));
    },
  },
  name: "HomeView",
  components: {
    PostContainer,
    NavBar,
  },
};
</script>
