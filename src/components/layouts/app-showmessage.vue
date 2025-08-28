<template>
  <div id="success-message">
    <div class="icon-wrapper">
      <i class="fas fa-check"></i>
    </div>
    <h3>Merci pour votre feedback !</h3>
    <p class="p" v-if="feedbackGroupId">
      Votre code de suivi : {{ feedbackGroupId }}
    </p>

    <button @click="close">
      <i class="fas fa-paper-plane"></i> Soumettre nouveau feedback ou Fermer
    </button>
  </div>
</template>
<script setup lang="ts">
import "@/assets/css/app-success-modal.css";
import { defineProps } from 'vue';

const props = defineProps<{
  feedbackGroupId?: string;
  onClose?: () => void; // fonction de fermeture
}>();

const close = () => {
  if (props.onClose) props.onClose();
};
</script>
