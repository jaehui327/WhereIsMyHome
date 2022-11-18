<template>
  <footer>
    <div class="social">
      <a href="#"><b-icon icon="instagram" /></a>
      <a href="#"><b-icon icon="facebook" /></a>
      <a href="#"><b-icon icon="twitter" /></a>
      <a href="#"><b-icon icon="discord" /></a>
    </div>

    <ul class="list">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="#">Services</router-link>
      </li>
      <li>
        <router-link to="#">About</router-link>
      </li>
      <li>
        <router-link to="#">Terms</router-link>
      </li>
      <li>
        <router-link to="#">Privacy Policy</router-link>
      </li>
    </ul>
    <p class="copyright">Future Coders @ 2021</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
footer {
  background-color: #ffffff;
}
footer .social {
  text-align: center;
  padding-bottom: 25px;
  color: #4b4c4d;
}
footer .social a {
  font-size: 24px;
  color: inherit;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  line-height: 38px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  margin: 0 8px;
  opacity: 0.75;
}

footer .social a:hover {
  opacity: 0.9;
}

footer ul {
  margin-top: 0;
  padding: 0;
  list-style: none;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 0;
}

footer ul a {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}

footer ul li {
  display: inline-block;
  padding: 0 15px;
}

footer ul a:hover {
  opacity: 1;
}

footer .copyright {
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #aaa;
}
</style>
