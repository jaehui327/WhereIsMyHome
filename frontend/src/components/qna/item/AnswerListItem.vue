<template>
  <b-list-group-item>
    <b-row class="p-3 text-muted">
      <span>{{ userId }} | {{ createTime }}</span>
    </b-row>
    <b-row class="p-3">
      <b-form-textarea v-model="answerContent" rows="5" v-if="isModify"></b-form-textarea>
      <div v-else>{{ content }}</div>
    </b-row>
    <b-row class="justify-content-end" v-if="isLogin && userInfo.id === userId">
      <b-button class="m-1" @click="modify">
        <b-icon icon="pencil-square" style="width: 24px; height: 24px" />
      </b-button>
      <b-button class="m-1" @click="remove">
        <b-icon icon="trash" style="width: 24px; height: 24px" />
      </b-button>
    </b-row>
  </b-list-group-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";
const answerStore = "answerStore";

export default {
  name: "AnswerListItem",
  data() {
    return {
      isModify: false,
      answerContent: "",
    };
  },
  created() {
    this.answerContent = this.content;
  },
  props: {
    answerNo: Number,
    questionNo: Number,
    userId: String,
    content: String,
    createTime: String,
    like: Number,
  },
  computed: {
    ...mapGetters(userStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(answerStore, ["removeAnswer", "modifyAnswer"]),
    remove() {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removeAnswer({ questionNo: this.questionNo, answerNo: this.answerNo }).then(() =>
          alert("삭제되었습니다.")
        );
      }
    },
    modify() {
      if (this.isModify) {
        this.modifyAnswer({
          questionNo: this.questionNo,
          answerNo: this.answerNo,
          content: this.answerContent,
        }).then(() => {
          this.isModify = false;
          alert("수정되었습니다.");
        });
      } else {
        this.isModify = true;
      }
    },
  },
};
</script>

<style></style>
