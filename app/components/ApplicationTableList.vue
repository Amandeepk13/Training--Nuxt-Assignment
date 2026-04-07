<script setup>

import { useApplicationStore } from '~/stores/applications';

const store = useApplicationStore()
const {user} = useUserSession()

defineProps(["appsList"])

const message = ref("")
const showMsg = ref(false)
const isError = ref(false)

const handleMerge = async (applicationName, application) =>{
  try{
    await store.mergeApplication(applicationName);

    if(!application.merged){
       message.value = `'${ applicationName }' merging in process by you ! `
       isError.value = false
       showMsg.value = true
    }

  } catch(err){

    const mergedUser = err.data.data.mergedBy;
    message.value = `'${ applicationName }' is already in merging by ${ mergedUser } !`
    isError.value = true
    showMsg.value = true
  }

  setTimeout(() => {
  showMsg.value = false
  }, 5000);
}

</script>


<template>
  <div class="tableContainer">
  <table class="applicationTable">

    <thead class="tableHead">
       <tr>
        <th>Application Name</th>
        <th>Status</th>
        <th>Action</th>
       </tr>
    </thead>

    <tbody class="tableBody">
       <tr v-for="application in appsList" :key="application.name">
        <td>{{ application.name }}</td>
        <td>{{ application.status }} <br><br>
          <span v-if ="application.merged">Merged At: {{ new Date(application.mergedAt).toLocaleString() }}</span>
        </td>
        <td><button @click="handleMerge(application.name,application)" :disabled="application.merged && application.mergedBy !== user.name"  :class="application.merged ? 'mergedBtn' : 'mergeBtn'"> {{ application.merged ? 'Merged' : 'Merge' }}</button></td>
       </tr>
    </tbody>
  </table>
  <p v-if="appsList.length === 0">No such repository is there !!!</p>
  </div>
   <div v-if="showMsg" :class="isError ? 'errorBox' : 'successBox'">
     <span>{{ message }}</span>
     <span class="closeBtn" @click="showMsg = false"><svg xmlns="http://www.w3.org/2000/svg" width="15"  height="15" viewBox="0 0 50 50">
       <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
       </svg>
      </span>
   </div>

</template>


<style scoped src='~/assets/css/ApplicationTable.css'>

</style>