
<template>
    <div class="columns">
        <div class="column is-one-fifths"></div>
        <div class="column is-three-fifths">
    <div class="forms" style="padding:4%; padding-top: 20%; ">
        <div class="title">Let's Get You In!</div>
        <LoginForm/>
    </div>
        </div>
    <div class="column is-one-fifths"></div>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
// import checkRevAuth from '@/functions/checkRevAuth'
export default {
    components: { LoginForm },
    async mounted() {
        // await checkRevAuth(this)
    }
}
</script>

<style>
</style>