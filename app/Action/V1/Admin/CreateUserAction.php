<?php

namespace App\Action\V1\Admin;

use App\Models\User;
use App\Enums\RolesEnum;
use Illuminate\Support\Str;

class CreateUserAction
{
    public function execute(array $data): array
    {
        $user = User::create([
            'slug'       => Str::slug($data['first_name'] . '-' . Str::random(6)),
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'password'   => bcrypt($data['password']),
        ]);

        $role = RolesEnum::from($data['role'] ?? RolesEnum::USER->value);
        $user->assignRole($role->value);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
            'role'  => $role->value,
        ];
    }
}
