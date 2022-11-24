<template>
  <section class="p-5">
    <div class="border-top border-dark p-3">
      <h2>{{ question.title }}</h2>
      <b-row class="p-3 text-muted">
        <span>{{ question.userId }} | {{ question.createTime | dateFormat }}</span>
        <span class="ml-auto">
          <b-icon icon="eye" />
          {{ question.hit }}
        </span>
      </b-row>
    </div>
    <div class="border-top border-bottom p-5">
      {{ question.content }}
    </div>
    <br />
    <b-row class="justify-content-end" v-if="isLogin && question.userId === userInfo.id">
      <b-button :to="'/qna/edit/' + question.no" variant="primary" class="m-1">수정</b-button>
      <b-button @click="remove" variant="danger" class="m-1">삭제</b-button>
    </b-row>
    <div>
      <b-row class="pl-4 font-weight-bold"
        >총 {{ this.answerList.length }} 개의 답변이 있습니다.</b-row
      >
      <div class="border bg-light p-3">
        <b-form-textarea
          v-model="answer"
          rows="5"
          placeholder="댓글을 입력하세요."
        ></b-form-textarea>
        <b-row class="justify-content-end pt-2 pr-3">
          <b-button @click="write" variant="primary" class="col-md-1">등록</b-button>
        </b-row>
      </div>
      <b-list-group class="mt-4">
        <AnswerListItem
          v-for="answer in answerList"
          :key="answer.no"
          v-bind="answer"
        ></AnswerListItem>
      </b-list-group>
    </div>
    <b-row class="justify-content-center p-3">
      <b-button class="col-md-2" variant="primary" to="/qna/list">목록</b-button>
    </b-row>
  </section>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import AnswerListItem from "@/components/qna/item/AnswerListItem";

const userStore = "userStore";
const questionStore = "questionStore";
const answerStore = "answerStore";

export default {
  components: { AnswerListItem },
  name: "QuestionDetail",
  data() {
    return {
      answer: "",
    };
  },
  created() {
    this.getQuestion(this.$route.params.no);
    this.getAnswerList(this.$route.params.no);
  },
  filters: {
    dateFormat(createTime) {
      return moment(new Date(createTime)).format("YYYY.MM.DD");
    },
  },
  computed: {
    ...mapGetters(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(questionStore, ["question"]),
    ...mapGetters(answerStore, ["answerList"]),
  },
  methods: {
    ...mapActions(questionStore, ["getQuestion", "removeQuestion"]),
    ...mapActions(answerStore, ["getAnswerList", "writeAnswer"]),
    async remove() {
      if (confirm("정말 삭제하시겠습니까?")) {
        const status = await this.removeQuestion(this.question.no);
        if (status === 200) {
          this.$router.push("/qna/list");
        }
      }
    },
    write() {
      if (!this.isLogin) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }
      this.writeAnswer({
        questionNo: this.question.no,
        content: this.answer,
        userId: this.userInfo.id,
      }).then(() => {
        alert("등록되었습니다.");
        this.answer = "";
      });
    },
  },
};
</script>

<style></style>
