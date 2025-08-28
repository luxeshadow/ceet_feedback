<template>
  <div class="container">
    <!-- KPIs -->
    <section class="card">
      <div class="kpis">
        <div class="kpi">
          <div class="label"><i class="fas fa-users mr-2"></i>Utilisateurs</div>
          <div class="value">{{ formatNumber(stats.users) }}</div>
        </div>
        <div class="kpi">
          <div class="label"><i class="fas fa-cubes mr-2"></i>Modules</div>
          <div class="value">{{ formatNumber(stats.modules) }}</div>
        </div>
        <div class="kpi">
          <div class="label"><i class="fas fa-building mr-2"></i>Départements</div>
          <div class="value">{{ formatNumber(stats.departments) }}</div>
        </div>
        <div class="kpi">
          <div class="label"><i class="fas fa-comments mr-2"></i>Feedback total</div>
          <div class="value">{{ formatNumber(stats.feedback_total) }}</div>
        </div>
      </div>
    </section>

    <!-- Résolution & Top modules -->
    <section class="grid">
      <div class="card">
        <strong><i class="fas fa-chart-pie mr-2"></i>Statut des feedbacks</strong>
        <div class="sub">
          <span><i class="fas fa-check-circle text-green-600 mr-1"></i>{{ formatNumber(stats.resolved) }}</span> résolus •
          <span><i class="fas fa-clock text-red-600 mr-1"></i>{{ formatNumber(stats.pending) }}</span> en attente
        </div>
        <div class="progress">
          <div class="bar" :style="{ width: resolutionRate + '%' }"></div>
        </div>
        <div class="sub">{{ resolutionRate }}% résolus</div>
      </div>
      <div class="card panel">
        <h2><i class="fas fa-star mr-2"></i>Top modules</h2>
        <div class="list">
          <div v-for="module in topModules" :key="module.id" class="row">
            <div>
              <div class="title" :title="module.name">
                <i class="fas fa-cube mr-2"></i>{{ module.name }}
              </div>
              <div class="spark">
                <i :style="{ width: getPercentage(module.count, maxModuleCount) + '%' }"></i>
              </div>
            </div>
            <div class="count">{{ formatNumber(module.count) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules & Départements -->
    <section class="grid">
      <div class="card panel">
        <h2><i class="fas fa-cubes mr-2"></i>Feedback par module</h2>
        <div class="input-container">
          <i class="fas fa-search input-icon"></i>
          <input
            v-model="moduleSearch"
            class="input"
            placeholder="Rechercher un module…"
          />
        </div>
        <div class="list">
          <div v-for="module in filteredModules" :key="module.id" class="row">
            <div>
              <div class="title" :title="module.name">
                <i class="fas fa-cube mr-2"></i>{{ module.name }}
              </div>
              <div class="spark">
                <i :style="{ width: getPercentage(module.count, maxModuleCount) + '%' }"></i>
              </div>
            </div>
            <div class="count">{{ formatNumber(module.count) }}</div>
          </div>
        </div>
      </div>
      <div class="card panel">
        <h2><i class="fas fa-building mr-2"></i>Feedback par département</h2>
        <div class="input-container">
          <i class="fas fa-search input-icon"></i>
          <input
            v-model="departmentSearch"
            class="input"
            placeholder="Rechercher un département…"
          />
        </div>
        <div class="list">
          <div v-for="dept in filteredDepartments" :key="dept.id" class="row">
            <div>
              <div class="title" :title="dept.name">
                <i class="fas fa-building mr-2"></i>{{ dept.name }}
              </div>
              <div class="spark">
                <i :style="{ width: getPercentage(dept.count, maxDepartmentCount) + '%' }"></i>
              </div>
            </div>
            <div class="count">{{ formatNumber(dept.count) }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interfaces for data structure
interface Module {
  id: number;
  name: string;
  count: number;
}

interface Department {
  id: number;
  name: string;
  count: number;
}

interface Stats {
  users: number;
  modules: number;
  departments: number;
  feedback_total: number;
  resolved: number;
  pending: number;
}

// Reactive data
const stats = ref<Stats>({
  users: 1260,
  modules: 0,
  departments: 0,
  feedback_total: 0,
  resolved: 730,
  pending: 410,
});

const modules = ref<Module[]>([
  { id: 1, name: 'Module Accueil', count: 34 },
  { id: 2, name: 'Module Paiement', count: 120 },
  { id: 3, name: 'Module Réclamations', count: 265 },
  { id: 4, name: 'Module Abonnés', count: 80 },
  { id: 5, name: 'Module Technique', count: 17 },
  { id: 6, name: 'Module Maintenance', count: 52 },
  { id: 7, name: 'Module Mobile', count: 11 },
]);

const departments = ref<Department[]>(
  Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    name: `Département ${String(i + 1).padStart(3, '0')}`,
    count: Math.floor(Math.random() * 150),
  }))
);

// Update stats based on modules and departments
stats.value.modules = modules.value.length;
stats.value.departments = departments.value.length;
stats.value.feedback_total =
  modules.value.reduce((a, b) => a + b.count, 0) +
  departments.value.reduce((a, b) => a + b.count, 0);

// Computed properties
const resolutionRate = computed(() => {
  const total = stats.value.resolved + stats.value.pending;
  return total ? Math.round((stats.value.resolved / total) * 100) : 0;
});

const topModules = computed(() =>
  [...modules.value].sort((a, b) => b.count - a.count).slice(0, 6)
);

const maxModuleCount = computed(() =>
  modules.value.reduce((max, module) => Math.max(max, module.count), 0)
);

const maxDepartmentCount = computed(() =>
  departments.value.reduce((max, dept) => Math.max(max, dept.count), 0)
);

// Search functionality
const moduleSearch = ref('');
const departmentSearch = ref('');

const filteredModules = computed(() =>
  moduleSearch.value
    ? modules.value.filter((m) =>
        m.name.toLowerCase().includes(moduleSearch.value.toLowerCase())
      )
    : modules.value
);

const filteredDepartments = computed(() =>
  departmentSearch.value
    ? departments.value.filter((d) =>
        d.name.toLowerCase().includes(departmentSearch.value.toLowerCase())
      )
    : departments.value
);

// Helper functions
const formatNumber = (num: number): string =>
  new Intl.NumberFormat('fr-FR').format(num);

const getPercentage = (count: number, max: number): number =>
  max ? Math.round((count / max) * 100) : 0;
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;
}

.card {
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  padding: 12px;
  background: #fff;
  
}

.kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.kpi .label {
  font-size: 1rem;
  color: #374151;
  display: flex;
  align-items: center;
}

.kpi .value {
  font-size: 1.2rem;
  font-weight: 700;
}

.progress {
  width: 100%;
  height: 8px;
  background: #ccc; /* gris clair pour la partie vide */
  border-radius: 6px;
  overflow: hidden;
  border: none; /* optionnel, enlève le petit contour */
}


.bar {
  height: 100%;
  background: var(--ceet-yellow);
}

.panel h2 {
  font-size: 1rem;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  color: #374151;
}

.input-container {
  position: relative;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  padding: 8px 10px 8px 32px; /* Adjusted padding for icon */
  font: inherit;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #374151;
  font-size: 0.9rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 360px;
  overflow: auto;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
}

.title {
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.spark {
  margin-top: 4px;
  height: 6px;
  background: #ccc; /* gris clair mais bien visible */
  border-radius: 6px;
  overflow: hidden;
}

.spark i {
  display: block;
  height: 100%;
  background: var(--ceet-blue);
}

.count {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.sub {
  color: #374151;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 9px;
  margin-top: 9px;
}

.grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

@media (max-width: 640px) {
  .container {
    padding: 1px;
  }
}
</style>