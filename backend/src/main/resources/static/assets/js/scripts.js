let markerArray = [];
let container = document.getElementById("map");
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
// /////////////////////// select box 설정 (지역, 매매기간) /////////////////////////
// /////////////////////// 아파트 매매 정보 /////////////////////////
document.querySelector("#list-btn").addEventListener("click", function () {
  let url = "./homedeal";
  let dongSel = document.querySelector("#dong");
  let regcode = dongSel[dongSel.selectedIndex].value;
  let yearSel = document.querySelector("#year");
  let year = yearSel[yearSel.selectedIndex].value;
  let monthSel = document.querySelector("#month");
  let month = monthSel[monthSel.selectedIndex].value;
  if (!regcode) {
    alert("주소 선택해주세요.");
    return;
  }
  if (!year) {
    alert("년 정보를 선택해주세요.");
    return;
  }
  if (!month) {
    alert("월 정보를 선택해주세요.");
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      regcode: regcode,
      year: year,
      month: month,
    }),
  })
    .then((response) => response.json())
    .then((data) => setHouseDealData(data));
});

function setHouseDealData(data) {
  page = 1;
  line = 1;
  homeDealArray = data;
  pageIdx = 0;
  pages = [];
  numPages = Math.ceil(data.length / limit);
  let idx = 0;
  for (let i = 1; i <= numPages; i++) {
    if (i % 5 === 1) {
      pages.push([]);
    }
    pages[idx].push(i);
    if (i % 5 === 0) {
      idx++;
    }
  }
  makeList();
  markerArray.forEach((m) => {
    m.setMap(null);
  });
  markerArray = [];

  data.forEach((homedeal) => {
    let coords = new kakao.maps.LatLng(homedeal.lat, homedeal.lng);
    let marker = new kakao.maps.Marker({
      map: map,
      position: coords,
    });
    // 인포윈도우로 장소에 대한 설명을 표시합니다
    let infowindow = new kakao.maps.InfoWindow({
      content: `<div style="width:150px;text-align:center;padding:6px 0;">${homedeal.apartmentName}</div>`,
    });
    kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.open(map, marker);
    });
    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
    markerArray.push(marker);
    map.setCenter(coords);
  });
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(LatLng, message, markerImage) {
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map,
    position: LatLng,
  });
  var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  let winfowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });
  // 인포윈도우를 마커위에 표시합니다
  // infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(LatLng);

  // 마커에 마우스오버 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "mouseover", function () {
    // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
  });

  // 마커에 마우스아웃 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "mouseout", function () {
    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    infowindow.close();
  });
}

function makeList() {
  let tbody = document.querySelector("#aptlist");
  initTable();
  let offset = (page - 1) * limit;
  homeDealArray.slice(offset, offset + limit).forEach((homedeal) => {
    let tr = document.createElement("tr");
    tr.innerHTML = ` 
		<td>${homedeal.apartmentName}</td> 
		<td>${homedeal.address}</td> 
		<td>${homedeal.dongName}</td> 
		<td>${homedeal.dealAmount}</td> 
		`;
    tbody.appendChild(tr);
    tr.addEventListener("click", function () {
      let coords = new kakao.maps.LatLng(homedeal.lat, homedeal.lng);
      map.setCenter(coords);
      let detail = document.querySelector("#aptdetail");

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
  let apt_pagination = document.querySelector("#apt-pagination-list");
  let apt_pagination_list = ``;
  if (pages[line - 1] === undefined) {
    alert("거래 정보가 없습니다.");
  } else {
    pages[line - 1].forEach((i) => {
      apt_pagination_list += `
				<button
				id="apt-pagination-btn-${i}"
				type="button"
				class="btn btn-outline-dark d-block mx-auto apt-pagination-btn"
				onclick="move(${line},${i})"
				>
				${i}
				</button>
				`;
    });
    apt_pagination.innerHTML = apt_pagination_list;
    const next = document.querySelector("#apt-pagination-btn-" + page);
    next.style.backgroundColor = "#000000";
    next.style.color = "white";
  }
}

function move(l, p) {
  if (l > 0 && l <= pages.length) {
    if (page % 5 === 0 && p === page + 1) {
      line++;
    } else if (page % 5 === 1 && p === page - 1) {
      line--;
    } else {
      line = l;
    }
  }
  if (p > 0 && p <= numPages) {
    page = p;
  }
  makeList();
}

function initTable() {
  let tbody = document.querySelector("#aptlist");
  let len = tbody.rows.length;
  for (let i = len - 1; i >= 0; i--) {
    tbody.deleteRow(i);
  }
}

function modalOpen() {
  let modal = document.querySelector("#modal-overlay");
  modal.style.display = "block";
  let dongSel = document.querySelector("#dong");
  let regcode = dongSel[dongSel.selectedIndex].value;
  fetch("./homedeal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      regcode: regcode,
    }),
  })
    .then((response) => response.json())
    .then((data) => setGraph(data));
}

function modalClose() {
  console.log("test");
  let modal = document.querySelector("#modal-overlay");
  modal.style.display = "none";
}

function setGraph(data) {
  let monthData = [];
  let datasets = [];
  let labels = [];
  data.forEach((homedeal) => {
    let month = homedeal.dealYear + "-" + homedeal.dealMonth;
    if (monthData[month] === undefined) {
      monthData[month] = [];
      labels.push(month);
    }
    monthData[month].push(homedeal);
  });
  labels.sort(function (a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  });

  labels.forEach((month) => {
    let sum = 0;
    monthData[month].forEach((homedeal) => {
      sum += Number(homedeal.dealAmount.replace(",", ""));
    });
    datasets.push(Number((sum / monthData[month].length).toFixed(2)));
  });

  console.log(typeof datasets[0]);
  console.log(datasets);
  new Chart(document.getElementById("modal-graph"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "월별 거래 금액",
          data: datasets,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMax: 80000, // minimum will be 0, unless there is a lower value.
              beginAtZero: true, // minimum value will be 0.
            },
          },
        ],
      },
    },
  });
}
