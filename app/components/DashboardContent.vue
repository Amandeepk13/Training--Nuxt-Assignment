<script setup>
const store = useApplicationStore()
const loader = useLoadingIndicator()


onMounted(async () => {
  loader.start({ force: true })   

  try {
    await store.fetchApplications()
  } finally {
    loader.finish()             
  }

  setInterval(() => {
    store.fetchApplications()
  }, 5000)
})

</script>

<template>
  <div class="mainContent">

    <section class="dashboardHead">
          <h1>Repository Tokens </h1>
          <p>Manage and track token access across all repositories</p>
      </section>

      <div class="filterBars">


        <div class="searchBar">
           <span class="searchIcon">
             <img src="../assets/img/searchIcon.svg" />
           </span>
           <input type="text" placeholder="Search repositories..." class="searchInput" v-model= "store.search" />
        
        
        </div>

        <select v-model="store.selectedType" class="filterDropdown">
          <option>All Types</option>
          <option>Applications</option>
          <option>Stacks</option>
          <option>Library</option>

        </select>
        
        <select v-model="store.selectedStatus" class="filterDropdown">
          <option>All Status</option>
          <option>Available</option>
          <option>Not Available</option>

        </select>
        
      </div>

      <ApplicationTableList :appsList="store.filteredApplications"/> 

  </div>
</template>

<style lang="scss" scoped>
.mainContent{
  width:100%;
  max-width: 1200px;
}

.dashboardHead{
  text-align: left;
  margin-bottom:40px;

  h1{
    font-size:28px;
  }
  p {
    color:gray;
  }

}

.filterBars {
  display: flex;
  gap:15px;
  margin-bottom: 25px;
  align-items:center;
  
  width:100%;
  
}

.searchBar{
  flex:1;
  max-width: 900px;
  min-width:300px;
  position:relative;

     .searchIcon{
        position:absolute;
        top:50%;
        transform: translateY(-50%) ;
        left:12px;

        img{
         width:16px;
         height:16px;
        }
        
      }
     .searchInput{
        width:100%;
        padding: 10px 12px 10px 35px;
        border-radius: 8px;
        border:none;
        background-color: rgba(223, 227, 230, 0.374);
        box-sizing: border-box;
      }
}

.filterDropdown{
  
  width:150px;
  min-width: 150px;
  padding: 10px;
  border: none;
  background-color: rgba(223, 227, 230, 0.374);
  border-radius:8px;
  color: black;
  cursor: pointer;
}
</style>