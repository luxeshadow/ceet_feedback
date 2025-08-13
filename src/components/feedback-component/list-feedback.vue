<template>
    <main>
    <div class="main-container">
      <div class="content-box">
        <div class="content-header">
          <h2><i class="fas fa-comment-medical"></i> Voir Mes Feedbacks</h2>
          <p>Consultez Vos retours utilisateurs</p>
        </div>
        <div class="filters">
          <div class="filter-grid">
            <div>
            
              <div class="search-container">
                <input type="text" id="search" placeholder="Rechercher feedback..."  autocomplete="off" class="search-input">
                <span class="search-icon"><i class="fi fi-rr-category"></i></span>
              </div>
            </div>
            <input type="date" class="date-input" placeholder="Filtrer par date" autocomplete="off">
           <button class="filter-btn">Filtrer</button>
          </div>
        </div>
        <div class="feedback-list">
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="feedback-info">
                <div>
                  <h3 class="feedback-title">Suggestion</h3>
                  <p class="feedback-meta">Jean Dupont • Production • 08/08/2025</p>
                </div>
              </div>
              <span class="feedback-status status-pending">Attente</span>
            </div>
            <p class="feedback-content">Proposition d'ajouter une fonctionnalité de suivi en temps réel dans le logiciel de gestion.</p>
            <div class="feedback-actions">
              <button class="view-comment-btn">Voir commentaire</button>
            </div>
            <div class="admin-comment">
              <p><strong>Admin:</strong> Merci pour votre suggestion ! Nous allons l'étudier lors de la prochaine réunion de développement.</p>
            </div>
          </div>
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="feedback-info">
                <div>
                  <h3 class="feedback-title">Plainte</h3>
                  <p class="feedback-meta">Marie Dubois • Service Commercial • 07/08/2025</p>
                </div>
              </div>
              <span class="feedback-status status-resolved">Résolu</span>
            </div>
            <p class="feedback-content">Problème de synchronisation dans le CRM, les données clients ne se mettent pas à jour correctement.</p>
            <div class="feedback-actions">
              <button class="view-comment-btn">Voir commentaire</button>
            </div>
            <div class="admin-comment">
              <p><strong>Admin:</strong> Le problème a été corrigé dans la mise à jour 2.3.1. Merci de nous l'avoir signalé.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scooped>
@import url('../../assets/css/app-feedback-list.css');
</style>