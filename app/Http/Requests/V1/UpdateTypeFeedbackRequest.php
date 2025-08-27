<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTypeFeedbackRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à effectuer cette requête.
     */
    public function authorize(): bool
    {
     
        return $this->user() !== null;
    }

    /**
     * Règles de validation pour la mise à jour d'une phase.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'sometimes|string|max:255',
            'description' => 'sometimes|string|nullable|max:1000',
        ];
    }

    /**
     * Messages de validation personnalisés (optionnel)
     */
    public function messages(): array
    {
        return [
            'name.string'        => 'Le nom doit être une chaîne de caractères.',
            'name.max'           => 'Le nom ne peut pas dépasser 255 caractères.',
            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max'    => 'La description ne peut pas dépasser 1000 caractères.',
        ];
    }
}
