<?php

namespace App\Action\V1\Module;

use App\Models\Module;

class UpdateModuleAction
{
    
    public function execute(Module $module, array $data): Module
    {
        $module->update([
            'name'        => $data['name'] ?? $module->name,
            'description' => $data['description'] ?? $module->description,
        ]);

        return $module;
    }
}
