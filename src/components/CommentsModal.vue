<template>
  <div class="box box-modal">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <strong>{{ user.name }}</strong> <br />
          <small>{{ time(createdAt) }}</small>
          <div class="content">
            {{ content }}
          </div>
          <div class="infos-post">
            <a class="level-item" aria-label="like">
              <span class="icon is-small">
                <font-awesome-icon icon="fa-solid fa-heart" />
              </span>
            </a>
            <label style="font-size: 12px" class="mr-3">0</label>

            <a class="level-item" aria-label="comment">
              <span class="icon is-small">
                <font-awesome-icon icon="fa-solid fa-comment" />
              </span>
            </a>
            <label style="font-size: 12px">0</label>
          </div>
        </div>

        <div v-for="comment in comments" :key="comment.id">
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Sean Brown</strong>
                  <br />
                  <!-- Texto do comentário -->
                  {{ comment.content }}
                  <br />
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-solid fa-heart" />
                  </span>
                  · <a>Reply</a> · 2 hrs
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </article>

    <article class="media">
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
              placeholder="Escrever comentário..."
              v-model="commentContent"
            ></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button @click="comentar" class="button is-link">
              Postar comentário
            </button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
// import moment from "moment";
import axios from "axios";

export default {
  created() {
    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("https://clonebookapi.herokuapp.com/post/" + this.postId, req)
      .then((res) => {
        this.comments = res.data.comments;
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      commentContent: "",
      comments: [],
    };
  },
  name: "PostModal",
  props: {
    user: Object,
    postId: Number,
    content: String,
    createdAt: String,
  },
  methods: {
    comentar() {
      let req = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post(
          "https://clonebookapi.herokuapp.com/comment",
          {
            content: this.commentContent,
            userId: localStorage.getItem("id"),
            postId: this.postId,
          },
          req
        )
        .then(() => {
          this.commentContent = "";
          axios
            .get("https://clonebookapi.herokuapp.com/post/" + this.postId, req)
            .then((res) => {
              this.comments = res.data.comments;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    time(datetime) {
      let postDatetime = datetime;
      // 2022-07-09T21:02:34.000Z
      let data = postDatetime.split("T")[0];
      let hora = postDatetime.split("T")[1];

      let horaFormatada = hora.split(".")[0];

      let horaCerta = horaFormatada.split(":")[0];
      let minutes = horaFormatada.split(":")[1];
      let seconds = horaFormatada.split(":")[2];

      let year = data.split("-")[0];
      let month = data.split("-")[1];
      let day = data.split("-")[2];

      let dataFormatada = `${year}-${month}-${day} ${horaCerta}:${minutes}:${seconds}`;
      // let dataCerta = moment(dataFormatada).subtract(3, "hours");

      return dataFormatada;
    },
  },
};
</script>

<style>
.background {
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: #ffffff;
}

.content {
  margin: 0.5rem;
}

.infos-post {
  display: flex;
  justify-content: center;
}

.infos-post a {
  margin: 0 5px;
}

@media screen and (max-width: 768px) {
  .box-modal {
    margin: 0 1rem;
  }
}
</style>