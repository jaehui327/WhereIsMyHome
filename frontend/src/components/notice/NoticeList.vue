<template>
  <section class="p-5">
    <b-row class="m-1">
      <h2 class="p-1">공지사항</h2>
      <div class="ml-auto">
        <b-button variant="primary" to="/notice/edit/" v-if="userInfo.role === 'admin'"
          >작성하기</b-button
        >
      </div>
    </b-row>
    <b-table-simple hover striped responsive class="text-center">
      <b-thead head-variant="dark">
        <b-tr>
          <b-th width="10%">번호</b-th>
          <b-th>제목</b-th>
          <b-th width="20%">등록일</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr @click="movePage(notice.no)" v-for="notice in noticeList" :key="notice.no">
          <b-td>{{ notice.no }}</b-td>
          <b-td>{{ notice.title }}</b-td>
          <b-td>{{ notice.noticeTime | dateFormat }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-pagination v-model="pg" :total-rows="totalCnt" :per-page="spp" align="center"></b-pagination>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

const userStore = "userStore";
const noticeStore = "noticeStore";

export default {
  name: "NoticeList",
  data() {
    return {
      pg: 1,
      spp: 10,
      key: null,
      word: null,
    };
  },
  filters: {
    dateFormat(noticeTime) {
      return moment(new Date(noticeTime)).format("YYYY.MM.DD");
    },
  },
  computed: {
    ...mapGetters(userStore, ["userInfo"]),
    ...mapGetters(noticeStore, ["noticeList", "totalCnt"]),
  },
  watch: {
    pg: "test",
  },
  methods: {
    ...mapActions(noticeStore, ["getNoticeList"]),
    test() {
      this.getNoticeList({
        pg: this.pg,
        spp: this.spp,
        key: this.key,
        word: this.word,
      });
    },
    movePage(no) {
      this.$router.push(`/notice/view/${no}`);
    },
  },
  created() {
    this.getNoticeList({
      pg: this.pg,
      spp: this.spp,
      key: this.key,
      word: this.word,
    });
  },
};
</script>

<style scope>
tr:hover {
  cursor: pointer;
}
</style>
