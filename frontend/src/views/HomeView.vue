<template>
  <section class="p-4">
    <b-container>
      <b-row>
        <b-col>
          <div class="m-2">
            <h3>공지사항</h3>
            <b-list-group>
              <b-list-group-item
                class="d-flex justify-content-between"
                v-for="notice in noticeList"
                :key="notice.no"
                :to="'/notice/view/' + notice.no"
              >
                <div>
                  {{ notice.title }}
                </div>
                <div>
                  {{ notice.noticeTime }}
                </div>
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
              <b-carousel-slide v-for="(news, index) in newsList" :key="index">
                <template #img>
                  <div class="text-center" style="height: 60px">
                    <h4>{{ news.title | filter }}</h4>
                  </div>
                  <img
                    class="d-block img-fluid w-100"
                    style="width: 240px; height: 180px"
                    :src="images[index] ? images[index].imgSrc : ''"
                    alt="image slot"
                  />
                </template>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>
        <b-col>
          <div class="m-2">
            <h3>최근 질문</h3>
            <b-list-group>
              <b-list-group-item
                class="d-flex justify-content-between"
                v-for="question in questionList"
                :key="question.no"
                :to="'/qna/view/' + question.no"
              >
                <div>
                  {{ question.title }}
                </div>
                <div>
                  {{ question.createTime }}
                </div>
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
      images: [],
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
    for (let i = 0; i < 10; i++) {
      this.images.push({
        imgSrc: require(`@/assets/news/${Math.floor(Math.random() * 10) + 1}.png`),
      });
    }
  },
};
</script>

<style scoped>
#carousel:hover {
  cursor: pointer;
}
</style>
