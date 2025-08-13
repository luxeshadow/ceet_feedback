<template>
<main>
    <div class="main-container">
      <div class="feedback-card">
        <div class="feedback-header">
          <div class="feedback-header-inner">
            <div>
              <h2><i class="fas fa-comment-medical"></i> Nouveau Feedback</h2>
              <p>Partagez votre expérience avec nous</p>
            </div>
            <div>
              <span class="progress-text" id="progress-text">0%</span>
            </div>
          </div>
          <div class="progress-bar-wrapper" aria-hidden="true">
            <div id="progress-bar" class="progress-bar"></div>
          </div>
        </div>

        <form id="feedbackForm" novalidate>
          <div class="grid-2-cols">
            <div>
              <label for="firstname">Prénom (optionnel)</label>
              <input type="text" id="firstname" name="firstname" placeholder="Votre prénom" />
            </div>
            <div>
              <label for="lastname">Nom (optionnel)</label>
              <input type="text" id="lastname" name="lastname" placeholder="Votre nom" />
            </div>
          </div>
          <div>
            <label for="email">Email (optionnel)</label>
            <input type="email" id="email" name="email" placeholder="email@exemple.com" />
          </div>
          <div class="grid-2-cols">
            <div>
              <label>Département concerné*</label>
              <div class="custom-select" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="department-label">
                <div class="select-trigger" role="combobox" aria-controls="department-options" aria-expanded="false">
                  <span class="select-placeholder">Sélectionnez un département*</span>
                  <i class="fas fa-chevron-down" style="font-size: 0.75rem; color:#9ca3af;"></i>
                </div>
                <ul id="department-options" class="select-options" role="listbox" tabindex="-1" aria-labelledby="department-label">
                  <li data-value="production" role="option">Production</li>
                  <li data-value="distribution" role="option">Distribution</li>
                  <li data-value="rh" role="option">Ressources Humaines</li>
                  <li data-value="finance" role="option">Finance</li>
                  <li data-value="technique" role="option">Service Technique</li>
                  <li data-value="commercial" role="option">Service Commercial</li>
                </ul>
              </div>
            </div>
            <div>
              <label>Type de feedback*</label>
              <div class="custom-select" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="typefeedback-label">
                <div class="select-trigger" role="combobox" aria-controls="typefeedback-options" aria-expanded="false">
                  <span class="select-placeholder">Sélectionnez un type*</span>
                  <i class="fas fa-chevron-down" style="font-size: 0.75rem; color:#9ca3af;"></i>
                </div>
                <ul id="typefeedback-options" class="select-options" role="listbox" tabindex="-1" aria-labelledby="typefeedback-label">
                  <li data-value="bug" role="option">Bug Logiciel</li>
                  <li data-value="info" role="option">Information</li>
                  <li data-value="complaint" role="option">Plainte</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <label>Module*</label>
            <div class="custom-select" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="module-label">
              <div class="select-trigger" role="combobox" aria-controls="module-options" aria-expanded="false">
                <span class="select-placeholder">Sélectionnez un module*</span>
                <i class="fas fa-chevron-down" style="font-size: 0.75rem; color:#9ca3af;"></i>
              </div>
              <ul id="module-options" class="select-options" role="listbox" tabindex="-1" aria-labelledby="module-label">
                <li data-value="gestion" role="option">Logiciel de gestion</li>
                <li data-value="facturation" role="option">Logiciel de facturation</li>
                <li data-value="crm" role="option">CRM</li>
                <li data-value="hr" role="option">RH</li>
                <li data-value="comptabilite" role="option">Comptabilité</li>
                <li data-value="autre" role="option">Autre</li>
              </ul>
            </div>
          </div>
          <div>
            <label for="message">Votre message*</label>
            <textarea id="message" name="message" placeholder="Décrivez votre feedback en détail..." required></textarea>
          </div>
          <div>
            <label>Pièce jointe (optionnel)</label>
            <div class="file-upload-box">
              <div class="file-upload-content">
                <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div>
                  <label class="file-upload-label" for="file-upload">
                    <span>Aucun fichier sélectionné</span>
                    <input id="file-upload" name="file-upload" type="file" />
                  </label>
                </div>
                <p class="file-upload-info">PNG, JPG, PDF jusqu'à 10MB</p>
              </div>
            </div>
          </div>
          <div class="form-buttons">
            <button type="button" class="btn btn-cancel">Annuler</button>
            <button type="submit" class="btn btn-submit">
            <i class="fi fi-rr-paper-plane"></i> Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script setup>
    import '@/assets/css/app-feedback.css';
</script>
