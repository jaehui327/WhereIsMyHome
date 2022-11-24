import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/notice",
    name: "notice",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/NoticeView.vue"),
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "noticelist",
        component: () => import("@/components/notice/NoticeList"),
      },
      {
        path: "view/:no",
        name: "noticedetail",
        component: () => import("@/components/notice/NoticeDetail"),
      },
      {
        path: "edit",
        name: "noticeedit",
        component: () => import("@/components/notice/NoticeEdit"),
      },
      {
        path: "update",
        name: "noticeupdate",
        component: () => import("@/components/notice/NoticeUpdate"),
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/QnAView"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "questionlist",
        component: () => import("@/components/qna/QuestionList"),
      },
      {
        path: "view/:no",
        name: "questiondetail",
        component: () => import("@/components/qna/QuestionDetail"),
      },
      {
        path: "edit",
        name: "qestionedit",
        component: () => import("@/components/qna/QuestionEdit"),
      },
      {
        path: "edit/:no",
        name: "qnamodify",
        component: () => import("@/components/qna/QuestionEdit"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView"),
    children: [
      {
        path: "login",
        name: "userlogin",
        component: () => import("@/components/user/UserLogin"),
      },
      {
        path: "register",
        name: "userregister",
        component: () => import("@/components/user/UserRegister"),
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/MapView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
