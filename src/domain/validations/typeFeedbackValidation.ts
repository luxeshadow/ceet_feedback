import { TypeFeedback } from '@/domain/models/TypeFeedback';

export function validateTypeFeedback(data: Partial<TypeFeedback>) {
  if (!data.name || data.name.trim() === '') {
    throw new Error('Le nom du type de feedback est requis.');
  }

  if (data.description && data.description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }
}
