<template>
<div>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <nuxt-link :to="'/'" class="navbar-item">
        Home
      </nuxt-link>

      <nuxt-link :to="'/documentation'" class="navbar-item">
        Documentation
      </nuxt-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <nuxt-link :to="'/register'" class="button is-primary">
            <strong>Join Us!</strong>
          </nuxt-link>
          <nuxt-link :to="'/login'" class="button is-light">
            Log in
          </nuxt-link>
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
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
