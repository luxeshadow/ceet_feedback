<template>
  <div class="container-man">
    <h1>Liste des Départements</h1>

    <div class="card">
      <div class="table-wrapper">
        <!-- Loader liste -->
        <div v-if="listLoading" class="loader-message">
          <i class="fas fa-spinner fa-spin mr-2"></i> Chargement des départements...
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
            <tr v-for="dep in departements" :key="dep.id">
              <td>{{ dep.name }}</td>
              <td>{{ dep.description }}</td>
              <td class="actions">
                <button class="btn-edit" @click="openUpdateModal(dep)">
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button
                  class="btn-delete"
                  @click="handleDelete(dep.id, fetchDepartements)"
                  :disabled="deletingIds.has(dep.id)"
                >
                  <i v-if="deletingIds.has(dep.id)" class="fas fa-spinner fa-spin mr-2"></i>
                  <i v-else class="fas fa-trash"></i>
                  {{ confirmingIds.has(dep.id) ? 'Confirmer' : 'Supprimer' }}
                </button>
              </td>
            </tr>
            <tr v-if="!departements.length">
              <td colspan="3" class="text-center">Aucun département trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="lastPage > 1" class="pagination mt-4">
        <button :disabled="currentPage === 1 || listLoading" @click="fetchDepartements(currentPage - 1)">‹</button>
        <button
          v-for="page in pagesToShow"
          :key="page"
          :class="{ active: page === currentPage, dots: page === '...' }"
          :disabled="page === '...' || listLoading"
          @click="page !== '...' && fetchDepartements(page)"
        >
          {{ page }}
        </button>
        <button :disabled="currentPage === lastPage || listLoading" @click="fetchDepartements(currentPage + 1)">›</button>
      </div>

      <!-- Ajouter un département -->
      <div class="form-actions mt-4">
        <button @click="openCreateModal">
          <i class="fas fa-plus"></i> Ajouter un Département
        </button>
      </div>
    </div>

    <!-- Modal Création / Mise à jour -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-card">
        <h2>{{ isEditing ? 'Modifier le Département' : 'Créer un Nouveau Département' }}</h2>
        <form @submit="onSubmit">
          <div class="form-group">
            <label for="name">Nom du Département*</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Ex: Ressources Humaines"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Description du département..."
              rows="4"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="createLoading || updateLoading">
              <i v-if="createLoading || updateLoading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-save mr-2"></i>
              {{ isEditing
                ? updateLoading ? 'Mise à jour...' : 'Mettre à jour'
                : createLoading ? 'Création...' : 'Ajouter Département' }}
            </button>
          </div>
        </form>
        <button class="modal-close" @click="closeModal">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue';
import '@/assets/css/app-managment.css';
import { useCreateDepartement } from '@/composables/useCreateDepartement';
import { useUpdateDepartement } from '@/composables/useUpdateDepartement';
import { useListDepartements } from '@/composables/useListDepartements';
import { useDeleteDepartement } from '@/composables/useDeleteDepartement';
import type { Departement } from '@/domain/models/Departement';

const { create, loading: createLoading } = useCreateDepartement();
const { update, loading: updateLoading } = useUpdateDepartement();
const { departements, currentPage, lastPage, perPage, total, fetchDepartements, loading: listLoading } = useListDepartements();

// Composable delete typé
const { handleDelete, confirmingIds, deletingIds } = useDeleteDepartement(
  departements,
  currentPage,
  perPage,
  total,
  lastPage
);

const showModal = ref(false);
const isEditing = ref(false);
const selectedDepartementId = ref<number | null>(null);

const form = ref<Partial<Departement>>({ name: '', description: '' });

// Modals
const openCreateModal = () => {
  isEditing.value = false;
  form.value = { name: '', description: '' };
  showModal.value = true;
};

const openUpdateModal = (dep: Departement) => {
  isEditing.value = true;
  selectedDepartementId.value = dep.id || null;
  form.value = { ...dep };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { name: '', description: '' };
  selectedDepartementId.value = null;
};

// Submit form
const onSubmit = async (e: Event) => {
  e.preventDefault();

  if (isEditing.value && selectedDepartementId.value) {
    const updatedDep = await update(selectedDepartementId.value, form.value);
    if (updatedDep) {
      const index = departements.value.findIndex(dep => dep.id === updatedDep.id);
      if (index !== -1) departements.value.splice(index, 1, updatedDep);
      closeModal();
    }
  } else {
    const newDep = await create(form.value);
    if (newDep && newDep.data) {
      departements.value.push(newDep.data);
      total.value += 1;
      lastPage.value = Math.ceil(total.value / perPage.value);
      closeModal();
    }
  }

  (e.target as HTMLFormElement).reset();
};

// Pagination
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

fetchDepartements(1);
</script>
