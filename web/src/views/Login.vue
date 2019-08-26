<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">Need an account?</router-link>
          </p>
          <form v-on:submit.prevent="onSubmit(username, password);">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "../common/api.service";
import jwtService from "../common/jwt.service";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async onSubmit(username, password) {
      if (username || password) {
        const { data } = await UserService.login({ username, password });
        if (data.token != null) {
          jwtService.saveToken(data.token);
          this.$router.push("/tasks");
        } else {
          alert("User or password is wrong!");
        }
      }
    }
  }
};
</script>