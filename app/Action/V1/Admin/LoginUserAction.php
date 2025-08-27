<?php

namespace App\Action\V1\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginUserAction
{
    public function execute(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return [
                'success' => false,
                'message' => 'Identifiants invalides',
            ];
        }

        if (!$user->is_active) {
            return [
                'success' => false,
                'message' => 'Compte inactif, veuillez contacter l’administrateur',
            ];
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'success' => true,
            'user'    => $user,
            'token'   => $token,
            'role'    => $user->getRoleNames()->first(),
        ];
    }
}
