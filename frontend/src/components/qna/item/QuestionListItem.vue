<template>
  <b-tr @click="movePage">
    <b-td>{{ no }}</b-td>
    <b-td>{{ title }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ createTime | dateFormat }}</b-td>
    <b-td>{{ hit }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "QnAListItem",
  props: {
    no: Number,
    title: String,
    userId: String,
    createTime: String,
    hit: Number,
  },
  filters: {
    dateFormat(createTime) {
      return moment(new Date(createTime)).format("YYYY.MM.DD");
    },
  },
  methods: {
    movePage() {
      this.$router.push(`/qna/view/${this.no}`);
    },
  },
};
</script>

<style>
tr:hover {
  cursor: pointer;
}
</style>
