export default function Footer({ $app }) {
  this.$target = document.createElement("footer");

  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
		<section class="contact-section">
			<div class="container px-4 px-lg-5">
				<div class="row gx-4 gx-lg-5">
					<div class="col-md-4 mb-3 mb-md-0">
						<div class="card py-4 h-10">
							<div class="card-body text-center">
								<i class="fa-solid fa-people-group text-primary mb-2"></i>
								<h4 class="text-uppercase m-0">Team</h4>
								<hr class="my-4 mx-auto" />
								<div class="small text-black-50">고태진 김재희</div>
							</div>
						</div>
					</div>
					<div class="col-md-4 mb-3 mb-md-0">
						<div class="card py-4 h-10">
							<div class="card-body text-center">
								<i class="fas fa-envelope text-primary mb-2"></i>
								<h4 class="text-uppercase m-0">Email</h4>
								<hr class="my-4 mx-auto" />
								<div class="small text-black-50"><a href="#!">ssafy@ssafy.com</a></div>
							</div>
						</div>
					</div>
					<div class="col-md-4 mb-3 mb-md-0">
						<div class="card py-4 h-10">
							<div class="card-body text-center">
								<i class="fas fa-mobile-alt text-primary mb-2"></i>
								<h4 class="text-uppercase m-0">Phone</h4>
								<hr class="my-4 mx-auto" />
								<div class="small text-black-50">+1 (555) 010-0000</div>
							</div>
						</div>
					</div>
				</div>
				<div class="social d-flex justify-content-center">
					<a class="mx-2" href="#!"><i class="fab fa-twitter text-dark"></i></a>
					<a class="mx-2" href="#!"><i class="fab fa-facebook-f text-dark"></i></a>
					<a class="mx-2" href="#!"><i class="fab fa-github text-dark	"></i></a>
				</div>
			</div>
		</section>
		<!-- Footer-->
		<div class="footer small text-center text-white-50">
			<div class="px-4 px-lg-5 bg-dark">Copyright &copy; Your Website 2022</div>
		</div>`;
  };

  this.render();
}
