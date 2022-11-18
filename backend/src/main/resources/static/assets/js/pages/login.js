import ViewModel from "../viewmodel/viewmodel.js";

export default function LoginPage({ $app, initialState }) {
  this.$target = document.createElement("section");
  this.$target.id = "page";
  this.$target.className = "py-5";
  this.viewModel = new ViewModel();

  this.state = initialState;

  const init = async () => {
    this.render();
    await this.setEvent();
  };
  this.setState = async (key, nextState) => {
    this.state[key] = nextState;
  };

  this.render = () => {
    this.$target.innerHTML = `
    	<div class="container px-4 px-lg-5 mt-5">
			<div
				class="card h-75 col-sm-4 login-form"
			>
				<input type="hidden" name="action" value="login">
				<div class="card-body p-4">
					<div class="text-center">
						<label for="login-id" class="col-sm-3">ID</label>
						<input type="text" id="login-id" name="id" class="col-sm-8" /><br /><br />
						<label for="login-pw" class="col-sm-3">Password</label>
						<input type="password" id="login-pw" name="pw" class="col-sm-8" /><br />
					</div>
				</div>
				<div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
					<button id="login-btn" class="btn-outline-dark btn">Login</button>
				</div>
			</div>
		</div>`;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };
  this.setEvent = () => {
    const idBox = document.querySelector("#login-id");
    idBox.addEventListener("change", (e) => {
      this.setState("id", e.target.value);
    });
    const pwBox = document.querySelector("#login-pw");
    pwBox.addEventListener("change", (e) => {
      this.setState("pw", e.target.value);
    });

    const loginBtn = document.querySelector("#login-btn");
    loginBtn.addEventListener("click", async () => {
      const status = await this.viewModel.login({
        id: this.state["id"],
        pw: this.state["pw"],
      });
      console.log(status);
      if (status === 200) {
        location.href = "/";
      }
    });
  };
  init();
}
