// composables/useCreateFeedback.ts
import { ref, createApp } from "vue";
import Confetti from "@/components/layouts/app-confetti.vue";
import ShowMessage from "@/components/layouts/app-showmessage.vue";
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

      // --- Message de succès ---
      const messageContainer = document.createElement("div");
      document.body.appendChild(messageContainer);

      // Récupérer le feedback_group_id depuis la réponse
      let groupId: string | null = null;
      if (Array.isArray(response?.data)) {
        groupId = response.data[0]?.feedback_group_id ?? null;
      } else {
        groupId = response?.data?.feedback_group_id ?? null;
      }

      // On crée l'instance en deux étapes pour éviter les closures problématiques
      let appInstance: ReturnType<typeof createApp> | null = null;
      const onClose = () => {
        if (appInstance) {
          appInstance.unmount();
          document.body.removeChild(messageContainer);
        }
      };

      appInstance = createApp(ShowMessage, {
        feedbackGroupId: groupId,
        onClose,
      });

      appInstance.mount(messageContainer);

      success.value = true;
      return response;
    } catch (err: any) {
      console.error(err);
      error.value =
        err.response?.data?.message || err.message || "Erreur lors de l'envoi du feedback";
      showToast(error.value ?? "Erreur lors de l'envoi du feedback", { type: "error" });
      return null;
    } finally {
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
