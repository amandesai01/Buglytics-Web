<template>
  <div class="card">
      <div class="card-header">
          <div class="card-header-title">
              <div class="title">
                  Create Auth Token
              </div>
          </div>
      </div>
      <div class="card-content">
          <div v-if="showToken">
              <pre>
                  {{ fetchedToken }}
              </pre>
          </div>
          <div v-else>
              <form>
                  <div class="field">
                      <div class="title is-5">
                            Access Rights:
                      </div>
                      <div class="control">
                          <input type="checkbox" v-model="viewAccess"> Error View Access <br>
                          <input type="checkbox" v-model="reportAccess"> Error Report Access
                      </div>
                      <hr>
                  </div>
              </form>
              <div class="button is-large is-primary is-light is-loading" v-if="isTokenLoading">

              </div>
              <div class="button is-large is-primary is-light" v-on:click.prevent="getToken" v-else>
                  Create Token
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import createToken from '@/functions/createToken'
export default {
    data(){
        return {
            showToken: false,
            fetchedToken: undefined,
            isTokenLoading: false,
            viewAccess: false,
            reportAccess: false,
        }
    },
    methods: {
        async getToken(){
            this.isTokenLoading = true;
            var accessrightstring = "";
            if(this.viewAccess) accessrightstring += "ERR_VIEW|";
            if(this.reportAccess) accessrightstring += "ERR_REPORT|";
            const [status, response] = await createToken(accessrightstring, this.$route.params.id, "-", this)
            if(status){
                this.fetchedToken = response;
                this.showToken = true;
            }
            this.isTokenLoading = false;
        }
    }
}
</script>

<style>

</style>