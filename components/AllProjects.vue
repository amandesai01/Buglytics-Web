<template>
  <div>
    <div class="notification is-danger is-light" v-if="showErrorNotification">
      <strong>{{ errorMessage }}</strong>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-header">
          <div class="card-header-icon">
            <div class="title">
              <span class="icon is-small is-left">
                <i class="fas fa-plus-circle"></i>
              </span>
            </div>
          </div>
          <div class="card-header-title">
            <div class="title">New Project</div>
          </div>
        </div>
        <div class="card-content">
          <form>
            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="text"
                  placeholder="Project Title"
                  v-model="name"
                />
              </div>
              <br />
              <div class="control">
                <input
                  class="input is-large"
                  type="email"
                  placeholder="Project Description"
                  v-model="details"
                />
              </div>
            </div>
            <div class="control">
              <button
                class="button is-large is-fullwidth is-primary is-loading"
                v-if="isProjectLoading"
              >Create Project</button>
              <button
                class="button is-large is-fullwidth is-primary"
                v-on:click.prevent="createproject()"
                v-else
              >Create Project</button>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <div class="columns">
      <div class="column is-9">
        <div class="title is-1">Projects</div>
      </div>
      <div class="column is-3">
        <div
          class="button is-large is-primary is-light"
          v-on:click.prevent="isCardModalActive = true"
        >
          <span class="icon is-small is-left">
            <i class="fas fa-plus-circle"></i>
          </span>&nbsp;&nbsp;&nbsp;New Project
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <loading-screen />
    </div>
    <hr />
    <div v-for="project in allProjects" v-bind:key="project.project_id">
      <nuxt-link :to="'/projects/'+project.project_id">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-9">
                <div class="title">{{ project.title }}</div>
                <div class="subtitle">{{ project.details }}</div>
              </div>
              <div class="column is-3">
                <div class="tags are-large">
                  <div class="tag is-primary">{{ parsed(project.created_ts) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nuxt-link>
      <br />
    </div>
  </div>
</template>

<script>
import fetchAllProjects from "@/functions/fetchAllProjects";
import timeDifference from "@/functions/timeDifference";
import LoadingScreen from "./LoadingScreen.vue";
import createProject from "@/functions/createProject";

export default {
  components: { LoadingScreen },
  data() {
    return {
      allProjects: [],
      showErrorNotification: false,
      errorMessage: "There was some error.",
      isLoading: false,
      isCardModalActive: false,
      name: undefined,
      details: undefined,
      isProjectLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    const [status, response] = await fetchAllProjects(this);
    if (status) {
      this.allProjects = response;
    } else {
      this.showErrorNotification = true;
      this.errorMessage = response;
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
    async createproject() {
      this.isProjectLoading = true;
      if (!this.name || !this.details) {
        this.showErrorNotification = true;
        this.errorMessage = "Fill Form Properly";
        this.isCardModalActive = false;
        this.isProjectLoading = false;
        return;
      }
      const [status, response] = await createProject(
        this.name,
        this.details,
        this
      );
      if (status) {
        this.allProjects.unshift(response);
      } else {
        this.showErrorNotification = true;
        this.errorMessage = response;
      }
    },
  },
};
</script>

<style>
</style>