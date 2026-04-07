import { defineStore } from "pinia";

export const useApplicationStore = defineStore("applicationsStore", {
  state: () => ({
    applicationsList: [],
    search: ""
  }),


  getters: {
    filteredApplications(state) {
      return state.applicationsList.filter(app =>
        app.name.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },

  actions: {

    async fetchApplications() {
      const data = await $fetch('/api/applications');
      this.applicationsList = data;
    },

    async mergeApplication(applicationName){
      await $fetch("/api/merge", {
        method: "POST",
        body: { applicationName}
      });

      await this.fetchApplications();
    }
  }

});
