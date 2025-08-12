<template>
  <header>
    <div class="container">
      <div class="header-inner">
        <div class="header-left">
          <img src="https://i.postimg.cc/kGXgkBsQ/ceet.jpg" alt="CEET" />
          <span>CEET Feedback</span>
        </div>
        <nav>
          <div class="nav-item">
            <a href="listFeedback.html"><i class="fi fi-rr-message-quote"></i>Voir feedback</a>
            <div class="nav-indicator"></div>
          </div>
          <div class="nav-item">
            <a href="#"><i class="fi fi-rr-time-past"></i>Historique</a>
            <div class="nav-indicator"></div>
          </div>
        </nav>
        <div class="header-right" style="position: relative">
          <button class="btn-bell" title="Notifications" aria-label="Notifications">
            <i class="fi fi-rr-bell"></i>
          </button>

          <button
            class="user-menu-btn"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            @click.stop="toggleDropdown"
          >
            <div class="user-icon"><i class="fi fi-rr-user"></i></div>
            <span class="user-name">Admin</span>
            <i class="fas fa-chevron-down user-chevron"></i>
          </button>

          <div v-show="isOpen" id="user-dropdown" role="menu" :aria-hidden="!isOpen">
            <a href="#" role="menuitem"><i class="fi fi-rr-user"></i>Profil</a>
            <a href="#" role="menuitem" class="mobile-only"
              ><i class="fi fi-rr-message-quote"></i>Mes Feedback</a
            >

            <a href="#" role="menuitem"><i class="fi fi-rr-leave"></i>Déconnexion</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import "@/assets/css/app-navbar.css";
  import { ref, onMounted, onBeforeUnmount } from "vue";

  const isOpen = ref(false);

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const closeOnClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".header-right")) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", closeOnClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", closeOnClickOutside);
  });
</script>
