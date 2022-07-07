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
            <small> - {{ datetime }}</small>
            <p style="margin-top: 8px">{{ post }}</p>
          </div>
        </div>
        <nav class="level is-mobile is-flex ">
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
            <label style="font-size: 12px" >10</label>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "PostContainer",
  props: {
    name: String,
    userName: String,
    post: String,
    likes: Number,
    datetime: String,
  },
};
</script>

<style scoped>
</style>
