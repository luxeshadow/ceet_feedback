<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'slug'             => 'nullable|string|max:255|unique:feedback,slug',
            'user_id'          => 'nullable|exists:users,id', // peut être null si utilisateur non connecté
            'departement_id'   => 'nullable|exists:departements,id',
            'module_id'        => 'nullable|exists:modules,id',
            'phase_id'         => 'nullable|exists:phases,id', // pour compatibilité avec phase unique
            'phases'           => 'nullable|array', // pour plusieurs phases
            'phases.*'         => 'integer|exists:phases,id',
            'description'      => 'required|string',
            'file'             => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
            'status'           => 'nullable|string|in:pending,approved,rejected',
            'deletefeedback'   => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.unique'            => 'Ce slug existe déjà.',
            'user_id.exists'         => 'L’utilisateur spécifié est invalide.',
            'departement_id.exists'  => 'Le département spécifié est invalide.',
            'module_id.exists'       => 'Le module spécifié est invalide.',
            'phase_id.exists'        => 'La phase spécifiée est invalide.',
            'phases.array'           => 'Les phases doivent être un tableau.',
            'phases.*.integer'       => 'Chaque phase doit être un identifiant valide.',
            'phases.*.exists'        => 'Une des phases spécifiées est invalide.',
            'description.required'   => 'La description est obligatoire.',
            'description.string'     => 'La description doit être une chaîne de caractères.',
            'file.file'              => 'Le fichier doit être valide.',
            'file.mimes'             => 'Formats autorisés : jpg, jpeg, png, pdf, doc, docx.',
            'file.max'               => 'Le fichier ne peut pas dépasser 2 Mo.',
            'status.in'              => 'Le statut doit être pending, approved ou rejected.',
            'deletefeedback.boolean' => 'Le champ deletefeedback doit être vrai ou faux.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json([
                'status'  => 'error',
                'message' => 'Validation échouée',
                'errors'  => $errors
            ], 422)
        );
    }
}
