<template>
  <div class="card">
      <div class="card-header">
          <div class="card-header-title">
              <div class="title">
                  Webhooks
              </div>
          </div>
      </div>
      <div class="card-content">
          <div class="notification is-danger is-light" v-if="showErrorNotification">
            <strong>{{ errorMessage }}</strong>
            </div>
          <form>
            <div class="title is-6">Create New Webhook</div>
            <div class="control">
                <input class="input" type="text" placeholder="Target URL" v-model="url" />
            </div><br>
            <div class="control">
                <input class="input" type="number" placeholder="Level" v-model="level" />
            </div><br>
            <div class="control">
                <button class="button is-primary is-loading" v-if="isWebhookCreating">
                    Add Hook
                </button>
                <button class="button is-primary" v-on:click.prevent="createWebhook()" v-else>
                    Add Hook
                </button>
            </div>
        </form>
        <hr>
        <div class="title is-6">Currently Active Webhooks</div>
        <div v-for="webhook in webhooks" v-bind:key="webhook.webhook_id">
              <div class="card">
                  <div class="card-content">
                      <div class="columns">
                          <div class="column is-4">
                              Target URL <br>
                              <input type="text" :value="webhook.target_url" disabled>
                          </div>
                          <div class="column is-4">
                              Bug Level <br>
                              <input type="text" :value="webhook.bug_level" disabled>
                          </div>
                          <div class="column is-4">
                              <div class="button is-danger is-loading" v-if="webhookDeleting == webhook.webhook_id">
                              </div>
                              <div class="button is-danger" v-on:click.prevent="deleteWebhook(webhook)" v-else>
                                  <span class="icon is-small is-left">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import fetchAllWebhooks from "@/functions/fetchAllWebhooks"
import createWebhook from "@/functions/createWebhook"
import deleteWebhook from "@/functions/deleteWebhook"

export default {
    data(){
        return {
            webhooks: [],
            isLoading: false,
            showErrorNotification: false,
            errorMessage: "Some Error",
            isWebhookCreating: false,
            url: undefined,
            level: undefined,
            webhookDeleting: ""
        }
    },
    async mounted() {
        this.isLoading = true;
        const [status, response] = await fetchAllWebhooks(this.$route.params.id, this);
        if(status){
            this.webhooks = response;
        } else {
            this.showErrorNotification = true;
            this.errorMessage = response;
        }
        this.isLoading = false;
    },
    methods: {
        async createWebhook(){
            this.isWebhookCreating = true;
            const [status, response] = await createWebhook(this.$route.params.id, this.url, this.level, this);
            if(status){
                this.webhooks.unshift(response);
                this.url = undefined;
                this.level = undefined;
            } else {
                this.showErrorNotification = true;
                this.errorMessage = response;
            }
            this.isWebhookCreating = false;
        },
        async deleteWebhook(webhook){
            this.webhookDeleting = webhook.webhook_id;
            const [status, response] = await deleteWebhook(this.$route.params.id, webhook.webhook_id, this);
            if(status){
                const newArray = []
                this.webhooks.forEach(element => {
                    if(element.webhook_id == webhook.webhook_id){
                        return
                    }
                    newArray.push(element);
                });
                this.webhooks = newArray;
            } else {
                this.showErrorNotification = true;
                this.errorMessage = response;
            }
            this.webhookDeleting = ""
        }
    }
}
</script>

<style>

</style>