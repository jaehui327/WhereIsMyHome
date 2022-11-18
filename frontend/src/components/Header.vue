<template>
  <header class="py-1">
    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 font-weight-bold">Where Is My Home?</h1>
        <p class="lead fw-normal text-white-50 mb-0">Find Your Home</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
header {
  height: auto;
  background: url("@/assets/songdo.jfif");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
  color: white;
  line-height: 70px;
  padding: 0px 30px;
}
</style>
