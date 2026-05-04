<script setup>

const {login} = useAuth()


const onSuccess = async(e) => {
  // console.log("user claims", e.claims)
  await login(e.claims.name, e.claims.email, e.claims.picture)
};

const onError = (err) => {
  console.error(err);
};
</script>

<template>
  <div class="loginCard">
    <div class="mergelogo">
      <img src="../assets/img/git-mergeIcon.svg" alt="MergeApp Logo" class="logo-sign"/>
    </div>
    <h1 class="title">Merge Token</h1>
    <p class="subTitle">Manage repository tokens and collaborate with your team </p>

  
      <ClientOnly>
        <GoogleLoginButton
          :options="{ theme: 'filled_blue', size: 'large', text: 'signin_with'}"
          @success="onSuccess"
          @error="onError"
        />
      </ClientOnly>
    
    
  </div>
</template>

<style scoped lang="scss">

 .loginCard {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10%;
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
}

.mergelogo{
  width:70px;
  height:70px;
  background-color: rgb(17, 101, 245);
  border-radius:50%;
  color:white;
  display:flex;
  align-items:center;
  justify-content: center;

  .logo-sign{
    width:50px;
    height:50px;
  }
}

.title{
  font-size:32px;
  font-family:Arial, Helvetica, sans-serif;
  font-weight: 600;
  margin-bottom:18px;
}
.subTitle{
  font-size: 16px;
  font-family:Arial, Helvetica, sans-serif;
  color:gray;
}

</style>


