<template>
  <div class="container-man">
    <h1>Liste des Modules</h1>

    <div class="card">
      <div class="table-wrapper">
        <!-- Loader liste -->
        <div v-if="listLoading" class="loader-message">
          <i class="fas fa-spinner fa-spin mr-2"></i> Chargement des modules...
        </div>

        <!-- Table -->
        <table v-else class="table-man">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mod in modules" :key="mod.id">
              <td>{{ mod.name }}</td>
              <td>{{ mod.description }}</td>
              <td class="actions">
                <button class="btn-edit" @click="openUpdateModal(mod)">
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button
                  class="btn-delete"
                  @click="handleDelete(mod.id, fetchModules)"
                  :disabled="deletingIds.has(mod.id)"
                >
                  <i v-if="deletingIds.has(mod.id)" class="fas fa-spinner fa-spin mr-2"></i>
                  <i v-else class="fas fa-trash"></i>
                  {{ confirmingIds.has(mod.id) ? 'Confirmer' : 'Supprimer' }}
                </button>
              </td>
            </tr>
            <tr v-if="!modules.length">
              <td colspan="3" class="text-center">Aucun module trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="lastPage > 1" class="pagination mt-4">
        <button :disabled="currentPage === 1 || listLoading" @click="fetchModules(currentPage - 1)">‹</button>
        <button
          v-for="page in pagesToShow"
          :key="page"
          :class="{ active: page === currentPage, dots: page === '...' }"
          :disabled="page === '...' || listLoading"
          @click="page !== '...' && fetchModules(page)"
        >
          {{ page }}
        </button>
        <button :disabled="currentPage === lastPage || listLoading" @click="fetchModules(currentPage + 1)">›</button>
      </div>

      <!-- Ajouter un module -->
      <div class="form-actions mt-4">
        <button @click="openCreateModal">
          <i class="fas fa-plus"></i> Ajouter un Module
        </button>
      </div>
    </div>

    <!-- Modal Création / Mise à jour -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-card">
        <h2>{{ isEditing ? 'Modifier le Module' : 'Créer un Nouveau Module' }}</h2>
        <form @submit="onSubmit">

       <div class="form-group">
  <label for="departement">Département*</label>
  <select id="departement" v-model="form.departement_id" required :disabled="deptLoading">
    <option value="" disabled selected hidden>-- Sélectionnez un département --</option>
    <option
      v-for="dept in allDepartements"
      :key="dept.id"
      :value="dept.id"
    >
      {{ dept.name }}
    </option>
  </select>
  <i v-if="deptLoading" class="fas fa-spinner fa-spin ml-2"></i>
</div>


          <div class="form-group">
            <label for="name">Nom du Module*</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Ex: Gestion des Utilisateurs"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Description du module..."
              rows="4"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="createLoading || updateLoading">
              <i v-if="createLoading || updateLoading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-save mr-2"></i>
              {{ isEditing
                ? updateLoading ? 'Mise à jour...' : 'Mettre à jour'
                : createLoading ? 'Création...' : 'Ajouter Module' }}
            </button>
          </div>
        </form>
        <button class="modal-close" @click="closeModal">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import '@/assets/css/app-managment.css';
import { useCreateModule } from '@/composables/useCreateModule';
import { useUpdateModule } from '@/composables/useUpdateModule';
import { useDeleteModule } from '@/composables/useDeleteModule';
import { useListModules } from '@/composables/useListModules';
import { Module } from '@/domain/models/Module';
import { useListDepartements } from '@/composables/useListDepartements';


// Création et mise à jour
const { create, loading: createLoading } = useCreateModule();
const { update, loading: updateLoading } = useUpdateModule();

// Liste modules
const { modules, currentPage, lastPage, perPage, total, fetchModules, loading: listLoading } = useListModules();
// Suppression
const { handleDelete, confirmingIds, deletingIds } = useDeleteModule(modules, currentPage, perPage, total, lastPage);
// Liste s
const { allDepartements, fetchAllDepartements, loading: deptLoading } = useListDepartements();
fetchAllDepartements();
const showModal = ref(false);
const isEditing = ref(false);
const selectedModuleId = ref<number | null>(null);

const form = ref<Partial<Module>>({ name: '', description: '' });

// Modals
const openCreateModal = () => {
  isEditing.value = false;
  form.value = { name: '', description: '' };
  showModal.value = true;
};

const openUpdateModal = (mod: Module) => {
  isEditing.value = true;
  selectedModuleId.value = mod.id || null;
  form.value = { ...mod };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { name: '', description: '' };
  selectedModuleId.value = null;
};

// Submit
const onSubmit = async (e: Event) => {
  e.preventDefault();

  if (isEditing.value && selectedModuleId.value) {
    const updatedMod = await update(selectedModuleId.value, form.value);
    if (updatedMod) {
      const index = modules.value.findIndex(mod => mod.id === updatedMod.id);
      if (index !== -1) modules.value.splice(index, 1, updatedMod);
      closeModal();
    }
  } else {
    const newMod = await create(form.value);
    if (newMod && newMod.data) {
      modules.value.push(newMod.data);
      total.value += 1;
      lastPage.value = Math.ceil(total.value / perPage.value);
      closeModal();
    }
  }

  (e.target as HTMLFormElement).reset();
};

// Pagination type 1 ... 2 3 ... lastPage
const pagesToShow = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = [];
  if (lastPage.value <= 7) {
    for (let i = 1; i <= lastPage.value; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage.value > 4) pages.push('...');
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(lastPage.value - 1, currentPage.value + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage.value < lastPage.value - 3) pages.push('...');
    pages.push(lastPage.value);
  }
  return pages;
});

fetchModules(1);
</script>
