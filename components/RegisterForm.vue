<template>
  <div class="loginForm">
    <div class="notification is-danger is-light" v-if="showFailureNotification">
        <strong>{{ failureMessage }}</strong>
    </div>
    <form v-else>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-large" type="email" placeholder="Organization Title" v-model="name" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div> <br>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-large" type="email" placeholder="Organization Email" v-model="email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div> <br>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-large" type="password" placeholder="Organization Password" v-model="password" />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
        <div class="control">
            <button class="button is-large is-fullwidth is-primary is-loading" v-if="isLoading">
                Register
            </button>
            <button class="button is-large is-fullwidth is-primary" v-on:click.prevent="authenticate()" v-else>
                Register
            </button>
        </div>
    </form>
  </div>
</template>

<script>
import register from '@/functions/register'
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isLoading: false,
      showFailureNotification: false,
      failureMessage: "There was some error"
    }
  },
  methods: {
    async authenticate() {
      this.isLoading = true;
      try {
        const [status, msg] = await register(this.email, this.password, this.name, this);
        if(status) this.$router.push('/projects')
        else {
            this.showFailureNotification = true;
            this.failureMessage = msg
        }
      } catch (error) {
        console.log(error)
        this.showFailureNotification = true;
      }
      this.email = "";
      this.isLoading = false;
    }
  }
};
</script>

<style>
</style>