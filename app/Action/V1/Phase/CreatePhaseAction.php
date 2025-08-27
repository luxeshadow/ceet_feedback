<?php

namespace App\Action\V1\Phase;

use App\Models\Phase;
use Illuminate\Support\Str;

class CreatePhaseAction
{
    public function execute(array $data, $userId, $moduleId): Phase
    {
        return Phase::create([
            'user_id'    => $userId,
            'module_id'  => $moduleId,
            'slug'       => Str::slug($data['name'] . '-' . Str::random(6)),
            'name'       => $data['name'],
            'description'=> $data['description'] ?? '',
        ]);
    }
}
