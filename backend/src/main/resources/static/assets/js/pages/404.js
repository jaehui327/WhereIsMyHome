export default function NotFoundPage({ $app, initialState }) {
  // construtor
  this.state = initialState;

  this.$target = document.createElement("section");
  this.$target.id = "page";
  this.$target.className = "py-5";

  // end constructor

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
    <div class="container px-4 px-lg-5 mt-5">
      <h2>페이지를 찾을 수 없습니다.</h2>
		</div>`;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
}
