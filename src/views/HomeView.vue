<template>
  <NavBar />
  <div @mousewheel="hideBottomMenu()" class="container column is-two-fifths">
    <article class="media mt-4 mb-5">
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

    <PostLoader v-if="isLoading == true" />

    <div v-if="postsExists == false">
      <p class="pt-6">Siga alguém para acompanhar alguns posts 😁</p>
      <router-link to="/discover">
        Clique aqui para descobrir alguns amigos
      </router-link>
    </div>
    
    <div v-for="post in posts" :key="post.id">
      <PostContainer
        :postId="post.id"
        :content="post.content"
        :likes="post.likes"
        :createdAt="post.createdAt"
        :comments="post.comments"
        :user="post.user"
      />
    </div>
  </div>
</template>

<script>
import PostContainer from "@/components/PostContainer.vue";
import NavBar from "@/components/NavBar.vue";
import PostLoader from "@/components/PostLoader.vue";
import axios from "axios";

export default {
  created() {
    this.user = {
      id: localStorage.getItem("id"),
      uuid: localStorage.getItem("uuid"),
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
      .get(process.env.VUE_APP_ROOT_API + "/post", req)
      .then((posts) => {
        this.posts = posts.data;
        this.isLoading = false;
        if (posts.data.length == 0) {
          this.postsExists = false
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      isLoading: true,
      postsExists: true,
      posts: [],
      content: "",
      user: {},
      lastScrollPosition: 0,
    };
  },
  methods: {
    hideBottomMenu() {
      const html = document.querySelector("html");
      const bottomMenu = document.querySelector(".nav-bottom");

      let scrollPosition = html.scrollTop;

      if (scrollPosition == 0) {
        bottomMenu.style.bottom = "0px";
      } else if (this.lastScrollPosition <= scrollPosition) {
        bottomMenu.style.bottom = "-65px";
      } else {
        bottomMenu.style.bottom = "0px";
      }

      this.lastScrollPosition = scrollPosition;
    },
    postar() {
      let req = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post(
          "https://clonebookapi.herokuapp.com/post",
          {
            content: this.content,
            userId: this.user.id,
          },
          req
        )
        .then(() => {
          this.content = "";
          axios
            .get("https://clonebookapi.herokuapp.com/post", req)
            .then((posts) => {
              this.posts = posts.data;
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
    PostLoader,
  },
};
</script>

<style scoped>
.media-content {
  padding: 2px;
}
.textarea {
  resize: none;
  background-color: #fafaf9;
  box-shadow: 0px 0px 10px -7px #00000070;
}
.textarea::placeholder {
  color: #666;
}
</style>