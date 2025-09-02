<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "@/assets/css/app-auth.css";

import { useRegisterUser } from "@/composables/useRegisterUser";
import { useListDepartements } from "@/composables/useListDepartements";

import Footer from "@/components/layouts/app-footer.vue";
import AuthNavbar from "@/components/layouts/auth-navbar.vue";

// Icônes mot de passe
const eyeOpen = "/images/other/eye-open.png";
const eyeClose = "/images/other/eye-close.png";

const showPassword = ref(false);
const showConfirm = ref(false);

// Formulaire utilisateur avec departement_id
const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  departement_id: 0,
});

// Composable register
const { register, loading: registerLoading } = useRegisterUser();
const router = useRouter();

// Composable départements
const { allDepartements, fetchAllDepartements, loading: departementLoading } =
  useListDepartements();

const dropdownOpen = ref(false);
const selectedDepartement = ref<string | null>(null);

// Choix du département
const selectDepartement = (departement: any) => {
  form.value.departement_id = departement.id; // ✅ backend reçoit l'ID
  selectedDepartement.value = departement.name; // affichage lisible
  dropdownOpen.value = false;
};

// Charger la liste au montage
onMounted(() => {
  fetchAllDepartements();
});

// Soumission du formulaire
const onSubmit = async () => {
  const success = await register(form.value);
  if (success) {
    form.value = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      departement_id: 0,
    };
    selectedDepartement.value = null;
    router.push({ name: "Home" });
  }
};
</script>

<template>
  <AuthNavbar />
  <main class="main-log">
    <div class="container-login">
      <div class="header">
        <h2><i class="fas fa-user-plus mr-3"></i>Inscription</h2>
        <p>Créez votre compte</p>
      </div>

      <form class="login-form" @submit.prevent="onSubmit" id="registerForm">
        <!-- Nom -->
        <div>
          <label>Nom*</label>
          <input
            type="text"
            v-model="form.last_name"
            placeholder="METONOU"
            required
          />
        </div>

        <!-- Prénom -->
        <div>
          <label>Prénom*</label>
          <input
            type="text"
            v-model="form.first_name"
            placeholder="Alex"
            required
          />
        </div>

        <!-- Département -->
        <div>
          <label>Département/Service*</label>
          <div class="custom-select">
            <div
              class="select-trigger"
              :class="{ open: dropdownOpen }"
              @click="dropdownOpen = !dropdownOpen"
            >
              <span class="select-placeholder">
                {{ selectedDepartement || "Sélectionnez département/service" }}
              </span>
              <i class="fas fa-chevron-down"></i>
            </div>

            <ul class="select-options" :class="{ open: dropdownOpen }">
              <li v-if="departementLoading">Chargement...</li>
              <li
                v-for="dep in allDepartements"
                :key="dep.id"
                @click="selectDepartement(dep)"
              >
                {{ dep.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email">Email*</label>
          <input
            type="email"
            v-model="form.email"
            id="email"
            placeholder="email@exemple.com"
            required
          />
        </div>

        <!-- Mot de passe -->
        <div class="password-field">
          <label for="password">Mot de passe*</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            id="password"
            placeholder="••••••••"
            required
          />
          <img
            :src="showPassword ? eyeOpen : eyeClose"
            alt="toggle"
            class="toggle-eye"
            @click="showPassword = !showPassword"
          />
        </div>

        <!-- Confirmation -->
        <div class="password-field">
          <label for="confirmPassword">Confirmer Mot de passe*</label>
          <input
            :type="showConfirm ? 'text' : 'password'"
            v-model="form.confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            required
          />
          <img
            :src="showConfirm ? eyeOpen : eyeClose"
            alt="toggle"
            class="toggle-eye"
            @click="showConfirm = !showConfirm"
          />
        </div>

        <!-- Lien connexion -->
        <div class="links">
          <router-link to="/login"
            >Déjà un compte ? Connectez-vous</router-link
          >
        </div>

        <!-- Bouton -->
        <div class="btn-container">
          <button type="submit" :disabled="registerLoading">
            <template v-if="!registerLoading">
              <i class="fas fa-user-plus mr-2"></i> S'inscrire
            </template>
            <template v-else>
              <i class="fas fa-spinner fa-spin mr-2"></i> En cours...
            </template>
          </button>
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>
