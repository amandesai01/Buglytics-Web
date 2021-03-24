<template>
  <div>
    <div class="notification is-danger is-light" v-if="showErrorNotification">
            {{ errorMessage }}
        </div>
    <div v-if="isLoading">
      <loading-screen/>
    </div>
    <div style="padding: 5%;">
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-content">
              <div class="title">
                {{ project.title }}
              </div>
              <div class="subtitle">
                {{ project.details }}
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="card">
            <div class="card-content">
              <div class="title">
                {{ bugcount }}
              </div>
              <div class="subtitle">
                Bug Count
              </div>
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="card">
            <div class="card-content">
              <div class="button is-light is-large is-primary" v-on:click.prevent="showAddWebhookModal = true">Webhooks</div>
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="card">
            <div class="card-content">
              <div class="button is-large is-light is-danger" v-on:click.prevent="showAddTokenModal = true">+ Token</div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="columns is-multiline">
        <div class="column is-half" v-for="bug in bugs" v-bind:key="bug.bug_id">
        <div >
          <div class="card">
            <div class="card-header">
              <div class="card-header-title" v-if="bug.bug_type">
                {{ bug.bug_type }}
              </div>
              <div class="card-header-title" v-else>
                Unidentified Bug
              </div>
              <div class="card-header-icon">
                <div class="tag is-primary is-large">
                  Bug Level {{ bug.bug_level }}
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="subtitle">
                {{ bug.bug_location }}
              </div>
              <pre style="height: 100px;">
                {{ bug.bug_text }}
              </pre>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                {{ parsed(bug.ts) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <b-modal v-model="showAddWebhookModal" :width="740" scroll="keep">
            <AllWebhooks/>
        </b-modal>
      <b-modal v-model="showAddTokenModal" :width="740" scroll="keep">
            <create-auth-token/>
        </b-modal>
    </div>
  </div>
</template>

<script>
import fetchProject from "@/functions/fetchProject"
import fetchAllBugs from "@/functions/fetchAllBugs"
import timeDifference from "@/functions/timeDifference"
import AllWebhooks from "@/components/AllWebhooks"
import CreateAuthToken from '~/components/CreateAuthToken.vue'

export default {
  components: { AllWebhooks, CreateAuthToken },
  data(){
    return{
      isLoading: false,
      project: {},
      showErrorNotification: false,
      errorMessage: "There was some error.",
      bugcount: "Loading..",
      bugs: [],
      showAddWebhookModal: false,
      showAddTokenModal: false
    }
  },
  async mounted(){
    this.isLoading = true;
    const [status, response] = await fetchProject(this.$route.params.id, this);
    if(status){
        this.project = response;
    } else {
        this.showErrorNotification = true;
        this.errorMessage = response;
    }
    const [bugstatus, bugresponse] = await fetchAllBugs(this.$route.params.id, this);
    if(bugstatus){
      this.bugs = bugresponse;
      this.bugcount = bugresponse.length;
    } else {
      this.showErrorNotification = true;
      this.errorMessage += " " + bugresponse;
    }
    this.isLoading = false;
  },
  methods: {
    parsed(created_ts) {
            if (created_ts == "Just Now") {
                return "Just Now";
            }
            var currentDate = new Date(created_ts * 1000);
            const tdiff = timeDifference(new Date(), currentDate);
            if (tdiff) return tdiff;
            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var date = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            return date + " " + monthNames[month + 1] + " " + year;
        },
  }
}
</script>

<style>

</style>