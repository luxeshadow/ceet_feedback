<?php

namespace App\Action\V1\Departement;

use App\Models\Departement;
use Illuminate\Support\Str;

class CreateDepartementAction
{
  
     public function execute(array $data, $userId): Departement
    {
        return Departement::create([
            'user_id'    => $userId,
            'slug'       => Str::slug($data['name'] . '-' . Str::random(6)),
            'name'       => $data['name'],
            'description'=> $data['description'] ?? '',
        ]);
    }
}
