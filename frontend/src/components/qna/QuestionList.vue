<template>
  <section class="p-5">
    <b-row class="m-1">
      <b-form-select
        v-model="key"
        :options="options"
        style="width: 120px"
        class="d-inline-block"
      ></b-form-select>
      <div>
        <b-input-group style="width: 400px">
          <template #append>
            <b-button variant="secondary" @click="test"
              ><b-icon icon="search"></b-icon
            ></b-button>
          </template>
          <b-form-input
            id="type-search"
            placeholder="제목, 작성자, 내용 검색"
            v-model="word"
          ></b-form-input>
        </b-input-group>
      </div>
      <b-button variant="primary" to="/qna/edit/" class="ml-auto"
        >질문하기</b-button
      >
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
        <question-list-item
          v-for="question in questionList"
          :key="question.no"
          v-bind="question"
        />
      </b-tbody>
    </b-table-simple>
    <b-pagination
      v-model="pg"
      :total-rows="totalCnt"
      :per-page="spp"
      align="center"
    ></b-pagination>
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
      pg: 1,
      spp: 5,
      key: null,
      word: null,
      options: [
        { value: null, text: "선택" },
        { value: "title", text: "제목" },
        { value: "user_id", text: "작성자" },
        { value: "content", text: "내용" },
      ],
    };
  },
  computed: {
    ...mapGetters(questionStore, ["questionList", "totalCnt"]),
  },
  watch: {
    pg: "test",
  },
  methods: {
    ...mapActions(questionStore, ["getQuestionList"]),
    test() {
      this.getQuestionList({
        pg: this.pg,
        spp: this.spp,
        key: this.key,
        word: this.word,
      });
    },
  },
  created() {
    this.getQuestionList({
      pg: this.pg,
      spp: this.spp,
      key: this.key,
      word: this.word,
    });
  },
};
</script>

<style scope></style>
