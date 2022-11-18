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
    <b-row class="justify-content-center" v-if="this.$route.params.no === undefined">
      <b-button class="col-md-2">취소</b-button> &nbsp;
      <b-button class="col-md-2" variant="primary" @click="write">글 작성</b-button>
    </b-row>
    <b-row class="justify-content-center" v-else>
      <b-button class="col-md-2">취소</b-button> &nbsp;
      <b-button class="col-md-2" variant="primary" @click="modify">글 수정</b-button>
    </b-row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";
const questionStore = "questionStore";

export default {
  name: "QuestionEdit",
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
    if (this.$route.params.no !== undefined) {
      if (
        this.userInfo.id !== this.question.userId ||
        Number(this.$route.params.no) !== this.question.no
      ) {
        alert("비정상적인 접근입니다.");
        this.$router.push("/qna/list");
      }
      this.title = this.question.title;
      this.content = this.question.content;
    }
  },
  computed: {
    ...mapGetters(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(questionStore, ["question"]),
  },
  methods: {
    ...mapActions(questionStore, ["writeQuestion", "modifyQuestion"]),
    write() {
      if (confirm("작성하시겠습니까?")) {
        this.writeQuestion({
          userId: this.userInfo.id,
          title: this.title,
          content: this.content,
        }).then(() => {
          this.$router.push(`/qna/list`);
        });
      }
    },
    modify() {
      if (confirm("수정하시겠습니까?")) {
        this.modifyQuestion({
          no: this.question.no,
          title: this.title,
          content: this.content,
        }).then(() => {
          this.$router.push(`/qna/view/${this.question.no}`);
        });
      }
    },
  },
};
</script>

<style></style>
