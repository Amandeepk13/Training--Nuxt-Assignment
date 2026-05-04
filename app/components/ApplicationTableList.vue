<script setup>

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
        <th>Repository Name</th>
        <th>Type</th>
          <th>Description</th>
          <th>Token Status</th>
          <th>Token Holder</th>
          <th>Taken At</th>
          <th>Actions</th>
       </tr>
    </thead>

    <tbody class="tableBody">
       <tr v-for="application in appsList" :key="application.name">
        <td>{{ application.name }}</td>
        <td>
            <span class="typeBadge" :class="application.type.toLowerCase()">{{ application.type}}</span>
          </td>
        <td> {{ application.description }}</td>
        <td> <span class="statusBadge" :class="application.status.toLowerCase().replace(' ', '-')">{{ application.status }} </span>
          
        </td>
        <td> {{ application.mergedBy || '-'}}</td>
        <td> {{ application.mergedAt ? new Date(application.mergedAt).toLocaleString() : '-' }}</td>

        <td><button @click="handleMerge(application.name,application)" :disabled="application.merged && application.mergedBy !== user.name"  :class="application.merged ? 'mergedBtn' : 'mergeBtn'">
          <span class="btnContent">
            <img src="../assets/img/lock.svg"/>
            {{ application.merged ? 'Taken' : 'Take' }}
          </span> </button></td>
       </tr>
    </tbody>
  </table>
  <p v-if="appsList.length === 0">No such repository is there !!!</p>
  </div>
   <div v-if="showMsg" :class="isError ? 'notification errorBox' : 'notification successBox'">
     <span>{{ message }}</span>
     <span class="closeBtn" @click="showMsg = false"><img src="../assets/img/crossIcon.svg" />
     </span>
   </div>

</template>


<style lang ="scss" scoped >
 
 .tableContainer{
  width:100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  
}

.applicationTable{
  width:100%;
  padding: 16px;
  border-collapse: collapse;

}

.tableHead{
  
  text-align: left;
  border-bottom: 1px solid black;
}
th{
  padding: 16px;

}
td{
  padding:12px;
  border-bottom: 1px solid rgb(224, 222, 222);
}
/* tbody tr:nth-child(odd){
  background-color: rgb(211, 210, 210);
} */

.mergeBtn, .mergedBtn{
  color: white;
  border: none;
  padding: 6px;
  cursor: pointer;
  border-radius: 6px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mergeBtn{
  background-color: black;
}
.mergedBtn{
  background-color: gray;
}

p{
  padding:12px;
}

.notification {
    position: fixed;
    bottom: 20px;
    right: 10%;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap:8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);

    &.errorBox {
    background-color: rgb(245, 69, 69);
    }
    &.successBox{
    background-color: rgb(93, 190, 38);
   }
   
   .closeBtn{
     display:flex;
     align-items: center;
     cursor: pointer;
  
}
}





.typeBadge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size:12px;
  
  &.applications {
    background-color: rgba(185, 216, 247, 0.689);
    color:rgb(4, 31, 117);
  }
  &.stacks {
    background-color: rgba(247, 189, 247, 0.728);
    color:rgb(171, 4, 171);
  }
  &.library {
    background-color: rgba(196, 247, 196, 0.735);
    color:rgb(4, 58, 12);
  }
}

.statusBadge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size:12px;

  &.available {
    background-color: black;
    color:white;
  }
  &.not-available {
    background-color: rgb(190, 190, 190);
    color:gray;
  }
}

.btnContent {
  display: flex;
  align-items: center;
  gap: 8px;
}


</style>