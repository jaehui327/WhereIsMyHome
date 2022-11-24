<template>
  <section class="p-5">
    <b-table-simple bordered>
      <b-tbody>
        <b-tr>
          <b-th class="col-md-2">제목</b-th>
          <b-td
            ><b-form-input v-model="title" placeholder="제목을 입력해주세요."></b-form-input
          ></b-td>
        </b-tr>
        <b-tr>
          <b-th>내용</b-th>
          <b-td><b-form-textarea rows="15" v-model="content"></b-form-textarea></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-row class="justify-content-center">
      <b-button class="col-md-2" to="/notice/list">취소</b-button> &nbsp;
      <b-button class="col-md-2" variant="primary" @click="write">글 작성</b-button>
    </b-row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const userStore = "userStore";
const noticeStore = "noticeStore";
export default {
  name: "NoticeEdit",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {
    if (!this.isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      this.$router.push("/user/login");
    }
    if (this.userInfo.role !== "admin") {
      alert("접근 권한이 없습니다.");
      this.$router.push("/user/login");
    }
  },
  computed: {
    ...mapGetters(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(noticeStore, ["notice"]),
  },
  methods: {
    ...mapActions(noticeStore, ["writeNotice"]),
    write() {
      if (confirm("작성하시겠습니까?")) {
        this.writeNotice({
          userId: this.userInfo.id,
          title: this.title,
          content: this.content,
        }).then(() => {
          this.$router.push(`/notice/list`);
        });
      }
    },
  },
};
</script>

<style></style>
