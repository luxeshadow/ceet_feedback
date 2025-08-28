<template>
  <canvas ref="canvas" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999;"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import confetti from 'canvas-confetti';

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) return;

  const myConfetti = confetti.create(canvas.value, {
    resize: true, // le canvas s’adapte à la taille de la fenêtre
    useWorker: true
  });

  // Exemple : explosion de confetti
  myConfetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
});
</script>
