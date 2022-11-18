<template>
  <section class="p-5">
    <b-row class="justify-content-end m-1">
      <b-button variant="primary" to="/qna/edit/">질문하기</b-button>
    </b-row>
    <b-table-simple hover striped responsive class="text-center">
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>번호</b-th>
          <b-th>제목</b-th>
          <b-th>작성자</b-th>
          <b-th>날짜</b-th>
          <b-th>조회수</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <question-list-item v-for="question in questionList" :key="question.no" v-bind="question" />
      </b-tbody>
    </b-table-simple>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import QuestionListItem from "@/components/qna/item/QuestionListItem";

const questionStore = "questionStore";

export default {
  components: { QuestionListItem },
  name: "QuestionList",
  data() {
    return {
      fields: ["번호", "제목", "작성자", "날짜", "조회수"],
    };
  },
  computed: {
    ...mapGetters(questionStore, ["questionList"]),
  },
  methods: {
    ...mapActions(questionStore, ["getQuestionList"]),
  },
  created() {
    this.getQuestionList();
  },
};
</script>

<style scope></style>
