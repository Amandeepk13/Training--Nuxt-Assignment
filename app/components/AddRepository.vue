<script setup>
const showMsg = ref(false)
const msg = ref("")
const isError = ref(false)

const repoName = ref("")
const repoType = ref("")
const repoDesc = ref("")


const appStore = useApplicationStore()

const createRepo = async() => {
 try{
  await appStore.createApplication({
    name: repoName.value,
    type: repoType.value,
    description: repoDesc.value
  })

  msg.value = `${repoName.value} is successfully created`
  showMsg.value = true

  resetFields()

  }  catch(err){
     msg.value = `${repoName.value} is already present`
     isError.value = true
     showMsg.value = true
    }

  setTimeout(() => {
  showMsg.value = false
  }, 5000);

}

const resetFields = () => {
  repoName.value = ""
  repoType.value = ""
  repoDesc.value = ""

}


</script>

<template>
  <div class="innerContainer">
           <h2>Add Repository</h2>
           <p>Create a new repository entry for token management</p>

           <div class="formCard">

              <form class="addRepoForm" @submit.prevent="createRepo">
                 
                <div class="formgroup">
                   <label>Repository Name</label><br>
                   <input v-model="repoName" type="text" placeholder="Enter the repository name" required/>

                </div>

                <div class="formgroup">
                    <label>Repository Type</label><br>
                    <select v-model="repoType" required >
                      <option disabled value="">Select the type</option>
                      <option value="Applications" >Applications</option>
                      <option value="Stacks">Stacks</option>
                      <option value="Library">Library</option>
                    </select>
                </div>

                <div class="formgroup">
                    <label>Repository Description</label><br>
                    <textarea v-model="repoDesc" rows="5" placeholder="Short summary of this repository and purpose" required></textarea>
                </div>

               <div class="formgroup last">
                 <div class="tokenField">
                  <label>Initial Token Status</label><br>
                  <input type="text" value="Available" disabled />
                 </div>
                

                <div class="formActions">
                  <button type="button" class="cancelBtn" @click="resetFields">Cancel</button>
                  <button type="submit" class="createBtn" >Create</button>
                </div>
              </div>

              </form>
           </div>
           <div v-if="showMsg" :class="isError ? 'notification errorBox' : 'notification successBox' ">
               <span>{{ msg }}</span>
               <span class="closeBtn" @click="showMsg = false"><img src="../assets/img/crossIcon.svg" />
              </span>
           </div>

        </div>

</template>

<style lang="scss" scoped>

.innerContainer{
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        border-radius: 8px;
        padding: 10px 28px 18px;
        margin:18px;

        h2{
          font-size: 22px;
          margin-bottom: 2px;
        }
        p{
        font-size:14px;
        color:gray;
        
        }

        .formCard{
          background-color: white;
          
          border-radius: 8px;
          padding: 14px 24px;
          margin: 18px;

          .addRepoForm{
            display:flex;
            flex-direction: column;

            .formgroup{
              display:flex;
              flex-direction: column;
              padding:12px;

              label{
                font-weight:600;
                margin-bottom: -6px;
              }
              input,select, textarea{
                background-color: rgba(218, 226, 247, 0.5);
                border:none;
                padding:10px 18px;
                color:gray;
                border-radius: 8px;
                
              }
              select{
                width:250px;
              }
              .tokenField{
                display:flex;
                flex-direction: column;
              }
            }

            .last{
              display:flex;
              flex-direction: row;
              justify-content: space-between;
            
            
            .formActions{
              display: flex;
              flex-direction: row;
              gap:8px;
              padding:12px;

              button{
                border:1px solid rgba(235, 227, 227, 0.874);
                padding:10px 16px;
                border-radius: 8px;
                font-weight: 600;
                background-color: white;

              }
              .createBtn{
                background-color: black;
                color:white;
              }
              .cancelBtn{
                background-color: white;

                &:hover{
                  background-color: black;
                  color:white;

                  & + .createBtn{
                    background-color: white;
                    color:black;
                  }
                }
              }
            }
          }
          }
        }

        .notification{
         position: fixed;
         bottom: 20px;
         right: 10%;
         padding: 12px;
         border-radius: 8px;
         display: flex;
         align-items: center;
         gap:8px;
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
         
         &.successBox{
          background-color: rgb(93, 190, 38);
         }
         &.errorBox{
          background-color: rgb(245, 69, 69);
         }
        }
  
     }
</style>