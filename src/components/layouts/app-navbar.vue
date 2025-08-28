<template>
  <header>
    <div class="container">
      <div class="header-inner">
        <div class="header-left">
          <img src="https://i.postimg.cc/kGXgkBsQ/ceet.jpg" alt="CEET" />
          <span>CEET Feedback</span>
        </div>

        <div class="header-right" style="position: relative">
          <button class="btn-bell" title="Recherches">
            <router-link to="/list-feedback" class="btn-bell" title="Recherches">
                  <i class="fi fi-rr-search"></i>
             </router-link>

          </button>

          <button
            class="user-menu-btn"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            @click.stop="toggleDropdown"
          >
            <div class="user-icon">
              <i :class="isConnected ? 'fi fi-rr-user' : 'fi fi-rr-spy'"></i>
            </div>
            <span class="user-name">
              {{ userName }}
            </span>
            <i class="fas fa-chevron-down user-chevron"></i>
          </button>

          <div v-show="isOpen" id="user-dropdown" role="menu" :aria-hidden="!isOpen">
            <template v-if="isConnected">
              <a href="#" role="menuitem"><i class="fi fi-rr-user"></i> Profil</a>
            
              <router-link to="/list-feedback" role="menuitem">
  <i class="fi fi-rr-message-quote"></i> Mes Feedback
</router-link>

              <a href="#" role="menuitem" style="color: #c0392b;" @click="logoutHandler">
                <i class="fi fi-rr-exit"></i> Déconnexion
              </a>
            </template>
            <template v-else>
              <router-link to="/register" role="menuitem"><i class="fi fi-rr-user-add"></i> Inscription</router-link>
              <router-link to="/login" role="menuitem"><i class="fi fi-rr-arrow-right-to-bracket"></i> Connexion</router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useUserStore } from '@/presentation/stores/userStore';
import { useLogoutUser } from '@/composables/useLogoutUser';
import { useRouter } from 'vue-router';
import "@/assets/css/app-navbar.css";

const isOpen = ref(false);
const toggleDropdown = () => { isOpen.value = !isOpen.value; };

const closeOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".header-right")) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeOnClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", closeOnClickOutside));

const userStore = useUserStore();
userStore.loadUser();

const isConnected = computed(() => !!userStore.user);

const userName = computed(() => {
  if (!userStore.user) return 'Anonyme';
  const fullName = `${userStore.user.first_name} ${userStore.user.last_name}`;
  return fullName.length > 10 ? fullName.substring(0, 10) + '...' : fullName;
});

const { logout } = useLogoutUser();
const router = useRouter();

const logoutHandler = async () => {
  await logout();
  isOpen.value = false;
  router.push('/');
};
</script>