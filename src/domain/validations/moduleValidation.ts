import { Module } from '@/domain/models/Module';

export function validateModule(data: Partial<Module>) {
  if (!data.name || data.name.trim() === '') {
    throw new Error('Le nom du module est requis.');
  }

  if (data.description && data.description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }
}
