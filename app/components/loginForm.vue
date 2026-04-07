<script setup>

const {login} = useAuth()


const onSuccess = async(e) => {
  await login(e.claims.name, e.claims.email)
};

const onError = (err) => {
  console.error(err);
};
</script>

<template>
  <div class="loginContainer">
    <div class="loginCard">
      <h2>Application Token System</h2>
      <div class="loginBox">
      <p class="loginmsg">Please signup to view the applications...</p>

      <ClientOnly>
        <GoogleLoginButton
          :options="{ theme: 'filled_blue', size: 'large', text: 'signup_with' }"
          @success="onSuccess"
          @error="onError"
        />
      </ClientOnly>
      </div>
    </div>
  </div>
</template>


