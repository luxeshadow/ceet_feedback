import { Phase } from '@/domain/models/Phase';

export function validatePhase(data: Partial<Phase>) {
  if (!data.name || data.name.trim() === '') {
    throw new Error('Le nom de la phase est requis.');
  }

  if (data.description && data.description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }
}
