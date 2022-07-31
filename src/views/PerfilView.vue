<template>
  <div class="container column is-two-fifths">
    <div id="background-photo">
      <img src="https://bulma.io/images/placeholders/128x128.png" />
    </div>
    <div class="icon-container">
      <figure>
        <p class="image is-128x128">
          <img
            class="is-rounded"
            id="icon"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </p>
      </figure>
      <div>
        <a class="button is-link">Seguir</a>
      </div>
    </div>

    <div class="container-info mt-4">
      <div>
        <p class="is-size-5">
          <strong>{{ user.name }}</strong>
        </p>
        <small>@{{ user.user_name }}</small>
      </div>
    </div>

    <div class="follower">
      <p><strong>123</strong> seguidores</p>
      <p><strong>90</strong> seguindo</p>
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
      .get(`https://clonebookapi.herokuapp.com/post/user/${this.user.id}`, req)
      .then((posts) => {
        this.posts = posts.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      posts: [],
      content: "",
      user: {},
    };
  },
  components: {
    PostContainer,
  },
};
</script>

<style scoped>
.my-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#background-photo {
  width: 100%;
  height: 12rem;
}
#background-photo img {
  width: 100vw;
  border-radius: 0.5rem;
  height: 12rem;
}
.icon-container {
  margin-top: -4rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#icon {
  border: 1px solid #f5f5f5;
}
.container-info {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.follower {
  padding: 20px 50px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>