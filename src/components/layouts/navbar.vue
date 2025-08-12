<template>
    <header class="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center">
            <img src="https://i.postimg.cc/kGXgkBsQ/ceet.jpg" alt="CEET" class="w-10 h-10 object-contain" />
          </div>
          <span class="text-lg font-semibold text-gray-900">CEET Feedback</span>
        </div>
        <nav class="hidden md:flex items-center space-x-8 h-full">
          <div class="nav-item h-full flex items-center relative">
            <a href="/dashboard.html"
              class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center h-full px-1">
              <i class="fas fa-tachometer-alt mr-2"></i>
              Tableau de bord
            </a>
            <div
              class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ceet-yellow)] origin-left scale-x-0">
            </div>
          </div>
          <div class="nav-item h-full flex items-center relative">
            <a href="listFeedback.html"
              class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center h-full px-1">
              <i class="fas fa-comment-medical mr-2"></i>
              Voir feedback
            </a>
            <div
              class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ceet-yellow)] origin-left scale-x-0">
            </div>
          </div>
          <div class="nav-item h-full flex items-center relative">
            <a href="#"
              class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center h-full px-1">
              <i class="fas fa-history mr-2"></i>
              Historique
            </a>
            <div
              class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ceet-yellow)] origin-left scale-x-0">
            </div>
          </div>
          <div class="nav-item h-full flex items-center relative">
            <a href="#"
              class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center h-full px-1">
              <i class="fas fa-cog mr-2"></i>
              Paramètres
            </a>
            <div
              class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ceet-yellow)] origin-left scale-x-0">
            </div>
          </div>
        </nav>
        <div class="flex items-center space-x-4">
          <button class="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-bell text-lg"></i>
          </button>
          <div class="relative">
            <button id="user-menu" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <i class="fas fa-user text-gray-600"></i>
              </div>
              <span class="hidden md:inline text-sm font-medium text-gray-700">Admin</span>
              <i class="fas fa-chevron-down text-xs text-gray-500 hidden md:inline"></i>
            </button>
            <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mes Feedback</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>