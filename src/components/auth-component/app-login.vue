<template>
  <authNavbar/>
  <main>
    <div class="container-login">
      <div class="header">
        <h2><i class="fas fa-sign-in-alt"></i>Connexion</h2>
        <p>Accédez à votre compte</p>
      </div>

      <form id="loginForm">
        <div>
          <label for="email">Nom/Prenom*</label>
          <input type="email" id="email" placeholder="AMOUZOU" required />
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

        <div class="links">
          <a href="#">Mot de passe oublié ?</a>
          <a href="register.html">Créer un compte</a>
        </div>

        <div class="btn-container">
          <button type="submit">
            <i class="fas fa-sign-in-alt"></i> Se connecter
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
</script>
