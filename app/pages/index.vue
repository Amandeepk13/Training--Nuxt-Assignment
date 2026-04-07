<script setup>
definePageMeta({
  middleware:'auth'
})


import { useApplicationStore } from '~/stores/applications';

const store = useApplicationStore()

const { user, clear } = useUserSession()

onMounted(() => {
  store.fetchApplications();

  setInterval(()=> {
    store.fetchApplications();
  },5000);
});

const handleLogout = async() => {
  await clear()
  navigateTo('/login')
}

</script>

<template>
  <div class="mainContainer">
    <div class="applicationBox">
      <div class="header">
          <h1> Welcome {{ user.name }} ! </h1>
          <button class="logoutBtn" @click="handleLogout">Logout</button>
      </div>
      <div class="container">
        <input type="search" placeholder="Search applications by name..." class="searchBar" v-model= "store.search">
        <h2>Applications</h2>
        
        <ApplicationTableList :appsList="store.filteredApplications"/>
      </div>
    </div>
      
  </div>
</template>



<style scoped src='~/assets/css/dashboard.css'>

</style>

