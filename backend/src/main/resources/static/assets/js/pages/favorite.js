export default function FavoritePage({ $app }) {
  this.$target = document.createElement("section");
  this.$target.className = "col-lg-8 mx-auto p-4 mt-5";
  this.$target.id = "page";

  this.render = () => {
    this.$target.innerHTML = `
		<form id="roi-form" class="row col-md-12 justify-content-center mb-2" method="POST" action="">
			<h1 class="text-center">관심 지역</h1>
			<div class="form-group col-md-2">
				<select class="form-select bg-secondary text-light" id="sido" name="sido" form="roi-form">
					<option value="sido">시도선택</option>
				</select>
			</div>
			<div class="form-group col-md-2">
				<select class="form-select bg-secondary text-light" id="gugun" name="gugun" form="roi-form">
					<option value="gugun">구군선택</option>
				</select>
			</div>
			<div class="form-group col-md-2">
				<select class="form-select bg-secondary text-light" id="dong" name="dong" form="roi-form">
					<option value="dong">동선택</option>
				</select>
			</div>
			<div class="form-group col-md-2">
				<button class="btn btn-outline-dark">추가</button>
			</div>
		</form>
		<table class="table">
			<thead>
				<tr>
					<th>시도</th>
					<th>구군</th>
					<th>동</th>
					<th>삭제</th>
				</tr>
			</thead>
			<tbody>
					<tr>
						<td>경기도</td>
						<td>구군</td>
						<td>동이름</td>
						<td><button class="btn btn-outline-dark">삭제</button></td>
				</c:forEach>
			</tbody>
		</table>
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
}

/*
	<script>
		function addRoi() {
			let roiForm = document.querySelector("#roi-form");
			roiForm.setAttribute("action", "${root}/roi?action=insertroi&user_id=${loginUser.id}");
			let dongSel = document.querySelector("#dong");
			let regCode = dongSel[dongSel.selectedIndex].value;
			
			roiForm.submit();
		}
		function deleteRoi(dongCode) {
			let roiForm = document.querySelector("#roi-form");
			roiForm.setAttribute("action", "${root}/roi?action=delroi&user_id=${loginUser.id}&dongCode=" + dongCode);
			roiForm.submit();
		}
	</script>
*/
