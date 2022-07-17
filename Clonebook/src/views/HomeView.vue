<template>
  <div id="app">
    <NavBar />
    <div class="container column is-two-fifths">
      <article class="media mt-4">
        <figure class="media-left">
          <p class="image is-64x64">
            <img
              class="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea
                class="textarea"
                placeholder="O que está acontecendo?"
                v-model="content"
              ></textarea>
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <a @click="postar" class="button is-link">Tweetar</a>
              </div>
            </div>
          </nav>
        </div>
      </article>

      <hr />
      <div v-for="userPost in usersPosts" :key="userPost.id">
        <PostContainer
          :userName="userPost.user_name"
          :name="userPost.name"
          :posts="userPost.posts"
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
      user_name: localStorage.getItem("user_name"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    };

    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("http://localhost:3000/user", req)
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
      content: "",
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
          content: this.content,
          userId: this.user.id,
        })
        .then(() => {
          this.body = "";
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

<style scoped>
.textarea {
  resize: none;
}
.textarea::placeholder {
  color: #666;
}
</style>