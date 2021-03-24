<template>
<div>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <nuxt-link class="navbar-item" :to="'/'">
      <div class="title is-4" style="font-family: 'Anton', sans-serif; color: #7957d5">B u g l y t i c s</div>
    </nuxt-link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons" v-if="!isLoggedIn">
          <nuxt-link :to="'/register'" class="button is-primary">
            <strong>Join Us!</strong>
          </nuxt-link>
          <nuxt-link :to="'/login'" class="button is-light">
            Log in
          </nuxt-link>
        </div>
        <div class="buttons" v-else>
          <nuxt-link :to="'/projects'" class="button is-primary-outlined">
            <strong>Projects</strong>
          </nuxt-link>
          <button v-on:click.prevent="logout" class="button is-light">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
    <nuxt/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn;
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
