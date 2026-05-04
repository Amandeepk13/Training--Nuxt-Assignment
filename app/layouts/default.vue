<script setup>

 const { isLoading } = useLoadingIndicator()

</script>

<template >
  <div class="defaultLayoutContainer">

    <AppLoader v-if="isLoading" />

     <Header/>

     <main class="mainBody">
        <slot/>
     </main>

  </div>
</template>

<style lang="scss" src="../assets/css/header.scss">
</style>
