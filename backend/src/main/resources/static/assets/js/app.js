import Nav from "./components/nav.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

import IndexPage from "./pages/index.js";
import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import NotFoundPage from "./pages/404.js";
import NoticePage from "./pages/notice.js";
import NoticeViewPage from "./pages/noticeView.js";
import NoticeWritePage from "./pages/noticeWrite.js";
import UserInfoPage from "./pages/userInfo.js";
import FavoritePage from "./pages/favorite.js";
import NoticeUpdatePage from "./pages/noticeUpdate.js";

window.onload = () => {
  const main = document.querySelector("#app");
  new Nav({
    $app: main,
    initialState: [],
  });
  new Header({
    $app: main,
  });
  //* 경로에 맞는 콘텐츠 렌더
  const renderContents = () => {
    const pathname = "/" + window.location.pathname.split("/")[1];
    switch (pathname) {
      case "/":
        new IndexPage({
          $app: main,
          initialState: [],
        });
        break;
      case "/login":
        new LoginPage({
          $app: main,
          initialState: [],
        });
        break;
      case "/register":
        new RegisterPage({
          $app: main,
          initialState: [],
        });
        break;
      case "/notice":
        const path = window.location.pathname.split("/")[2];
        if (path === "write") {
          new NoticeWritePage({
            $app: main,
          });
        } else if (path === "update") {
          const notice_id = window.location.pathname.split("/")[3];
          new NoticeUpdatePage({
            $app: main,
            value: notice_id,
          });
        } else if (path && path.length !== 0) {
          new NoticeViewPage({
            $app: main,
            value: path,
          });
        } else {
          new NoticePage({
            $app: main,
          });
        }
        break;
      case "/user":
        const id = window.location.pathname.split("/")[2];
        new UserInfoPage({
          $app: main,
          value: id,
        });
        break;
      case "/favorite":
        new FavoritePage({
          $app: main,
        });
        break;
      default:
        new NotFoundPage({
          $app: main,
        });
        break;
    }
  };
  new Footer({
    $app: main,
  });

  const handleLocationChange = (e) => {
    const { href } = e.detail;

    //* 주소변경
    window.history.pushState(undefined, "타이틀", href);
    //* 콘텐츠 렌더링
    renderContents();
  };

  //* locationchange 이벤트리스너
  window.addEventListener("locationchange", handleLocationChange);

  window.addEventListener("popstate", () => {
    renderContents();
  });

  renderContents();
};
