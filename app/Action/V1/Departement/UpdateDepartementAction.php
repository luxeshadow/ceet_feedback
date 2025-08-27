<?php

namespace App\Action\V1\Departement;

use App\Models\Departement;
use Illuminate\Support\Str;

class UpdateDepartementAction
{
    
    public function execute(Departement $departement, array $data): Departement
    {
        $departement->update([
            'name'        => $data['name'] ?? $departement->name,
            'description' => $data['description'] ?? $departement->description,
        ]);

        return $departement;
    }
}
