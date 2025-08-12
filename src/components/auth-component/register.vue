<template>
 <authNavbar/>

  <main class="flex-grow">
    <div class="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-[var(--ceet-blue)] to-[var(--ceet-blue-dark)] p-6 text-white">
          <h2 class="text-2xl font-bold">
            <i class="fas fa-user-plus mr-3"></i>
            Inscription
          </h2>
          <p class="text-sm opacity-90 mt-1">Créez votre compte</p>
        </div>
        <form class="p-6 space-y-6" id="registerForm">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" id="firstname" placeholder="Votre prénom" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ceet-blue)] focus:border-transparent transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" id="lastname" placeholder="Votre nom" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ceet-blue)] focus:border-transparent transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" placeholder="email@exemple.com" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ceet-blue)] focus:border-transparent transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" id="password" placeholder="••••••••" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ceet-blue)] focus:border-transparent transition-all duration-200">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input type="password" id="confirm-password" placeholder="••••••••" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ceet-blue)] focus:border-transparent transition-all duration-200">
          </div>
          <div class="flex justify-between items-center">
            <a href="login.html" class="text-sm text-[var(--ceet-blue)] hover:text-[var(--ceet-blue-dark)]">Déjà un compte ? Connectez-vous</a>
          </div>
          <div class="flex justify-end">
            <button type="submit"
              class="px-6 py-3 bg-[var(--ceet-blue)] border border-transparent rounded-lg text-sm font-medium text-white hover:bg-[var(--ceet-blue-dark)] transition-colors duration-200 flex items-center">
              <i class="fas fa-user-plus mr-2"></i>
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
<Footer/>
</template>

<script setup>
    import Footer from '@/components/layouts/app-footer.vue';
    import authNavbar from '@/components/layouts/auth-navbar.vue';
</script>