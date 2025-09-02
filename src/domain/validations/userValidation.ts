import { User } from '@/domain/models/User';

/**
 * Validation pour l'inscription
 */
export function validateRegister(user: Partial<User>) {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/; // lettres, accents, espaces, apostrophes, traits d'union

  if (!user.first_name || user.first_name.trim().length < 2) {
    throw new Error('Le prénom est obligatoire et doit contenir au moins 2 caractères');
  }
  if (!nameRegex.test(user.first_name)) {
    throw new Error('Le prénom ne peut contenir que des lettres');
  }

  if (!user.last_name || user.last_name.trim().length < 2) {
    throw new Error('Le nom est obligatoire et doit contenir au moins 2 caractères');
  }
  if (!nameRegex.test(user.last_name)) {
    throw new Error('Le nom ne peut contenir que des lettres');
  }

  if (!user.departement_id || user.departement_id === 0) {
    throw new Error('Le département est obligatoire');
  }

  if (!user.email || user.email.trim().length === 0) {
    throw new Error('L’email est obligatoire');
  }

  // Vérifie que l’email a un format valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error('L’email n’est pas valide');
  }

  if (!user.password || user.password.trim().length === 0) {
    throw new Error('Le mot de passe est obligatoire');
  }

  if (user.password.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères');
  }

  if (!user.confirmPassword || user.confirmPassword.trim().length === 0) {
    throw new Error('La confirmation du mot de passe est obligatoire');
  }

  if (user.password !== user.confirmPassword) {
    throw new Error('Les mots de passe ne correspondent pas');
  }
}

/**
 * Validation pour la connexion
 */
export function validateLogin(user: Partial<User>) {
  if (!user.email || user.email.trim().length === 0) {
    throw new Error('L’email est obligatoire');
  }

  // Vérifie que l’email a un format valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error('L’email n’est pas valide');
  }

  if (!user.password || user.password.trim().length === 0) {
    throw new Error('Le mot de passe est obligatoire');
  }

  if (user.password.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères');
  }
}

