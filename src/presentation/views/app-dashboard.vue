<template>
  <!-- Sidebar verticale -->
  <aside id="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
    <div class="sidebar-header flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <img
          src="https://i.postimg.cc/kGXgkBsQ/ceet.jpg"
          alt="CEET"
          class="w-8 h-8 object-contain"
        />
        <span>CEET Feedback</span>
      </div>
      <button class="close-sidebar" id="close-sidebar" @click="toggleSidebar">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <nav>
      <ul class="space-y-1">
        <li>
          <router-link to="/dashboard" class="flex items-center" @click="closeIfMobile">
            <i class="fi fi-rr-chart-kanban"></i>
            Statistiques
          </router-link>
        </li>
        <li>
          <button
            @click="toggleSubmenu('gestion')"
            class="flex items-center justify-between w-full"
          >
            <span><i class="fi fi-rr-function-process"></i>Gestion Ressources</span>
            <i
              :class="[
                'fas',
                isSubmenuOpen.gestion ? 'fa-chevron-up' : 'fa-chevron-down',
                'text-sm',
              ]"
            ></i>
          </button>
          <ul :class="{ submenu: true, active: isSubmenuOpen.gestion }">
            <li>
              <router-link
                to="/dashboard/createdepartement"
                class="flex items-center"
                active-class="active"
                @click="closeIfMobile"
              >
                <i class="fas fa-plus mr-3 text-sm"></i>
                Gestion Départements
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/createmodule"
                class="flex items-center"
                active-class="active"
                @click="closeIfMobile"
              >
                <i class="fas fa-plus mr-3 text-sm"></i>
                Gestion Modules
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/createphase"
                class="flex items-center"
                active-class="active"
                @click="closeIfMobile"
              >
                <i class="fas fa-plus mr-3 text-sm"></i>
                Gestion Phases
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/createtypefeedback"
                class="flex items-center"
                active-class="active"
                @click="closeIfMobile"
              >
                <i class="fas fa-plus mr-3 text-sm"></i>
                Gestion Typefeedbacks
              </router-link>
            </li>
          </ul>
        </li>

        <li>
          <router-link
            to="/dashboard/assignationmodulefeedback"
            class="flex items-center"
            active-class="active"
            @click="closeIfMobile"
          >
            <i class="fi fi-rr-workflow-setting"></i>
            Assignation Module Phase
          </router-link>
        </li>
        <li>
          <router-link
            to="/dashboard/listfeedback"
            class="flex items-center"
            active-class="active"
            @click="closeIfMobile"
          >
            <i class="fi fi-rr-comments"></i>
            Liste Feedbacks
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
  <!-- Backdrop for mobile -->
  <div
    v-if="isSidebarOpen && isMobile"
    class="backdrop"
    @click="toggleSidebar"
    :class="{ 'backdrop-visible': isSidebarOpen && isMobile }"
  ></div>

  <!-- Contenu principal -->
  <div
    class="main-content"
    id="main-content"
    :class="{ 'sidebar-open': isSidebarOpen && isMobile }"
  >
    <!-- Navbar -->
    <header>
      <div class="header-container">
        <div class="header-inner">
          <div class="flex items-center space-x-3">
            <button class="menu-toggle" id="menu-toggle" @click="toggleSidebar">
              <img :src="menu" alt="menu" class="menu-icon" />
            </button>
          </div>
          <span class="mone">CEET Feedback</span>
          <div class="header-actions">
            <div class="relative">
              <button class="notification-btn">
                <i class="fi fi-rr-messages"></i>
                <span class="notification-badge">3</span>
              </button>
            </div>
            <div class="user-menu">
              <button class="user-btn" @click="toggleUserDropdown">
                <i class="fi fi-rr-admin-alt"></i>
              </button>
              <div class="user-dropdown" :class="{ 'user-dropdown-active': isUserDropdownOpen }">
                <a href="#" @click="closeUserDropdown">
                  <i class="fas fa-user-edit mr-2"></i> Modifier mon profil
                </a>
                <a href="#" @click="closeUserDropdown">
                  <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";

  // Définir la forme de l'état des sous-menus
  interface SubmenuState {
    gestion: boolean;
  }

  // État réactif pour suivre quel sous-menu est ouvert
  const isSubmenuOpen = ref<SubmenuState>({
    gestion: false,
  });

  // État réactif pour le menu déroulant utilisateur
  const isUserDropdownOpen = ref(false);

  // Reactive window width
  const windowWidth = ref(window.innerWidth);

  // Détecter si on est en mode mobile
  const isMobile = computed(() => windowWidth.value <= 768);

  // État réactif pour la barre latérale (initialisé après isMobile)
  const isSidebarOpen = ref(false); // Initialize to false, will set in onMounted

  // Chemin de l'image du menu
  const menu: string = "/images/other/menu.png";

  // Fonction pour basculer la visibilité du sous-menu
  const toggleSubmenu = (submenu: keyof SubmenuState): void => {
    isSubmenuOpen.value[submenu] = !isSubmenuOpen.value[submenu];
  };

  // Fonction pour basculer la barre latérale
  const toggleSidebar = (): void => {
    isSubmenuOpen.value.gestion = false;
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  // Fonction pour basculer le menu déroulant utilisateur
  const toggleUserDropdown = (): void => {
    isUserDropdownOpen.value = !isUserDropdownOpen.value;
  };

  // Fonction pour fermer le menu déroulant utilisateur
  const closeUserDropdown = (): void => {
    isUserDropdownOpen.value = false;
  };

  // Fermer le menu déroulant utilisateur si on clique en dehors
  const handleOutsideClick = (event: MouseEvent) => {
    const userMenu = document.querySelector(".user-menu");
    if (userMenu && !userMenu.contains(event.target as Node)) {
      isUserDropdownOpen.value = false;
    }
  };

  const closeIfMobile = (): void => {
    if (isMobile.value) {
      isSidebarOpen.value = false;
    }
  };

  // Mettre à jour lors du redimensionnement de la fenêtre
  const updateMobile = () => {
    windowWidth.value = window.innerWidth;
    if (!isMobile.value) {
      isSidebarOpen.value = true; // Forcer ouvert sur desktop
    } else {
      isSidebarOpen.value = false; // Forcer fermé sur mobile
    }
  };

  // Initialiser l'état de la barre latérale et ajouter les écouteurs
  onMounted(() => {
    // Initialiser isSidebarOpen après la définition de isMobile
    isSidebarOpen.value = !isMobile.value;
    window.addEventListener("resize", updateMobile);
    document.addEventListener("click", handleOutsideClick);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateMobile);
    document.removeEventListener("click", handleOutsideClick);
  });

  import "@/assets/css/app-dashboard.css";
</script>
