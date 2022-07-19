<template>
  <div>
    <div class="box mb-4" @click="toggleModal()">
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
              <strong>{{ user.name }}</strong>
              <small>@{{ user.user_name }}</small>
              <small> - {{ time(createdAt) }}</small>
              <p style="margin-top: 8px">{{ content }}</p>
            </div>
          </div>
          <nav class="level is-mobile is-flex">
            <div
              class="level-left is-justify-content-end is-align-items-center"
            >
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
              <label style="font-size: 12px">{{ comments.length }}</label>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <!-- Modal -->
    <div class="modal" :class="{ modal: true, 'is-active': showModal }">
      <div class="modal-background" @click="toggleModal()"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <PostModal
          :user="user"
          :content="content"
          :createdAt="createdAt"
        />
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal()"></button>
    </div>
    
  </div>
</template>

<script>
import PostModal from "@/components/PostModal.vue";
import moment from "moment";

export default {
  data() {
    return {
      showModal: false
    };
  },
  name: "PostContainer",
  props: {
    postId: Number,
    content: String,
    likes: Number,
    createdAt: String,
    comments: Array,
    user: Object,
  },
  methods: {
    toggleModal() {
      this.showModal == false ? this.showModal = true : this.showModal = false 
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
      let dataCerta = moment(dataFormatada).subtract(3, "hours");

      return moment(dataCerta, "YYYY-MM-DD hh:mm:ss").fromNow();
    },
  },
  components: {
    PostModal,
  },
};
</script>

<style scoped>
.box {
  cursor: pointer;
}
</style>
