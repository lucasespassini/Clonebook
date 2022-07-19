<template>
  <div>
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
          <p>
            <strong>{{ user.name }}</strong>
            <br />
            {{ content }}
            <br />
            <small><a>Like</a> · <a>Reply</a> · {{ time(createdAt) }}</small>
          </p>
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
                  <br />
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
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
            ></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button">Postar comentário</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostModal",
  props: {
    user: Object,
    content: String,
    createdAt: String,
  },
  methods: {
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
      let dataCerta = moment(dataFormatada).subtract(3, "hours");

      return dataCerta;
    },
  },
};
</script>

<style>
textarea {
  resize: none;
}
textarea::placeholder {
  color: #666;
}
</style>