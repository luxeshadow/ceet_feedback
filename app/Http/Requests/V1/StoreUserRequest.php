<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'string|max:255',
            'last_name'  => 'string|max:255',
            'email'      => 'string|email|max:255|unique:users,email',
            'password'   => 'string|min:6',
            'status'     => 'nullable|string|in:active,inactive,banned', 
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.string' => 'Le prénom doit être une chaîne de caractères.',
            'first_name.max'    => 'Le prénom ne peut pas dépasser 255 caractères.',
            'last_name.string'  => 'Le nom doit être une chaîne de caractères.',
            'last_name.max'     => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.string'      => 'L\'email doit être une chaîne de caractères.',
            'email.email'       => 'L\'email doit être une adresse valide.',
            'email.unique'      => 'Cet email est déjà utilisé.',
            'password.string'   => 'Le mot de passe doit être une chaîne de caractères.',
            'password.min'      => 'Le mot de passe doit contenir au moins 6 caractères.',
            'status.in'         => 'Le statut sélectionné est invalide.',
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
