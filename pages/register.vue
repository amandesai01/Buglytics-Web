
<template>
    <div class="columns">
        <div class="column is-one-fifths"></div>
        <div class="column is-three-fifths">
    <div class="forms" style="padding:4%; padding-top: 20%; ">
        <div class="title">Join Our Service!</div>
        <RegisterForm/>
    </div>
        </div>
    <div class="column is-one-fifths"></div>
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'
// import checkRevAuth from '@/functions/checkRevAuth'
export default {
    components: { RegisterForm },
    async mounted() {
        // await checkRevAuth(this)
    }
}
</script>

<style>
</style>