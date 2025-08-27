<?php

namespace App\Action\V1\Phase;

use App\Models\Phase;
use Illuminate\Support\Str;

class UpdatePhaseAction
{
    
    public function execute(Phase $phase, array $data): Phase
    {
        $phase->update([
            'name'        => $data['name'] ?? $phase->name,
            'description' => $data['description'] ?? $phase->description,
        ]);

        return $phase;
    }
}
