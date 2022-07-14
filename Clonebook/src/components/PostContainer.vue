<template>
  <div class="box mb-4">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Image"
          />
        </figure>
      </div>
      <div class="media-content block">
        <div class="content">
          <div>
            <strong>{{ name }}</strong> <small>@{{ userName }}</small>
            <small> - {{ time(datetime) }}</small>
            <p style="margin-top: 8px">{{ post }}</p>
          </div>
        </div>
        <nav class="level is-mobile is-flex">
          <div class="level-left is-justify-content-end is-align-items-center">
            <a class="level-item" aria-label="like">
              <span class="icon is-small">
                <font-awesome-icon icon="fa-solid fa-heart" />
              </span>
            </a>
            <label style="font-size: 12px" class="mr-3">{{ likes }}</label>

            <a class="level-item" aria-label="comment">
              <span class="icon is-small">
                <font-awesome-icon icon="fa-solid fa-comment" />
              </span>
            </a>
            <label style="font-size: 12px">10</label>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostContainer",
  props: {
    name: String,
    userName: String,
    post: String,
    likes: Number,
    datetime: String,
  },
  methods: {
    time(datetime) {
      let postDatetime = datetime;
      // 2022-07-09T21:02:34.000Z
      let data = postDatetime.split("T")[0];
      let hora = postDatetime.split("T")[1];

      let horaFormatada = hora.split(".")[0];

      let horaCerta = horaFormatada.split(":")[0] - 3;
      let minutes = horaFormatada.split(":")[1];
      let seconds = horaFormatada.split(":")[2];

      let year = data.split("-")[0];
      let month = data.split("-")[1];
      let day = data.split("-")[2];

      let dataFormatada = `${year}${month}${day} ${horaCerta}:${minutes}:${seconds}`;
      
      return moment(dataFormatada, "YYYYMMDD hh:mm:ss").fromNow()
    },
  },
};
</script>

<style scoped>
</style>
