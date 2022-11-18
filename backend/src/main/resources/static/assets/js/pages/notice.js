export default function NoticePage({ $app }) {
  this.$target = document.createElement("section");
  this.$target.className = "container align-middle p-3";
  this.$target.id = "page";

  this.render = () => {
    this.$target.innerHTML = `
		<a type="button" class="btn btn-outline-dark" href="/notice/write">글 쓰기 </a>
		<br />
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">번호</th>
          <th scope="col">작성자</th>
          <th scope="col">제목</th>
          <th scope="col">조회수</th>
          <th scope="col">작성 시간</th>
        </tr>
      </thead>
      <tbody id="noticeBody"></tbody>
      <tr class="text-center">
        <th class="notice-no" scope="row">1</th>
					<td>1</td>
					<td class="notice-title">
						<a class="text-dark" href="/notice/asdf">
              제목
						</a>
					</td>
          <td>1</td>
          <td>시간</td>
				</tr>
		</table>
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
}
