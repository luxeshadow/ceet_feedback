// composables/useCreateFeedback.ts
import { ref, createApp } from "vue";
import Confetti from "@/components/layouts/app-confetti.vue";
import { createFeedback } from "@/application/usescase/createFeedback";
import { showToast } from "@/shared/utils/toast";

export function useCreateFeedback() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const submitFeedback = async (feedbackData: {
    description?: string;
    selectedPhases?: number[];
    selectedDepartment?: { id: number; name: string } | null;
    selectedTypeFeedback?: { id: number; name: string } | null;
    selectedModule?: { id: number; name: string } | null;
    file?: File | null;
  }) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const response = await createFeedback(feedbackData);

      showToast("Feedback envoyé avec succès !", { type: "success" });

      // --- Confetti ---
      const confettiContainer = document.createElement("div");
      document.body.appendChild(confettiContainer);
      createApp(Confetti).mount(confettiContainer);
      success.value = true;
      return response;
    } catch (err: any) {
  console.error(err);
  error.value = err.response?.data?.message || err.message || "Erreur lors de l'envoi du feedback";

  showToast(error.value ?? "Erreur lors de l'envoi du feedback", { type: "error" });

  return null;
}
 finally {
      loading.value = false;
    }
  };

  return {
    submitFeedback,
    loading,
    error,
    success,
  };
}
