<template>
  <section class="p-4">
    <b-container>
      <b-row>
        <b-col>
          <div class="m-2">
            <h3>공지사항</h3>
            <b-list-group>
              <b-list-group-item
                v-for="notice in noticeList"
                :key="notice.no"
                :to="'/notice/view/' + notice.no"
              >
                {{ notice.title }}
              </b-list-group-item>
            </b-list-group>
          </div>
          <hr />
          <div id="carousel" @click="openInNewTab">
            <h3>부동산 뉴스</h3>
            <b-carousel
              id="news-carousel"
              :interval="4000"
              v-model="slide"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
            >
              <b-carousel-slide
                img-blank
                img-alt="Blank image"
                v-for="(news, index) in newsList"
                :key="index"
              >
                <p>{{ news.title | filter }}</p>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>
        <b-col>
          <div class="m-2">
            <h3>최근 질문</h3>
            <b-list-group>
              <b-list-group-item
                v-for="question in questionList"
                :key="question.no"
                :to="'/qna/view/' + question.no"
              >
                {{ question.title }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const newsStore = "newsStore";
const questionStore = "questionStore";
const noticeStore = "noticeStore";

export default {
  name: "HomeView",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  filters: {
    filter(str) {
      return str
        .replaceAll("&quot;", "")
        .replaceAll("<b>", "")
        .replaceAll("</b>", "")
        .replaceAll("&apos;", "");
    },
  },

  computed: {
    ...mapGetters(newsStore, ["newsList"]),
    ...mapGetters(questionStore, ["questionList"]),
    ...mapGetters(noticeStore, ["noticeList"]),
  },
  methods: {
    ...mapActions(newsStore, ["crawlNewsList"]),
    ...mapActions(questionStore, ["getQuestionList"]),
    ...mapActions(noticeStore, ["getNoticeList"]),
    openInNewTab() {
      console.log(this.newsList[this.slide]);
      const tab = window.open(this.newsList[this.slide].link, "_blank");
      tab.focus();
    },
  },
  created() {
    this.crawlNewsList();
    this.getQuestionList({
      pg: 1,
      spp: 10,
      key: null,
      word: null,
    });
    this.getNoticeList({
      pg: 1,
      spp: 5,
      key: null,
      word: null,
    });
  },
};
</script>

<style scoped>
#carousel:hover {
  cursor: pointer;
}
</style>
