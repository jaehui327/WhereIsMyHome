<template>
  <section class="p-5">
    <div class="border-top border-dark px-5 py-2">
      <h2>{{ notice.title }}</h2>
      <b-row class="p-3 text-muted">
        <span>{{ notice.userId }} | {{ notice.noticeTime | dateFormat }}</span>
        <span class="ml-auto">
          <b-icon icon="eye" />
          {{ notice.hit }}
        </span>
      </b-row>
    </div>
    <div class="border-top border-bottom p-5">
      {{ notice.content }}
    </div>
    <br />
    <b-row class="justify-content-end" v-if="isLogin && notice.userId === userInfo.id">
      <b-button @click="remove" variant="danger" class="m-1">삭제</b-button>
    </b-row>

    <b-row class="justify-content-center p-3">
      <b-button class="col-md-2" variant="primary" to="/notice/list">목록</b-button>
    </b-row>
  </section>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";
const noticeStore = "noticeStore";

export default {
  name: "QuestionDetail",
  created() {
    this.getNotice(this.$route.params.no);
    console.log(this.notice);
  },
  filters: {
    dateFormat(createTime) {
      return moment(new Date(createTime)).format("YYYY.MM.DD");
    },
  },
  computed: {
    ...mapGetters(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(noticeStore, ["notice"]),
  },
  methods: {
    ...mapActions(noticeStore, ["getNotice", "removeNotice"]),
    remove() {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removeQnA(this.question.no);
      }
    },
  },
};
</script>

<style></style>
