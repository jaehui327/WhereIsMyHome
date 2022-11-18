import ViewModel from "../viewmodel/viewmodel.js";

export default function RegisterPage({ $app, initialState }) {
  this.$target = document.createElement("section");
  this.$target.className = "py-5";
  this.$target.id = "page";

  this.state = initialState;

  this.viewModel = new ViewModel();

  const init = async () => {
    this.render();
    await this.setEvent();
    this.setState("role", "user");
  };

  this.setState = async (key, nextState) => {
    this.state[key] = nextState;
  };

  this.render = () => {
    this.$target.innerHTML = `
    <div class="container px-4 px-lg-5 mt-5">
      <div class="card h-75 col-sm-4 login-form">
        <div class="card-body p-4">
          <div class="text-center">
            <h2>회원가입</h2>
            <label for="register-id" class="col-sm-3">ID</label>
            <input type="text" id="register-id" name="id" class="col-sm-8" /><br /><br />
            <label for="register-pw" class="col-sm-3">Password</label>
            <input
              type="password"
              id="register-pw"
              name="pw"
              class="col-sm-8"
            /><br /><br />
            <label for="register-name" class="col-sm-3">Name</label>
            <input
              type="text"
              id="register-name"
              name="name"
              class="col-sm-8"
            /><br /><br />
            <label for="register-addr" class="col-sm-3">Address</label>
            <input
              type="text"
              id="register-addr"
              name="address"
              class="col-sm-8"
            /><br /><br />
            <label for="register-tel" class="col-sm-3">Tel</label>
            <input type="tel" id="register-tel" name="phone" class="col-sm-8" placeholder="01012345678"/><br /><br />
            <input type="radio" name="role" value="user" id="radio-user" style="width:30px;" checked>
            <label for="radio-user">User</label>
            <input type="radio" name="role" value="admin" id="radio-admin" style="width:30px;">
            <label for="radio-admin">Admin</label>
          </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
          <button id="register-btn" class="btn-outline-dark btn">Register</button>
        </div>
      </div>
    </div>
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.setEvent = () => {
    const idBox = document.querySelector("#register-id");
    idBox.addEventListener("change", (e) => {
      this.setState("id", e.target.value);
    });
    const pwBox = document.querySelector("#register-pw");
    pwBox.addEventListener("change", (e) => {
      this.setState("pw", e.target.value);
    });
    const nameBox = document.querySelector("#register-name");
    nameBox.addEventListener("change", (e) => {
      this.setState("name", e.target.value);
    });
    const addrBox = document.querySelector("#register-addr");
    addrBox.addEventListener("change", (e) => {
      this.setState("addr", e.target.value);
    });
    const telBox = document.querySelector("#register-tel");
    telBox.addEventListener("change", (e) => {
      this.setState("tel", e.target.value);
    });
    const userRadioBtn = document.querySelector("#radio-user");
    userRadioBtn.addEventListener("click", (e) => {
      this.setState("role", e.target.value);
      console.log(this.state);
    });
    const adminRadioBtn = document.querySelector("#radio-admin");
    adminRadioBtn.addEventListener("click", (e) => {
      this.setState("role", e.target.value);
      console.log(this.state);
    });
    const registerBtn = document.querySelector("#register-btn");
    registerBtn.addEventListener("click", async () => {
      const status = await this.viewModel.register({
        id: this.state["id"],
        pw: this.state["pw"],
        name: this.state["name"],
        address: this.state["addr"],
        phone: this.state["tel"],
        role: this.state["role"],
      });
      console.log(status);
      console.log(typeof status);
      if (status === 201) {
        location.href = "/login";
      }
    });
  };
  init();
}
