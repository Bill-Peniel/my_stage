
<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="spinner-segment bg-success"></div>
      <div class="spinner-segment bg-warning"></div>
      <div class="spinner-segment bg-danger"></div>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.spinner {
  width: 50px;
  height: 50px;
  position: relative;
  animation: spinner-rotate 1.5s linear infinite;
}

.spinner-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.7;
}

.spinner-segment:nth-child(1) {
  transform: rotate(120deg);
}

.spinner-segment:nth-child(2) {
  transform: rotate(240deg);
}

.spinner-segment:nth-child(3) {
  transform: rotate(360deg);
}

@keyframes spinner-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
