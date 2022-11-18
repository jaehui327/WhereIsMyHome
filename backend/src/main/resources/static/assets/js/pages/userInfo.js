export default function UserInfoPage({ $app, value }) {
  this.$target = document.createElement("section");
  this.$target.className = "py-5";
  this.$target.id = "page";

  console.log(value);
  this.render = () => {
    this.$target.innerHTML = `
    	<div class="container px-4 px-lg-5 mt-5">
    		<div class="card h-75 col-sm-4 login-form">
    			<div class="card-body p-4">
    				<form class="text-center" id="info-form" method="POST">
 		   				<h1>My Page</h1><br />
    					<label for="mypage-id" class="col-sm-3">ID</label>
    					<input type="text" id="mypage-id" name="id" class="col-sm-8" value="id" required readonly /><br /><br />
    					<label for="mypage-pw" class="col-sm-3">Password</label>
    					<input type="password" id="mypage-pw" name="pw" class="col-sm-8" placeholder="영문 숫자 포함 6자리 이상"  /><br /><br />
    					<label for="mypage-name" class="col-sm-3">Name</label>
    					<input type="text" id="mypage-name" name="name" class="col-sm-8" value="name" /><br /><br />
    					<label for="mypage-addr" class="col-sm-3">Address</label>
    					<input type="text" id="mypage-addr" name="address" class="col-sm-8" value="address" /><br /><br />
    					<label for="mypage-tel" class="col-sm-3">Tel</label>
    					<input type="tel" id="mypage-tel" name="phone" class="col-sm-8" value="phoneNum" /><br />
    					<input type="hidden" name="role" value="role" />
    				</form>
    			</div>
    							
    			<div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
    				<button id="updateUserInfoBtn" class="btn btn-outline-dark" type="button">Update</button>
    				<a href="/roi" class="btn btn-outline-dark">관심 지역</a>
    				<button id="deleteUserInfoBtn" class="btn btn-outline-dark bg-danger text-white" type="button">Delete Account</button>
    			</div>
    		</div>
    	</div>    
    `;
    if (document.querySelector("#page") instanceof Node) {
      $app.removeChild(document.querySelector("#page"));
    }
    $app.insertBefore(this.$target, document.querySelector("footer"));
  };

  this.render();
  /*

	<%@ include file="/include/footer.jsp" %>
	<script>
		window.onload = function() {
			if ("${userInfo.role}" === "user") {
				document.querySelector("#radio-user").checked = true;				
			} else {
				document.querySelector("#radio-admin").checked = true;								
			}
			
		}
		document.querySelector("#updateUserInfoBtn").addEventListener("click",
				function() {
					if (confirm("수정하시겠습니까?")) {
						let form = document.querySelector("#info-form");
						form.setAttribute("action", "${root}/user?action=modify");
						form.submit();
					}
				});
		document.querySelector("#deleteUserInfoBtn").addEventListener("click",
				function() {
					if (confirm("탈퇴하시겠습니까?")) {
						let form = document.querySelector("#info-form");
						form.setAttribute("action", "${root}/user?action=remove");
						form.submit();
					}
				});
	</script>
  */
}
