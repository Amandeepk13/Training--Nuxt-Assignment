<script setup>

  // definePageMeta({
  // middleware:'auth'
  // })

  const appStore = useApplicationStore()
  const currentlyActive = ref("dashboard")

  const goToAddRepository = () => {
    currentlyActive.value = "addRepository"
  }
  const goToDashboard = () => {
    currentlyActive.value = "dashboard"
  }

</script>

<template>
  <div class="adminPage">

    <aside class="sidebar">

      <nav class="sidebarContainer">
        <ul>
          <li 
            class="linkBtn dashboard" :class=" currentlyActive === 'dashboard' ? 'active' : '' " @click="goToDashboard">Dashboard
          </li>
          
          <li 
            class="linkBtn addrepo" :class=" currentlyActive === 'addRepository' ? 'active' : '' " @click="goToAddRepository">Add Repository
          </li>
        </ul>
      </nav>
       
    </aside>

    <section class = "content">

      <div class="contentContainer" v-if="currentlyActive === 'addRepository'">
        
         <h1>Admin Panel</h1>
         <p>Manage repositories from a single admin workspace</p>

         <AddRepository />
         
       
      </div>
      <div class="adminDashboard">
      <DashboardContent v-if="currentlyActive === 'dashboard'" :appsList="appStore.filteredApplications" />
      </div>
    </section>

  </div>

</template>

<style lang="scss" scoped>
  .adminPage{
    display:flex;
    font-family: Arial, Helvetica, sans-serif;
    margin: 2px;
  }
   
   .sidebar{
     width:28px;
     min-height: 100vh;
     padding:20px;
     overflow: hidden;
     transition: 0.3s ease;

     &:hover{
      width:250px;
     }

     .sidebarContainer{
      display:flex;
      flex-direction: column;

      ul{
        padding: 2px;

        li{
          margin: 4px;
        }
        
      }
    
      .linkBtn{
        width:180px;
        display:flex;
        align-items: center;
        gap:12px;
        border:none;
        padding:12px 18px;
        cursor:pointer;
        border-radius:8px;
        font-weight: 600;
        background-color: rgb(166, 192, 240);
        color:rgb(27, 85, 230);


        &::before {
          content: "";
          width: 12px;
          height:12px;
          border-radius: 4px;
          background-color: rgb(17, 101, 245);
        }
        
        &.active {
          background-color: black;
          color:white;

          &::before {
            background-color: orange;
          }
        }
      }
     }
    }
    .content{
      flex:1;
      margin:2px;
      padding:4px;
      box-sizing: border-box; 
      box-shadow: -2px 0 2px rgba(140, 168, 244, 0.354);
      background-color: rgba(236, 239, 248, 0.621);
      border-radius:8px;
      padding: 10px 28px 28px;
      min-height: 100vh;
      
    }
   
    .contentContainer{
      width:100%;
      max-width:100%;
      box-sizing:border-box;
      display:flex;
      flex-direction:column;
      

      h1{
        font-size:30px;
        margin-bottom:2px;
      }
      p{
        font-size:14px;
        color:gray;
        
      }
      
      
    }
    .adminDashboard{
      display:flex;
      align-items: center;
      justify-content: center;
    }

</style>
