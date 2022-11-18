export default function Nav({ $app, initialState }) {
  // construtor
  this.state = initialState;

  this.$target = document.createElement("nav");
  this.$target.className = "navbar navbar-expand-lg navbar-light bg-light";

  $app.appendChild(this.$target);
  // end constructor

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href=".">WhereIsMyHome</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/notice">Notice</a>

          </li>
        </ul>
    	<a class="btn btn-outline-dark" href="/login">Login</a> &nbsp;
    	<a class="btn btn-outline-dark" href="/register">Register</a>
      </div>
    </div>`;
  };

  this.render();
}
