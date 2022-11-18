export default function NoticeWritePage({ $app }) {
  this.$target = document.createElement("section");
  this.$target.className = "container py-5";
  this.$target.id = "page";

  this.render = () => {
    this.$target.innerHTML = `
    <h2>공지사항 쓰기</h2>
		<form action="" method=post>
			<input type="hidden" name="writer" value="">
			<div class="form-group">
				<input type="text" id="title" name="title" class="form-control" placeholder="제목" style="font-size:24px;"/>
			</div>
			<br />
			<div class="form-group">
				<textarea id="content" name="content" class="form-control" rows="8" placeholder="내용"></textarea>
			</div>
			<br />
			<div class="form-group text-right">
				<input type="submit" id="noticeInsertBtn" class="btn btn-primary" value ="생성">
				<a type="button" class="btn btn-danger" href="/notice">닫기</a>
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
