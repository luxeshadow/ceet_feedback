<?php

namespace App\Action\V1\Module;

use App\Models\Module;
use Illuminate\Support\Str;

class CreateModuleAction
{
    
    public function execute(array $data, $userId): Module
    {
        return Module::create([
            'user_id'    => $userId,
            'slug'       => Str::slug($data['name'] . '-' . Str::random(6)),
            'name'       => $data['name'],
            'description'=> $data['description'] ?? '',
        ]);
    }
}
