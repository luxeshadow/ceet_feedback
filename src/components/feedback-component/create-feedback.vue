<template>
  <main class="main-feed">
    <div class="main-container-feed">
      <div class="feedback-card">
        <div class="feedback-header">
          <div class="feedback-header-inner">
            <div>
              <h2><i class="fas fa-comment-medical"></i> Nouveau Feedback</h2>
              <p>Partagez votre expérience avec nous</p>
            </div>
          </div>
          <div class="progress-bar-wrapper" aria-hidden="true">
            <div id="progress-bar" class="progress-bar"></div>
          </div>
        </div>

        <form class="form-feed" id="feedbackForm" novalidate @submit.prevent="onSubmit">
          <!-- Identité -->
          <div v-if="!userStore.user">
            <div class="grid-2-cols">
              <div>
                <label for="firstname">Prénom (optionnel)</label>
                <input type="text" id="firstname" name="firstname" placeholder="Votre prénom" />
              </div>
              <div>
                <label for="lastname">Nom (optionnel)</label>
                <input type="text" id="lastname" name="lastname" placeholder="Votre nom" />
              </div>
            </div>
            
            <div>
              <label for="email">Email (optionnel)</label>
              <input type="email" id="email" name="email" placeholder="email@exemple.com" />
            </div>
          </div>

          <!-- Département -->
          <div v-if="!userStore.user">
            <label>Départements/ Services/ Fonctions concerné*</label>
            <div class="custom-select" tabindex="0" @click="toggleDepartment">
              <div class="select-trigger" :class="{ open: departmentOpen }">
                <span class="select-placeholder">
                  {{ selectedDepartment ? selectedDepartment.name : "Sélectionnez un département, fonction ou service*" }}
                </span>
                <i class="fas fa-chevron-down" style="font-size: 0.75rem; color: #9ca3af"></i>
              </div>
              <ul class="select-options" :class="{ open: departmentOpen }">
                <li v-for="dept in allDepartements" :key="dept.id" @click.stop="selectDepartment(dept)">
                  {{ dept.name }}
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <input type="hidden" name="departement_id" :value="userStore.user?.departement_id" />
          </div>

          <!-- Type de feedback -->
          <div>
            <label>Type de feedback*</label>
            <div class="custom-select" tabindex="0" @click="toggleTypeFeedback">
              <div class="select-trigger" :class="{ open: typeFeedbackOpen }">
                <span class="select-placeholder">
                  {{ selectedTypeFeedback ? selectedTypeFeedback.name : "Sélectionnez un type*" }}
                </span>
                <i class="fas fa-chevron-down" style="font-size: 0.75rem; color: #9ca3af"></i>
              </div>
              <ul class="select-options" :class="{ open: typeFeedbackOpen }">
                <li v-for="tf in allTypeFeedbacks" :key="tf.id" @click.stop="selectTypeFeedback(tf)">
                  {{ tf.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Module -->
          <div>
            <label>Module*</label>
            <div class="custom-select" tabindex="0" @click="toggleModule">
              <div class="select-trigger" :class="{ open: moduleOpen }">
                <span class="select-placeholder">
                  {{ selectedModule ? selectedModule.name : "Sélectionnez un module*" }}
                </span>
                <i class="fas fa-chevron-down" style="font-size: 0.75rem; color: #9ca3af"></i>
              </div>
              <ul class="select-options" :class="{ open: moduleOpen }">
                <li v-for="mod in modules" :key="mod.id" @click.stop="selectModule(mod)">
                  {{ mod.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Phases -->
          <div v-if="selectedModule">
            <label>Phase(s) concernée(s)*</label>
            <div class="phases-container">
              <div class="phases-scroll-wrapper">
                <div class="phases-options">
                  <label
                    v-for="phase in modulePhases"
                    :key="phase.id"
                    class="phase-option"
                    :class="{ selected: selectedPhases.includes(phase.id) }"
                  >
                    <input
                      type="checkbox"
                      :value="phase.id"
                      v-model="selectedPhases"
                      class="phase-checkbox"
                    />
                    <span class="phase-label">{{ phase.name }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Message -->
          <div>
            <label for="message">Votre message*</label>
            <textarea
              id="message"
              name="message"
              placeholder="Décrivez votre feedback en détail..."
              v-model="message"
              required
            ></textarea>
          </div>

          <!-- Fichier -->
          <div>
            <label>Pièce jointe (optionnel)</label>
            <div class="file-upload-box">
              <div class="file-upload-content">
                <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div>
                  <label class="file-upload-label" for="file-upload">
                    <span>{{ selectedFiles.length ? selectedFiles.map(f => f.name).join(', ') : "Aucun fichier sélectionné" }}</span>
                    <input id="file-upload" multiple name="file-upload" type="file" @change="onFileChange" />
                  </label>
                </div>
                <p class="file-upload-info">PNG, JPG, PDF jusqu'à 10MB</p>
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="form-buttons">
            <button type="button" class="btn btn-cancel" @click="resetForm">Annuler</button>
            <button type="submit" class="btn btn-submit">
              <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
              <i class="fi fi-rr-paper-plane"></i> Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import "@/assets/css/app-feedback.css";
import { ref, onMounted } from "vue";
import { useListDepartements } from "@/composables/useListDepartements";
import { useListTypeFeedbacks } from "@/composables/useListTypeFeedbacks";
import { useCreateFeedback } from "@/composables/useCreateFeedback";
import { useListModules } from "@/composables/useListModules";
import { useListPhases } from "@/composables/useListPhases";
import { useUserStore } from "@/presentation/stores/userStore";
import { Module } from "@/domain/models/Module";

// --- Store utilisateur ---
const userStore = useUserStore();
userStore.loadUser();

// --- Départements ---
const { allDepartements, fetchAllDepartements } = useListDepartements();
const selectedDepartment = ref<{ id: number; name: string } | null>(null);
const departmentOpen = ref(false);
const toggleDepartment = () => (departmentOpen.value = !departmentOpen.value);

// --- Type Feedback ---
const { allTypeFeedbacks, fetchAllTypeFeedbacks } = useListTypeFeedbacks();
const selectedTypeFeedback = ref<{ id: number; name: string } | null>(null);
const typeFeedbackOpen = ref(false);
const toggleTypeFeedback = () => (typeFeedbackOpen.value = !typeFeedbackOpen.value);

// --- Modules ---
const { fetchModulesByDepartement } = useListModules();
const modules = ref<Module[]>([]);
const selectedModule = ref<{ id: number; name: string } | null>(null);
const moduleOpen = ref(false);
const toggleModule = () => (moduleOpen.value = !moduleOpen.value);

const loadModules = async (departementId?: number) => {
  if (!departementId) return;
  const response = await fetchModulesByDepartement(departementId);
  if (!response) return;
  modules.value = response.data;
};

// --- Sélection département ---
const selectDepartment = async (dept: { id: number; name: string }) => {
  selectedDepartment.value = dept;
  departmentOpen.value = false;
  await loadModules(dept.id);
};

// --- Sélection type feedback ---
const selectTypeFeedback = (tf: { id: number; name: string }) => {
  selectedTypeFeedback.value = tf;
  typeFeedbackOpen.value = false;
};

// --- Sélection module et chargement phases ---
const { modulePhases, fetchModulePhases } = useListPhases();
const selectedPhases = ref<number[]>([]);

const selectModule = async (mod: { id: number; name: string }) => {
  selectedModule.value = mod;
  moduleOpen.value = false;
  selectedPhases.value = [];
  await fetchModulePhases(mod.id);
};

// --- Fichiers ---
const selectedFiles = ref<File[]>([]);
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFiles.value = target.files ? Array.from(target.files) : [];
};

// --- Feedback ---
const { submitFeedback, loading } = useCreateFeedback();
const message = ref<string>("");

// --- Reset complet ---
const resetForm = () => {
  message.value = "";
  selectedDepartment.value = null;
  selectedTypeFeedback.value = null;
  selectedModule.value = null;
  selectedPhases.value = [];
  selectedFiles.value = [];
  departmentOpen.value = false;
  typeFeedbackOpen.value = false;
  moduleOpen.value = false;
};

// --- Submit feedback ---
const onSubmit = async (e: Event) => {
  e.preventDefault();

  const departmentId = userStore.user
    ? userStore.user.departement_id
    : selectedDepartment.value?.id;

  try {
    const response = await submitFeedback({
      description: message.value,
      selectedPhases: selectedPhases.value,
      selectedDepartment: userStore.user ? null : selectedDepartment.value,
      selectedTypeFeedback: selectedTypeFeedback.value,
      selectedModule: selectedModule.value,
      files: selectedFiles.value, // Utiliser selectedFiles au lieu de selectedFile
      departmentId,
    });

    if (response) {
      resetForm();
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du feedback:', error);
  }
};

// --- Chargement initial ---
onMounted(async () => {
  await fetchAllDepartements();
  await fetchAllTypeFeedbacks();

  if (userStore.user?.departement_id) {
    await loadModules(userStore.user.departement_id);
  }
});
</script>