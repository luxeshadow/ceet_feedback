<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;
use App\Enums\RolesEnum;

return new class extends Migration
{
    public function up(): void
    {
        foreach (RolesEnum::cases() as $role) {
            Role::firstOrCreate([
                'name' => $role->value,
                'guard_name' => 'sanctum'
            ]);
        }
    }

    public function down(): void
    {
        Role::whereIn('name', array_map(fn($r) => $r->value, RolesEnum::cases()))
            ->where('guard_name', 'sanctum')
            ->delete();
    }
};
