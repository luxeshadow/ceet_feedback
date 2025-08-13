<template>
  <div v-if="showSkeleton" id="skeleton">
    <img src="https://i.postimg.cc/DfP4fpjz/ceet-removebg-preview.png" alt="CEET" />
    <div class="skeleton skeleton-bar-1"></div>
    <div class="skeleton skeleton-bar-2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "@/assets/css/app-preload.css";

const showSkeleton = ref<boolean>(true);

onMounted(() => {
  
  const bars = document.querySelectorAll("#skeleton .skeleton");
  bars.forEach((bar, i) => {
    (window as any).anime({
      targets: bar,
      opacity: [0.3, 1],
      translateY: [-5, 0],
      delay: i * 200,
      duration:600,
      easing: "easeOutQuad",
      loop: true,
      direction: "alternate"
    });
  });
  setTimeout(() => {
    (window as any).anime({
      targets: "#skeleton",
      opacity: [1, 0],
      duration: 500,
      easing: "easeInQuad",
      complete: () => {
        showSkeleton.value = false;
      }
    });
  }, 1000);
});
</script>
