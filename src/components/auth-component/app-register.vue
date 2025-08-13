<template>
  <authNavbar/>
  <main>
    <div class="container-login">
      <div class="header">
        <h2><i class="fas fa-user-plus mr-3"></i>Inscription</h2>
        <p>Créez votre compte</p>
      </div>

      <form id="registerForm">
        <div>
          <label>Nom*</label>
          <input type="text" placeholder="METONOU" required />
        </div>
        <div>
          <label>Prenom*</label>
          <input type="text" placeholder="Alex" required />
        </div>
        <div>
          <label for="email">Email*</label>
          <input type="email" id="email" placeholder="email@exemple.com" required />
        </div>
        <div class="password-field">
          <label for="password">Mot de passe*</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="••••••••" required />
          <img
            :src="showPassword ? eyeOpen : eyeClose"
            alt="toggle"
            class="toggle-eye"
            @click="showPassword = !showPassword"
          />
        </div>
        <div class="password-field">
          <label for="confirmPassword">Confirmer Mot de passe*</label>
          <input :type="showConfirm ? 'text' : 'password'" id="confirmPassword" placeholder="••••••••" required />
          <img
            :src="showConfirm ? eyeOpen : eyeClose"
            alt="toggle"
            class="toggle-eye"
            @click="showConfirm = !showConfirm"
          />
        </div>
        <div class="links">
          <a href="#">Déjà un compte ? Connectez-vous</a>
        </div>
        <div class="btn-container">
          <button type="submit">
            <i class="fas fa-user-plus mr-2"></i>
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  </main>
  <Footer/>
</template>
<script setup>
import Footer from '@/components/layouts/app-footer.vue';
import authNavbar from '@/components/layouts/auth-navbar.vue';
import '@/assets/css/app-auth.css';
import eyeClose from '@/assets/images/other/eye-close.png';
import eyeOpen from '@/assets/images/other/eye-open.png';
import { ref } from 'vue';
const showPassword = ref(false);
const showConfirm = ref(false);
</script>
