<template>
  <AuthNavbar />
  <main>
    <div class="main-container">
      <div class="content-box">
        <div class="content-header">
          <h2><i class="fas fa-comment-medical" aria-hidden="true"></i> Voir Mes Feedbacks</h2>
          <p>Consultez vos retours utilisateurs</p>
        </div>

        <!-- Filtres -->
        <div class="filters">
          <div class="filter-grid">
            <div>
              <div class="search-container">
                <input
                  type="text"
                  id="search"
                  placeholder="Rechercher feedback par groupe..."
                  autocomplete="off"
                  class="search-input"
                  v-model="searchTerm"
                  aria-label="Rechercher feedback par groupe"
                >
                <span class="search-icon"><i class="fi fi-rr-search"></i></span>
              </div>
            </div>
            <input
              v-if="isAuthenticated"
              type="date"
              class="date-input"
              v-model="filterDate"
              autocomplete="off"
              aria-label="Filtrer par date"
            >
            <button class="filter-btn" @click="searchByGroup" :disabled="loading">Rechercher</button>
          </div>
        </div>

        <!-- Message d'erreur ou absence de feedback -->
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="!filteredFeedbacks.length && !loading" class="no-feedback">
          Aucun feedback trouvé.
        </div>

        <div class="feedback-list" v-else>
          <div v-for="fb in filteredFeedbacks" :key="fb.id" class="feedback-card-feed">
            <div class="feedback-header-feed">
              <div class="feedback-info">
                <div>
                  <h3 class="feedback-title">{{ fb.description }}</h3>
                  <p class="feedback-meta">{{ formatMeta(fb) }}</p>
                </div>
              </div>
              <span :class="['feedback-status', fb.status === 'Attente' ? 'status-pending' : 'status-resolved']">
                {{ fb.status }}
              </span>
            </div>

            <p class="feedback-content">{{ fb.description }}</p>

            <div class="feedback-actions">
              <button class="view-comment-btn" @click="toggleComment(fb.id)">
                {{ visibleComments.has(fb.id) ? 'Cacher les commentaires' : 'Voir les commentaires' }}
              </button>
            </div>

            <div class="admin-comment" v-show="visibleComments.has(fb.id)">
              <div v-for="comment in fb.comments" :key="comment.id" class="comment-item">
                <p><strong>{{ comment.userName || 'Admin' }}:</strong> {{ comment.comment }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="lastPage > 1" class="pagination mt-4">
          <button :disabled="currentPage === 1 || loading" @click="goToPage(currentPage - 1)">‹</button>
          <button
            v-for="page in pagesToShow"
            :key="page"
            :class="{ active: page === currentPage, dots: page === '...' }"
            :disabled="page === '...' || loading"
            @click="page !== '...' && goToPage(page)"
          >
            {{ page }}
          </button>
          <button :disabled="currentPage === lastPage || loading" @click="goToPage(currentPage + 1)">›</button>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/presentation/stores/userStore';
import Footer from '@/components/layouts/app-footer.vue';
import AuthNavbar from '@/components/layouts/auth-navbar.vue';
import '@/assets/css/app-feedback-list.css';
import { useListFeedback } from '@/composables/useListFeedback';

// Interface pour les feedbacks
interface Feedback {
  id: number;
  description: string;
  status: 'Attente' | 'Résolu';
  created_at?: string;
  user?: { name: string };
  departement?: { name: string };
  comments: { id: number; userName?: string; comment: string }[];
}

// Store utilisateur
const userStore = useUserStore();
const isAuthenticated = computed(() => !!userStore.user && !!userStore.token);

// Feedbacks et pagination
const { feedbacks, fetchMyFeedbacks, fetchByGroupId, currentPage, lastPage, goToPage, loading } = useListFeedback();
const error = ref<string | null>(null);

// Gestion des commentaires
const visibleComments = ref<Set<number>>(new Set());
const toggleComment = (id: number) => {
  if (visibleComments.value.has(id)) {
    visibleComments.value.delete(id);
  } else {
    visibleComments.value.add(id);
  }
};

// Filtres
const searchTerm = ref('');
const filterDate = ref('');

// Recherche côté frontend
const filteredFeedbacks = computed<Feedback[]>(() => {
  let result = feedbacks.value;
  
  if (isAuthenticated.value) {
    result = result.filter(fb => {
      const matchesSearch = fb.description.toLowerCase().includes(searchTerm.value.toLowerCase());
      const matchesDate = filterDate.value ? fb.created_at?.startsWith(filterDate.value) : true;
      return matchesSearch && matchesDate;
    });
  }
  
  return result;
});

// Formater les métadonnées
const formatMeta = (fb: Feedback) => {
  const user = fb.user?.name || 'Utilisateur';
  const dept = fb.departement?.name || 'Non spécifié';
  const date = fb.created_at?.split('T')[0] || 'Date inconnue';
  return `${user} • ${dept} • ${date}`;
};

// Recherche par groupe
const searchByGroup = async () => {
  if (!searchTerm.value.trim()) {
    error.value = 'Veuillez entrer un terme de recherche.';
    return;
  }
  error.value = null;
  try {
    await fetchByGroupId(searchTerm.value.trim());
  } catch (err) {
    error.value = 'Erreur lors de la recherche par groupe.';
    console.error(err);
  }
};

// Pagination dynamique
const pagesToShow = computed(() => {
  const totalPages = lastPage.value;
  const current = currentPage.value;
  const delta = 2;
  const range: (number | string)[] = [];
  let lastPageAdded: number;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  const pages: (number | string)[] = [];
  range.forEach((i) => {
    if (lastPageAdded) {
      if (i - lastPageAdded === 2) {
        pages.push(lastPageAdded + 1);
      } else if (i - lastPageAdded > 2) {
        pages.push('...');
      }
    }
    pages.push(i);
    lastPageAdded = i as number;
  });

  return pages;
});

// Charger les feedbacks au montage
onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      await fetchMyFeedbacks();
    } catch (err) {
      error.value = 'Erreur lors du chargement des feedbacks.';
      console.error(err);
    }
  }
});
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  margin: 1rem 0;
}
.no-feedback {
  text-align: center;
  color: #666;
  margin: 1rem 0;
}
</style>