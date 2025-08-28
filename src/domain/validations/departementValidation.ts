import { Departement } from '@/domain/models/Departement';

export function validateDepartement(data: Partial<Departement>) {
  if (!data.name || data.name.trim() === '') {
    throw new Error('Le nom du département est requis.');
  }

  if (data.description && data.description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }
}
