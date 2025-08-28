<template>
  <div class="container-man">
    <h1>Liste des TypeFeedbacks</h1>

    <div class="card">
      <div class="table-wrapper">
        <!-- Loader liste -->
        <div v-if="listLoading" class="loader-message">
          <i class="fas fa-spinner fa-spin mr-2"></i> Chargement des typeFeedbacks...
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
            <tr v-for="tf in typeFeedbacks" :key="tf.id">
              <td>{{ tf.name }}</td>
              <td>{{ tf.description }}</td>
              <td class="actions">
                <button class="btn-edit" @click="openUpdateModal(tf)">
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button
                  class="btn-delete"
                  @click="handleDelete(tf.id, fetchTypeFeedbacks)"
                  :disabled="deletingIds.has(tf.id)"
                >
                  <i v-if="deletingIds.has(tf.id)" class="fas fa-spinner fa-spin mr-2"></i>
                  <i v-else class="fas fa-trash"></i>
                  {{ confirmingIds.has(tf.id) ? 'Confirmer' : 'Supprimer' }}
                </button>
              </td>
            </tr>
            <tr v-if="!typeFeedbacks.length">
              <td colspan="3" class="text-center">Aucun typeFeedback trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="lastPage > 1" class="pagination mt-4">
        <button :disabled="currentPage === 1 || listLoading" @click="fetchTypeFeedbacks(currentPage - 1)">‹</button>
        <button
          v-for="page in pagesToShow"
          :key="page"
          :class="{ active: page === currentPage, dots: page === '...' }"
          :disabled="page === '...' || listLoading"
          @click="page !== '...' && fetchTypeFeedbacks(page)"
        >
          {{ page }}
        </button>
        <button :disabled="currentPage === lastPage || listLoading" @click="fetchTypeFeedbacks(currentPage + 1)">›</button>
      </div>

      <!-- Ajouter un TypeFeedback -->
      <div class="form-actions mt-4">
        <button @click="openCreateModal">
          <i class="fas fa-plus"></i> Ajouter un TypeFeedback
        </button>
      </div>
    </div>

    <!-- Modal Création / Mise à jour -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-card">
        <h2>{{ isEditing ? 'Modifier le TypeFeedback' : 'Créer un Nouveau TypeFeedback' }}</h2>
        <form @submit="onSubmit">
          <div class="form-group">
            <label for="name">Nom du TypeFeedback*</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Ex: Feedback de satisfaction"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              placeholder="Description du typeFeedback..."
              rows="4"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="createLoading || updateLoading">
              <i v-if="createLoading || updateLoading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-save mr-2"></i>
              {{ isEditing
                ? updateLoading ? 'Mise à jour...' : 'Mettre à jour'
                : createLoading ? 'Création...' : 'Ajouter TypeFeedback' }}
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
import { useCreateTypeFeedback } from '@/composables/useCreateTypeFeedback';
import { useUpdateTypeFeedback } from '@/composables/useUpdateTypeFeedback';
import { useDeleteTypeFeedback } from '@/composables/useDeleteTypeFeedback';
import { useListTypeFeedbacks } from '@/composables/useListTypeFeedbacks';
import { TypeFeedback } from '@/domain/models/TypeFeedback';

// Création et mise à jour
const { create, loading: createLoading } = useCreateTypeFeedback();
const { update, loading: updateLoading } = useUpdateTypeFeedback();

// Liste typeFeedbacks
const { typeFeedbacks, currentPage, lastPage, perPage, total, fetchTypeFeedbacks, loading: listLoading } = useListTypeFeedbacks();

// Suppression
const { handleDelete, confirmingIds, deletingIds } = useDeleteTypeFeedback(typeFeedbacks, currentPage, perPage, total, lastPage);

const showModal = ref(false);
const isEditing = ref(false);
const selectedTypeFeedbackId = ref<number | null>(null);

const form = ref<Partial<TypeFeedback>>({ name: '', description: '' });

// Modals
const openCreateModal = () => {
  isEditing.value = false;
  form.value = { name: '', description: '' };
  showModal.value = true;
};

const openUpdateModal = (tf: TypeFeedback) => {
  isEditing.value = true;
  selectedTypeFeedbackId.value = tf.id || null;
  form.value = { ...tf };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { name: '', description: '' };
  selectedTypeFeedbackId.value = null;
};

// Submit
const onSubmit = async (e: Event) => {
  e.preventDefault();

  if (isEditing.value && selectedTypeFeedbackId.value) {
    const updatedTF = await update(selectedTypeFeedbackId.value, form.value);
    if (updatedTF) {
      const index = typeFeedbacks.value.findIndex(t => t.id === updatedTF.id);
      if (index !== -1) typeFeedbacks.value.splice(index, 1, updatedTF);
      closeModal();
    }
  } else {
    const newTF = await create(form.value);
    if (newTF && newTF.data) {
      typeFeedbacks.value.push(newTF.data);
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

fetchTypeFeedbacks(1);
</script>
