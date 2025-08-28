<template>
  <div class="container-man">
    <h1>Gestion des Feedbacks</h1>

    <!-- Filters collapsible -->
    <div class="filters mobile-collapsible">
      <button class="collapse-btn" @click="toggleFilters">
        Filtres <span>{{ showFilters ? "-" : "+" }}</span>
      </button>
      <div v-if="showFilters" class="filter-fields">
        <input v-model="searchText" type="text" placeholder="Rechercher feedback" />
        <input v-model="filterDate" type="date" />
        <select v-model="filterStatus">
          <option value="">Tous les statuts</option>
          <option value="resolved">Résolu</option>
          <option value="unresolved">En attente</option>
        </select>
        <button @click="applyFilters">Filtrer</button>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="table-wrapper desktop-only">
      <table class="table-man">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feedback in filteredFeedbacks" :key="feedback.id">
            <td>{{ feedback.id }}</td>
            <td>{{ feedback.client }}</td>
            <td>
              <div class="message-cell" @click="openMessageModal(feedback)">
                {{ truncateMessage(feedback.message, 20) }}
              </div>
            </td>
            <td>{{ feedback.date }}</td>
            <td>
              <select class="status-select" v-model="feedback.status">
                <option value="resolved">Résolu</option>
                <option value="unresolved">En attente</option>
              </select>
            </td>
            <td class="actions">
              <button class="btn-edit" @click="openCommentModal(feedback)">
                Commenter
              </button>
              <button class="btn-delete" @click="deleteFeedback(feedback.id)">
                Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="filteredFeedbacks.length === 0">
            <td colspan="6" class="no-data">Aucun feedback trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="mobile-cards mobile-only">
      <div v-for="feedback in filteredFeedbacks" :key="feedback.id" class="card-feedback">
        <div class="card-header">
          <span class="card-id">{{ feedback.id }}</span>
          <span class="card-date">{{ feedback.date }}</span>
        </div>
        <div class="card-body" @click="openMessageModal(feedback)">
          <strong>{{ feedback.client }}</strong>
          <p>{{ truncateMessage(feedback.message, 80) }}</p>
        </div>
        <div class="card-footer">
          <select class="status-select" v-model="feedback.status">
            <option value="resolved">Résolu</option>
            <option value="unresolved">En attente</option>
          </select>
          <div class="actions">
            <button class="btn-edit" @click.stop="openCommentModal(feedback)">
              Commenter
            </button>
            <button class="btn-delete" @click.stop="deleteFeedback(feedback.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <div v-if="filteredFeedbacks.length === 0" class="no-data">
        Aucun feedback trouvé
      </div>
    </div>

    <!-- Export Buttons -->
    <div class="export-btns">
      <button @click="exportCSV">Exporter CSV</button>
      <button @click="exportPDF">Exporter PDF</button>
    </div>

    <!-- Modal Commentaire -->
    <div
      v-if="modalOpen && !isMessageModal"
      class="modal-backdrop"
      @click.self="closeModal"
    >
      <div class="modal-card">
        <button class="modal-close" @click="closeModal">&times;</button>
        <h2>Commenter Feedback</h2>
        <div class="form-group">
          <label for="comment">Commentaire</label>
          <textarea
            id="comment"
            v-model="modalComment"
            placeholder="Écrire un commentaire..."
          ></textarea>
        </div>
        <div class="export-btns">
          <button @click="submitComment">
            <i class="fa fa-paper-plane"></i> Envoyer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Message Complet -->
    <div
      v-if="modalOpen && isMessageModal"
      class="modal-backdrop"
      @click.self="closeModal"
    >
      <div class="modal-card full-screen-mobile">
        <button class="modal-close" @click="closeModal">&times;</button>
        <h2>Message Complet</h2>
        <p class="full-message">{{ currentFeedback?.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Feedback {
  id: string;
  client: string;
  message: string;
  date: string;
  status: "resolved" | "unresolved";
  comment?: string;
}

const feedbacks = ref<Feedback[]>([
  {
    id: "#001",
    client: "John Doe",
    message: "Produit excellent. ".repeat(20),
    date: "2025-08-21",
    status: "resolved",
    comment: "",
  },
  {
    id: "#002",
    client: "Jane Smith",
    message: "Livraison lente. ".repeat(30),
    date: "2025-08-20",
    status: "unresolved",
    comment: "",
  },
]);

const searchText = ref("");
const filterDate = ref("");
const filterStatus = ref("");

const modalOpen = ref(false);
const isMessageModal = ref(false);
const modalComment = ref("");
const currentFeedback = ref<Feedback | null>(null);

const showFilters = ref(false);

const filteredFeedbacks = computed(() => {
  return feedbacks.value.filter((f) => {
    const matchesText = f.message.toLowerCase().includes(searchText.value.toLowerCase());
    const matchesDate = filterDate.value ? f.date === filterDate.value : true;
    const matchesStatus = filterStatus.value ? f.status === filterStatus.value : true;
    return matchesText && matchesDate && matchesStatus;
  });
});

function applyFilters() {}

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function truncateMessage(msg: string, len = 80) {
  return msg.length > len ? msg.slice(0, len) + "…" : msg;
}

function openCommentModal(feedback: Feedback) {
  currentFeedback.value = feedback;
  modalComment.value = feedback.comment || "";
  modalOpen.value = true;
  isMessageModal.value = false;
}

function openMessageModal(feedback: Feedback) {
  currentFeedback.value = feedback;
  modalOpen.value = true;
  isMessageModal.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function submitComment() {
  if (currentFeedback.value) {
    currentFeedback.value.comment = modalComment.value;
    closeModal();
  }
}

function deleteFeedback(id: string) {
  feedbacks.value = feedbacks.value.filter((f) => f.id !== id);
}

function exportCSV() {
  alert("Export CSV à implémenter");
}

function exportPDF() {
  alert("Export PDF à implémenter");
}
</script>

<style scoped>
.container-man {
  padding: 5px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 16px;
}

/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.filters input,
.filters select,
.filters button {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}


.filters button {
  background-color: #0369a1;
  color: white;
  border: none;
  cursor: pointer;
}

.filters button:hover {
  background-color: #0284c7;
}

.mobile-collapsible .collapse-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: #0d1b2a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.filter-fields {
  margin-top: 8px;
  display: flex;

  gap: 8px;
}

/* Table */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 16px;
}

.table-man {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.table-man th,
.table-man td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.message-cell {
  max-height: 150px;
  overflow-y: auto;
  word-break: break-word;
}

.message-cell:hover {
  background-color: #f3f4f6;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  white-space: nowrap;
}

.btn-edit {
  background-color: #e0f2fe;
  color: #0369a1;
}
.btn-edit:hover {
  background-color: #bae6fd;
}
.btn-delete {
  background-color: #fee2e2;
  color: #b91c1c;
}
.btn-delete:hover {
  background-color: #fecaca;
}

.status-select {
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
}

.no-data {
  text-align: center;
  color: #6b7280;
  padding: 20px;
}

/* Mobile Cards */
.mobile-cards {
  display: none;
}

.card-feedback {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f9fafb;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #374151;
}

.card-body p {
  margin: 6px 0;
  line-height: 1.3;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.card-footer .actions {
  display: flex;
  gap: 6px;
}

/* Export */
.export-btns {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}

.export-btns button {
  padding: 8px 14px;
  background-color: #0d1b2a;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.export-btns button:hover {
  background-color: #172c4a;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-card.full-screen-mobile {
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.modal-card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #374151;
}

.modal-close:hover {
  color: #111827;
}

.full-message {
  white-space: pre-wrap;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }
  .btn-edit,
  .btn-delete {
    font-size: 0.9rem;
    padding: 8px 10px;
  }
  .filters input,
  .filters select,
  .filters button {
    font-size: 0.9rem;
    padding: 8px 10px;
  }

  .filter-fields {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

/* Modal Desktop */
@media (min-width: 769px) {
  .modal-card {
    max-width: 600px; /* limite la largeur */
    margin: 40px auto; /* marge sur PC */
    overflow-y: auto; /* scroll si texte long */
  }

  .modal-card.full-screen-mobile {
    max-width: 600px;
    max-height: 80vh;
  }

  .full-message {
    white-space: pre-wrap;
    overflow-y: auto;
    max-height: 70vh;
  }
}
</style>
