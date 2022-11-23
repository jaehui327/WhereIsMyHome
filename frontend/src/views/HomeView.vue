<template>
  <section>홈</section>
</template>

<script>
import { doCrawlNews } from "@/api/news";
export default {
  name: "HomeView",
  created() {
    doCrawlNews(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped></style>
