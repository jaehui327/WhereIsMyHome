export default function NoticeUpdatePage({ $app }) {
  this.$target = document.createElement("section");
  this.$target.className = "col-lg-8 mx-auto p-4 mt-5";
  this.$target.id = "page";

  this.render = () => {
    this.$target.innerHTML = `
    <h2>공지사항 수정</h2>
		<form action="" method=post>
			<input type="hidden" name="notice_no" value="번호">
			<div class="form-group">
				<input type="text" id="title" name="title" class="form-control" placeholder="제목" value="제목" style="font-size:24px;"/>
			</div>
      <br />
			<div class="form-group mt-3">
				<textarea id="content" name="content" class="form-control" placeholder="내용" rows="8">Content Data</textarea>
			</div>
			<br />
      <div class="form-group text-right">
        <input type="submit" id="modify" class="btn btn-primary" value = "수정">
        <a type="button" id="closeBtn" class="btn btn-danger" href="/notice">닫기</a>
      </div>
    </form>
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
}
