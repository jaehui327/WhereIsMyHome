export default function NoticeViewPage({ $app, value }) {
  this.$target = document.createElement("section");
  this.$target.className = "col-lg-8 mx-auto p-4 mt-5";
  this.$target.id = "page";

  this.render = () => {
    console.log(value);
    this.$target.innerHTML = `
    <div class="form-group">
      <input id="title" name="title" class="form-control" value="제목" style="font-size:24px;" required readonly />
    </div>
    <br />
    <div class="form-group">
      <textarea id="content" name="content" class="form-control" required readonly rows="8">내용</textarea>
    </div>
    <br />
    <div class="form-group">
      <a type="button" class="btn btn-primary" >수정</a>
      <a type="button" class="btn btn-danger"  >삭제</a>
    </div>
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
}
