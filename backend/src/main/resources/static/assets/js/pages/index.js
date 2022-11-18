import ViewModel from "../viewmodel/viewmodel.js";

export default function IndexPage({ $app, initialState }) {
  this.$target = document.createElement("div");
  this.$target.id = "page";

  this.state = initialState;

  this.viewModel = new ViewModel();

  const init = async () => {
    const data = await this.viewModel.getSido();
    this.setState("date", new Date());
    this.setState("sido", data);
    this.render();
    this.sidoBind();
    this.yearBind();
    this.mapBind();
    await this.setEvent();

    this.setState("page", 1);
    this.setState("pages", []);
    this.setState("line", 1);
    this.setState("numPages", 10);
    this.setState("limit", 10);

    this.setState("marker", []);
  };
  init();

  this.setState = async (key, nextState) => {
    this.state[key] = nextState;
  };

  this.render = () => {
    this.$target.innerHTML = `
		<!-- Modal -->
		<div id="modal-overlay" style="display:none;">
			<div id="modal-window" class="card text-center col-md-6">
				<div class="card-body">		
					<h1>월별 평균 거래 금액</h1>
					<canvas id="modal-graph" style="display:block;"></canvas>
					<button id="modal-close" class="btn btn-outline-dark" onclick="modalClose()">닫기</button>
				</div>
			</div>
		</div>
		<!-- Section-->
		<section class="py-5">
			<div class="container px-4 px-lg-5 mt-5">
				<div id="input">
					<h2 class="text-center mt-5 mb-3">아파트 매매 정보</h2>
					<div class="row col-md-12 justify-content-center mb-2">
						<div class="form-group col-md-2">
							<select class="form-select bg-secondary text-light" id="sido">
								<option value="">시도선택</option>
							</select>
						</div>
						<div class="form-group col-md-2">
							<select class="form-select bg-secondary text-light" id="gugun">
								<option value="">구군선택</option>
							</select>
						</div>
						<div class="form-group col-md-2">
							<select class="form-select bg-secondary text-light" id="dong">
								<option value="">동선택</option>
							</select>
						</div>
						<div class="form-group col-md-2">
							<select class="form-select bg-dark text-light" id="year">
								<option value="">매매년도선택</option>
							</select>
						</div>
						<div class="form-group col-md-2">
							<select class="form-select bg-dark text-light" id="month">
								<option value="">매매월선택</option>
							</select>
						</div>
						<div class="form-group col-md-2">
							<button type="button" id="homedealBtn" class="btn btn-success w-100">
								<i class="fa-sharp fa-solid fa-magnifying-glass"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<br />
			<div id="map-info" class="d-flex flex-row justify-content-center">
				<div class="card col-md-3">
					<div class="card-body">
						<h4 class="col-md-8" style="display: inline-block;">거래 정보</h4>
						<button id="deal-month-avg" class="btn btn-outline-dark" onclick="modalOpen()">월별 평균</button>
						<hr class="my-2" />
						<table class="table">
							<thead>
								<tr>
									<th>아파트명</th>
									<th>도로명</th>
									<th>법정동</th>
									<th>거래금액</th>
								</tr>
							</thead>
							<tbody id="aptlist"></tbody>
						</table>
						<div id="apt-pagination" class="d-flex justify-content-evenly">
							<button
								id="apt-pagination-to-first"
								class="btn btn-outline-dark col-md-2"
							>
								First
							</button>
							<button
								id="apt-pagination-to-left"
								class="btn btn-outline-dark col-md-1"
							>
								<
							</button>
							<div id="apt-pagination-list" class="d-flex justify-content-evenly"></div>
							<button
								id="apt-pagination-to-right"
								class="btn btn-outline-dark col-md-1"
							>
								>
							</button>
							<button
								id="apt-pagination-to-last"
								class="btn btn-outline-dark col-md-2"
							>
								Last
							</button>
						</div>
					</div>
				</div>
				<div class="card col-md-5">
					<div class="card-body">
						<h4>지도</h4>
						<hr class="my-2" />
						<div id="map" style="width: 100%; height: 700px"></div>
					</div>
				</div>
				<div class="card col-md-3">
					<div class="card-body">
						<h4>상세 정보</h4>
						<hr class="my-2" />
						<div id="aptdetail" class="card-body"></div>
					</div>
				</div>
			</div>
		</section>`;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.setEvent = () => {
    const sidoSelector = document.querySelector("#sido");
    sidoSelector.addEventListener("change", async () => {
      if (sidoSelector[sidoSelector.selectedIndex].value) {
        const sido = sidoSelector[sidoSelector.selectedIndex].value.substr(0, 2);
        const data = await this.viewModel.getGugun(sido);
        this.setState("gugun", data);
        this.gugunBind();
      }
    });

    const gugunSelector = document.querySelector("#gugun");
    gugunSelector.addEventListener("change", async () => {
      if (gugunSelector[gugunSelector.selectedIndex].value) {
        const gugun = gugunSelector[gugunSelector.selectedIndex].value.substr(0, 5);
        const data = await this.viewModel.getDong(gugun);
        this.setState("dong", data);
        this.dongBind();
      }
    });

    const dongSelector = document.querySelector("#dong");
    dongSelector.addEventListener("change", () => {
      if (dongSelector[dongSelector.selectedIndex].value) {
        const regcode = dongSelector[dongSelector.selectedIndex].value;
        this.setState("regcode", regcode);
      }
    });

    const yearSelector = document.querySelector("#year");
    yearSelector.addEventListener("change", () => {
      if (yearSelector[yearSelector.selectedIndex].value) {
        this.setState("year", yearSelector[yearSelector.selectedIndex].value);
        this.setState("month", undefined);
        this.monthBind();
      }
    });

    const monthSelector = document.querySelector("#month");
    monthSelector.addEventListener("change", () => {
      if (monthSelector[monthSelector.selectedIndex].value) {
        this.setState("month", monthSelector[monthSelector.selectedIndex].value);
      }
    });

    const homedealBtn = document.querySelector("#homedealBtn");
    homedealBtn.addEventListener("click", async () => {
      if (!this.state["regcode"] || this.state["regcode"].length === 0) {
        alert("주소를 선택해주세요.");
        return;
      }
      if (!this.state["year"] || this.state["year"].length === 0) {
        alert("년 정보를 선택해주세요.");
        return;
      }
      if (!this.state["month"] || this.state["month"].length === 0) {
        alert("월 정보를 선택해주세요.");
        return;
      }
      const data = await this.viewModel.getHomeDeal(
        this.state["regcode"],
        this.state["year"],
        this.state["month"]
      );
      if (data === "nodata") {
        alert("거래 정보가 없습니다.");
      } else {
        this.setState("homedealData", data);
        this.setState(
          "numPages",
          Math.ceil(this.state["homedealData"].length / this.state["limit"])
        );

        let idx = 0;

        for (let i = 1; i <= this.state["numPages"]; i++) {
          if (i % 5 === 1) {
            this.state["pages"].push([]);
          }
          this.state["pages"][idx].push(i);
          if (i % 5 === 0) {
            idx++;
          }
        }

        this.makeList();
        this.markerBind();
        this.setPaginationEvent();
      }
    });
  };

  this.yearBind = () => {
    const yearSelector = document.querySelector("#year");
    let opt = `<option value="">매매년도선택</option>`;
    let year = this.state["date"].getFullYear();
    for (let i = year; i > year - 20; i--) {
      opt += `<option value=${i}>${i}년</option>`;
    }
    yearSelector.innerHTML = opt;
  };

  this.monthBind = () => {
    const monthSelector = document.querySelector("#month");
    let month = this.state["date"].getMonth() + 1;
    let opt = `<option value="">매매월선택</option>`;
    const yearSelector = document.querySelector("#year");
    let m =
      yearSelector[yearSelector.selectedIndex].value == this.state["date"].getFullYear()
        ? month
        : 13;
    for (let i = 1; i < m; i++) {
      opt += `<option value="${i < 10 ? "0" + i : i}">${i}월</option>`;
    }
    monthSelector.innerHTML = opt;
  };

  this.sidoBind = () => {
    const sidoSelector = document.querySelector("#sido");
    let opt = ``;
    opt += `<option value="">시도선택</option>`;
    if (this.state["sido"]) {
      this.state["sido"].forEach((regcode) => {
        opt += `
					<option value="${regcode.dongCode}">${regcode.sidoName}</option>
				`;
      });
    }
    sidoSelector.innerHTML = opt;
  };
  this.gugunBind = () => {
    const gugunSelector = document.querySelector("#gugun");
    let opt = ``;
    opt += `<option value="">구군선택</option>`;
    if (this.state["gugun"]) {
      this.state["gugun"].forEach((regcode) => {
        if (regcode.gugunName) {
          opt += `
					<option value="${regcode.dongCode}">${regcode.gugunName}</option>
					`;
        }
      });
    }
    gugunSelector.innerHTML = opt;
  };
  this.dongBind = () => {
    const dongSelector = document.querySelector("#dong");
    let opt = ``;
    opt += `<option value="">동선택</option>`;
    if (this.state["dong"]) {
      this.state["dong"].forEach((regcode) => {
        if (regcode.dongName) {
          opt += `
					<option value="${regcode.dongCode}">${regcode.dongName}</option>
					`;
        }
      });
    }
    dongSelector.innerHTML = opt;
  };

  this.mapBind = () => {
    const container = document.querySelector("#map");
    let myLatLng = new kakao.maps.LatLng(37.5012743, 127.039585);
    let options = {
      center: myLatLng,
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를
    // 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        (myLatLng = new kakao.maps.LatLng(lat, lon)), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          (message = '<div style="padding:5px;">나여기있어요</div>'); // 인포윈도우에 표시될 내용입니다
        // 마커와 인포윈도우를 표시합니다
        displayMarker(myLatLng, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      message = "geolocation을 사용할수 없어요..";
      displayMarker(myLatLng, message);
    }
    this.setState("map", map);
  };

  this.markerBind = () => {
    const state = this.state;
    this.state["homedealData"].forEach((homedeal) => {
      const coords = new kakao.maps.LatLng(homedeal.lat, homedeal.lng);
      const marker = new kakao.maps.Marker({
        map: this.state["map"],
        position: coords,
      });
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 0;">${homedeal.apartmentName}</div>`,
      });
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(state["map"], marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
      this.setState("marker", []);
      this.state["marker"].push(marker);
      this.state["map"].setCenter(coords);
      console.log(this.state);
    });
  };

  this.makeList = () => {
    initTable();
    const tbody = document.querySelector("#aptlist");
    let offset = (this.state["page"] - 1) * this.state["limit"];
    console.log("test");
    this.state["homedealData"].slice(offset, offset + this.state["limit"]).forEach((homedeal) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
			<td>${homedeal.apartmentName}</td> 
			<td>${homedeal.address}</td> 
			<td>${homedeal.dongName}</td> 
			<td>${homedeal.dealAmount}</td> 
			`;
      tbody.appendChild(tr);

      tr.addEventListener("click", () => {
        // 카카오 맵 코드 자리

        const detail = document.querySelector("#aptdetail");

        detail.innerHTML = `
				<div class="container"> 
					<div class="row"> 
						<div class="col-md-6">아파트 이름</div>
						<div class="col-md-6">${homedeal.apartmentName}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">주소</div> 
						<div class="col-md-6">${homedeal.address}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">전용면적</div> 
						<div class="col-md-6">${homedeal.area}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">층</div>	
						<div class="col-md-6">${homedeal.floor}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">건축 년도</div> 
						<div class="col-md-6">${homedeal.buildYear}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">거래 금액</div> 
						<div class="col-md-6">${homedeal.dealAmount}</div> 
					</div> 
					<div class="row"> 
						<div class="col-md-6">거래 날짜</div> 
						<div class="col-md-6">${homedeal.dealYear}.${homedeal.dealMonth}.${homedeal.dealDay}</div> 
					</div>
				</div>
				`;
      });
    });

    let aptPagination = document.querySelector("#apt-pagination-list");
    let aptPaginationList = ``;
    if (this.state["pages"][this.state["line"] - 1] === undefined) {
      alert("거래 정보가 없습니다.");
    } else {
      this.state["pages"][this.state["line"] - 1].forEach((i) => {
        aptPaginationList += `
				<button
					id="apt-pagination-btn-${i}"
					type="button"
					class="btn btn-outline-dark d-block mx-auto apt-pagination-btn"
				>
				${i}
				</button>
				`;
      });
      aptPagination.innerHTML = aptPaginationList;
      const next = document.querySelector("#apt-pagination-btn-" + this.state["page"]);
      next.style.backgroundColor = "#000000";
      next.style.color = "white";
    }
  };

  this.setPaginationEvent = () => {
    const firstBtn = document.querySelector("#apt-pagination-to-first");
    firstBtn.addEventListener("click", () => {
      console.log(this.state);
      this.move(1, 1);
    });
    const leftBtn = document.querySelector("#apt-pagination-to-left");
    leftBtn.addEventListener("click", () => {
      this.move(this.state["line"], this.state["page"] - 1);
    });
    const rightBtn = document.querySelector("#apt-pagination-to-right");
    rightBtn.addEventListener("click", () => {
      console.log(this.state);
      this.move(this.state["line"], this.state["page"] + 1);
    });
    const lastBtn = document.querySelector("#apt-pagination-to-last");
    lastBtn.addEventListener("click", () => {
      this.move(this.state["pages"].length, this.state["numPages"]);
    });
  };

  function initTable() {
    let tbody = document.querySelector("#aptlist");
    let len = tbody.rows.length;

    for (let i = len - 1; i >= 0; i--) {
      tbody.deleteRow(i);
    }
  }

  this.move = (l, p) => {
    if (l > 0 && l <= this.state["pages"].length) {
      if (this.state["page"] % 5 === 0 && p === this.state["page"] + 1) {
        this.state["line"]++;
      } else if (this.state["page"] % 5 === 1 && p === page - 1) {
        this.state["line"]--;
      } else {
        this.state["line"] = l;
      }
    }

    if (p > 0 && p <= this.state["numPages"]) {
      this.state["page"] = p;
    }
    this.makeList();
    this.setPaginationEvent();
  };
}
