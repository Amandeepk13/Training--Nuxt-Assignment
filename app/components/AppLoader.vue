<template>
  <div class="container">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;


  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(255,255,255,0.3);
    border-top: 6px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
