
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import "@/assets/css/app-auth.css";
import { useRegisterUser } from "@/composables/useRegisterUser";
import Footer from "@/components/layouts/app-footer.vue";
import AuthNavbar from "@/components/layouts/auth-navbar.vue";

const eyeOpen = "/images/other/eye-open.png";
const eyeClose = "/images/other/eye-close.png";

const showPassword = ref(false);
const showConfirm = ref(false);

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const { register, loading } = useRegisterUser();
const router = useRouter(); 

const onSubmit = async () => {
  const success = await register(form.value);
  if (success) {
    form.value = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
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
        <div>
          <label>Nom*</label>
          <input type="text" v-model="form.last_name" placeholder="METONOU" required />
        </div>
        <div>
          <label>Prénom*</label>
          <input type="text" v-model="form.first_name" placeholder="Alex" required />
        </div>
        <div>
          <label for="email">Email*</label>
          <input type="email" v-model="form.email" id="email" placeholder="email@exemple.com" required />
        </div>
        <div class="password-field">
          <label for="password">Mot de passe*</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="form.password" id="password" placeholder="••••••••" required/>
          <img :src="showPassword ? eyeOpen : eyeClose" alt="toggle" class="toggle-eye" @click="showPassword = !showPassword"/>
        </div>
        <div class="password-field">
          <label for="confirmPassword">Confirmer Mot de passe*</label>
          <input :type="showConfirm ? 'text' : 'password'" v-model="form.confirmPassword" id="confirmPassword" placeholder="••••••••" required/>
          <img :src="showConfirm ? eyeOpen : eyeClose" alt="toggle" class="toggle-eye" @click="showConfirm = !showConfirm" />
        </div>
        <div class="links">
           <router-link to="/login">Déjà un compte ? Connectez-vous</router-link>
        </div>
        <div class="btn-container">
          <button type="submit" :disabled="loading">
            <template v-if="!loading"> <i class="fas fa-user-plus mr-2"></i> S'inscrire </template>
            <template v-else> <i class="fas fa-spinner fa-spin mr-2"></i> En cours... </template>
          </button>
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>


