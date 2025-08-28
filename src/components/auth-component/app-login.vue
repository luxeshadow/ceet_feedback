<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import "@/assets/css/app-auth.css";
  import { useLoginUser } from "@/composables/useLoginUser"; // à créer
  import Footer from "@/components/layouts/app-footer.vue";
  import AuthNavbar from "@/components/layouts/auth-navbar.vue";

  const eyeOpen = "/images/other/eye-open.png";
  const eyeClose = "/images/other/eye-close.png";

  const showPassword = ref(false);

 const form = ref({
  email: "",
  password: "",
});

const { login, loading } = useLoginUser();
const router = useRouter();

const onSubmit = async (e: Event) => {
  e.preventDefault();
  const result = await login(form.value);

  if (result) {
    const { role } = result;

    if (role === "super_admin" || role === "admin") {
      router.push({ path: "/dashboard" });
    } else {
      router.push({ name: "Home" });
    }
  }
};
</script>

<template>
  <AuthNavbar />
  <main class="main-log">
    <div class="container-login">
      <div class="header">
        <h2><i class="fas fa-sign-in-alt"></i>Connexion</h2>
        <p>Accédez à votre compte</p>
      </div>

      <form class="login-form" @submit="onSubmit">
        <div>
          <label for="email">Email*</label>
          <input
            type="text"
            id="first_name"
            v-model="form.email"
            placeholder="votre nom"
            required
          />
        </div>
        <div class="password-field">
          <label for="password">Mot de passe*</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
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
        <div class="links">
          <a href="#">Mot de passe oublié ?</a>
          <router-link to="/register">Créer un compte</router-link>
        </div>

        <div class="btn-container">
          <button type="submit" :disabled="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ loading ? "Connexion..." : "Se connecter" }}
          </button>
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>
