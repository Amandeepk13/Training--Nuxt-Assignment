<script setup>
import mergeIcon from '~/assets/img/git-mergeIcon.svg'
import pushIcon from '~/assets/img/git-pushicon.svg'

 const { user, clear } = useUserSession()
 

 const showDropdown = ref(false)

 const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
 }

 const handleLogout = async() => {
  const loader = useLoadingIndicator()

  loader.start({ force: true })   

  try {
    await $fetch('/api/auth/logout', { 
      method: 'POST' 
    })
    await clear()
    navigateTo('/login')

  } finally {
    loader.finish()               
  }

}

  const route = useRoute()
  const isAdmin = computed( () => route.path === '/admin')
</script>

<template>
  <header class = "header">
      <div class="headerContent">

       <div class="leftSection">
          <div class="logoBox">
            <img :src= "isAdmin ? pushIcon : mergeIcon "  class="mergeLogo" alt="Logo"/>
          </div>
          <div class="title">
            <h2>Merge Token</h2>
            <p>Repository Management</p>
          </div>
       </div>

       <div class="rightSide" >


       
       <div class="userInfo" @click="toggleDropdown">
          <div v-if="user?.picture" class="userPicContainer">
            <img :src="user.picture" class="userPic" alt="User Profile"  referrerPolicy="no-referrer"/>
          </div>
          <div class="usernameContainer">
            <span class="username">{{ user?.name }}</span>
            <img src="../assets/img/dropdown.svg"  />
          </div>
          
          
        </div>

          <div v-if="showDropdown" class="dropdownMenu">
            
            <button @click="handleLogout" class="LogoutBtn">
              <img src="../assets/img/logout.svg" alt="logout" class="logoutIcon"/> Logout 
            </button>
          </div>
        
       </div>
      </div>
     </header>
</template>

