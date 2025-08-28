import { Feedback } from '@/domain/models/Feedback';

export function validateFeedback(data: {
  description?: string;
  selectedPhases?: number[];
  selectedDepartment?: { id: number; name: string } | null;
  selectedTypeFeedback?: { id: number; name: string } | null;
  selectedModule?: { id: number; name: string } | null;
  file?: File | null;
}) {
  if (!data.description || data.description.trim() === '') {
    throw new Error('La description du feedback est obligatoire.');
  }

  if (data.description.length > 1000) {
    throw new Error('La description ne doit pas dépasser 1000 caractères.');
  }

  if (!data.selectedDepartment) {
    throw new Error('Veuillez sélectionner un département.');
  }

  if (!data.selectedTypeFeedback) {
    throw new Error('Veuillez sélectionner un type de feedback.');
  }

  if (!data.selectedModule) {
    throw new Error('Veuillez sélectionner un module.');
  }

  if (!data.selectedPhases || data.selectedPhases.length === 0) {
    throw new Error('Veuillez sélectionner au moins une phase.');
  }

  if (data.file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(data.file.type)) {
      throw new Error('Le fichier doit être PNG, JPG ou PDF.');
    }

    const maxSizeMB = 10;
    if (data.file.size / 1024 / 1024 > maxSizeMB) {
      throw new Error(`Le fichier ne doit pas dépasser ${maxSizeMB}MB.`);
    }
  }

  return true;
}
