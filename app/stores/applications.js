import { defineStore } from "pinia";

export const useApplicationStore = defineStore("applicationsStore", {
  state: () => ({
    applicationsList: [],
    search: "",
    selectedType: "All Types",
    selectedStatus: "All Status"
  }),


  getters: {
    filteredApplications(state) {
      return state.applicationsList.filter(app => {
        const matchedSearch = app.name.toLowerCase().includes(state.search.toLowerCase());
        const matchedType = state.selectedType === "All Types" || app.type.toLowerCase() === state.selectedType.toLowerCase();
        const matchedStatus = state.selectedStatus === "All Status" || app.status === state.selectedStatus;

        return matchedSearch && matchedType && matchedStatus;
    });
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
    },

    async createApplication(data){
      await $fetch('/api/applications', {
        method: 'POST',
        body: data

      })
      await this.fetchApplications();
    }
  }

});
