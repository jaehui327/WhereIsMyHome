export default function Header({ $app }) {
  this.$target = document.createElement("header");
  this.$target.className = "py-1";

  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
	<div class="container px-4 px-lg-5 my-5">
		<div class="text-center text-white">
			<h1 class="display-4 fw-bolder">Where Is My Home?</h1>
			<p class="lead fw-normal text-white-50 mb-0">Find Your Home</p>
		</div>
	</div>`;
  };

  this.render();
}