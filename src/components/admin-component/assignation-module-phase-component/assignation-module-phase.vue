<template>
  <main class="main-wrapper-man">
    <div class="container-man">
      <h1>Assigner des phases à un module</h1>

      <!-- Sélection du module -->
      <div class="card select-card">
        <label for="moduleSelect" class="label">Choisir un module</label>
        <select id="moduleSelect" v-model="selectedModuleId" class="select" @change="loadPhases">
          <option disabled value="">— Sélectionner —</option>
          <option v-for="m in allModules" :key="m.id" :value="m.id">
            {{ m.name }}
          </option>
        </select>
      </div>

      <!-- Grille assignation -->
      <div class="card" :class="{ 'card-disabled': !selectedModuleId }">
        <div class="assign-grid">
          <!-- Gauche : phases assignées -->
          <section class="phase-box">
            <header class="phase-box__head">
              <div class="phase-box__title">
                Phases assignées
                <span class="count-badge">{{ assignedList.length }}</span>
              </div>
            </header>

            <ul class="phase-list">
              <li
                v-for="p in filteredAssigned"
                :key="p.id"
                class="phase-item"
              >
                <span class="phase-name" :title="p.name">{{ p.name }}</span>
                <button class="btn danger" @click="removePhase(p.id)">
                  <i class="fas fa-minus-circle"></i>
                  Retirer
                </button>
              </li>

              <li v-if="!assignedList.length && selectedModuleId" class="empty">
                Aucune phase assignée à ce module.
              </li>
              <li v-if="selectedModuleId && assignedList.length && !filteredAssigned.length" class="empty">
                Aucun résultat pour “{{ qAssigned }}”.
              </li>
              <li v-if="!selectedModuleId" class="empty">
                Sélectionne d’abord un module.
              </li>
            </ul>
          </section>

          <!-- Droite : phases disponibles -->
          <section class="phase-box">
            <header class="phase-box__head">
              <div class="phase-box__title">
                Phases disponibles
                <span class="count-badge">{{ availableList.length }}</span>
              </div>
            </header>
            <ul class="phase-list">
              <li
                v-for="p in filteredAvailable"
                :key="p.id"
                class="phase-item"
              >
                <span class="phase-name" :title="p.name">{{ p.name }}</span>
                <button class="btn primary" @click="addPhase(p.id)">
                  <i class="fas fa-plus-circle"></i>
                  Ajouter
                </button>
              </li>

              <li v-if="!availableList.length && selectedModuleId" class="empty">
                Aucune phase disponible.
              </li>
              <li v-if="selectedModuleId && availableList.length && !filteredAvailable.length" class="empty">
                Aucun résultat pour “{{ qAvailable }}”.
              </li>
              <li v-if="!selectedModuleId" class="empty">
                Sélectionne d’abord un module.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { moduleService } from '@/domain/services/moduleService';
import { useListModules } from '@/composables/useListModules';
import { showToast } from '@/shared/utils/toast';

type Phase = { id: number; name: string };

const { allModules, fetchAllModules } = useListModules();

const selectedModuleId = ref<number | ''>('');
const assignedList = ref<Phase[]>([]);
const availableList = ref<Phase[]>([]);
const qAssigned = ref('');
const qAvailable = ref('');

const filteredAssigned = computed(() => {
  const q = qAssigned.value.trim().toLowerCase();
  return q ? assignedList.value.filter(p => p.name.toLowerCase().includes(q)) : assignedList.value;
});

const filteredAvailable = computed(() => {
  const q = qAvailable.value.trim().toLowerCase();
  return q ? availableList.value.filter(p => p.name.toLowerCase().includes(q)) : availableList.value;
});

const loadPhases = async () => {
  if (!selectedModuleId.value) return;
  try {
    const response = await moduleService.getPhases(selectedModuleId.value);
    assignedList.value = response.assigned?.phases ?? [];
    availableList.value = response.unassigned?.phases ?? [];
  } catch (err: any) {
    showToast(err?.message || 'Erreur lors du chargement des phases', { type: 'error' });
  }
};

const addPhase = async (phaseId: number) => {
  if (!selectedModuleId.value) return;
  try {
    await moduleService.attachPhase(selectedModuleId.value, phaseId);
    await loadPhases();
    showToast('Phase ajoutée avec succès', { type: 'success' });
  } catch (err: any) {
    showToast(err?.message || 'Erreur lors de l’ajout de la phase', { type: 'error' });
  }
};

const removePhase = async (phaseId: number) => {
  if (!selectedModuleId.value) return;
  try {
    await moduleService.detachPhase(selectedModuleId.value, phaseId);
    await loadPhases();
    showToast('Phase retirée avec succès', { type: 'success' });
  } catch (err: any) {
    showToast(err?.message || 'Erreur lors du retrait de la phase', { type: 'error' });
  }
};

onMounted(() => {
  fetchAllModules();
});
</script>


<style scoped>
.main-wrapper-man { flex: 1; padding: 10px; background: #f9fafb; }
.container-man { max-width: 1120px; margin: 0 auto; padding: 0 8px; }
.container-man h1 { font-size: 1.4rem; font-weight: 700; color: #111827; margin: 12px 0 14px; }

.card { background: #fff; border: 1px solid #f3f4f6; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.06); padding: 14px; }
.card.card-disabled { opacity: .6; pointer-events: none; }

.select-card { margin-bottom: 10px; }
.label { display: block; font-size: .9rem; color: #374151; margin-bottom: 6px; }
.select { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: .95rem; }

.assign-grid { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
@media (max-width: 640px) { .assign-grid { grid-template-columns: 1fr; } }

.phase-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
.phase-box__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.phase-box__title { font-weight: 600; color: #111827; display: inline-flex; align-items: center; gap: 8px; }
.count-badge { background: #111827; color: #fff; font-size: .75rem; padding: 2px 8px; border-radius: 9999px; }
.phase-box__search { position: relative; margin-bottom: 8px; }
.phase-box__search i { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: .9rem; color: #6b7280; }
.input { width: 100%; border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 10px 8px 32px; font-size: .95rem; }

.phase-list { list-style: none; margin: 0; padding: 0; max-height: 360px; overflow: auto; }
.phase-item { display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; }
.phase-name { font-weight: 500; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.empty { padding: 10px; font-size: .9rem; color: #6b7280; text-align: center; border: 1px dashed #e5e7eb; border-radius: 8px; }

.btn { border: 1px solid transparent; border-radius: 8px; padding: 8px 10px; font-size: .9rem; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: .15s ease; }
.btn.primary { background: var(--ceet-blue, #0056b3); color: #fff; }
.btn.primary:hover { background: var(--ceet-blue-dark, #004494); }
.btn.danger { background: #fee2e2; color: #b91c1c; border-color: #fecaca; }
.btn.danger:hover { background: #fecaca; }

.form-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
@media (max-width: 640px) { .container-man { padding: 0 8px; } .form-actions { justify-content: center; } .btn.big { width: 100%; justify-content: center; } }
</style>
