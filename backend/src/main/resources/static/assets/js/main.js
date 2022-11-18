window.onload = () => {
  const main = document.querySelector("main");

  //* 경로에 맞는 콘텐츠 렌더
  const renderContents = () => {
    const { pathname } = window.location;
    switch (pathname) {
      case "/some":
        main.innerHTML = "<div><button type='button'>move to /some</button></div>";

        const button = document.querySelector("button");
        button.addEventListener("click", () => {
          const targetUrl = "/any";
          const { pathname, search } = window.location;

          //* 같은 URL 은 스택에 추가하지 않는다
          if (targetUrl === `${pathname}${search}`) {
            return;
          }

          const locationChangeEvent = new CustomEvent("locationchange", {
            composed: true,
            detail: { href: targetUrl },
          });

          //* 주소변경 이벤트 Dispatch
          window.dispatchEvent(locationChangeEvent);
        });
        break;
      case "/any":
        console.log("any");
        break;
      default:
        main.innerHTML = "<div>404</div>";
    }
  };

  const handleLocationChange = (e) => {
    const { href } = e.detail;

    //* 주소변경
    window.history.pushState(undefined, "타이틀", href);
    //* 콘텐츠 렌더링
    renderContents();
  };

  //* locationchange 이벤트리스너
  window.addEventListener("locationchange", handleLocationChange);

  main.innerHTML = "<div><button type='button'>move to /some</button></div>";

  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    const targetUrl = "/some?foo=bar";
    const { pathname, search } = window.location;

    //* 같은 URL 은 스택에 추가하지 않는다
    if (targetUrl === `${pathname}${search}`) {
      return;
    }

    const locationChangeEvent = new CustomEvent("locationchange", {
      composed: true,
      detail: { href: targetUrl },
    });

    //* 주소변경 이벤트 Dispatch
    window.dispatchEvent(locationChangeEvent);
  });

  window.addEventListener("popstate", () => {
    renderContents();
  });
};
