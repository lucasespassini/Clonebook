<template>
  <div class="post-loader mt-6 mb-6"></div>
</template>

<script>
export default {
  name: "PostLoader",
}
</script>

<style>
.post-loader {
  display: block;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border-top: 3px solid #1e3a8a;
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: 0.7s spin cubic-bezier(0.85, 0.4, 0.56, 0.65) infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>