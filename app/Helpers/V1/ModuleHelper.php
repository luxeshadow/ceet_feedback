<?php

namespace App\Helpers\V1;

use Illuminate\Http\Request;
use App\Models\Module;

class ModuleHelper
{
   
    public static function checkUserAndModule(Request $request, int $id): array
    {
        $user = $request->user();
        if (!$user) {
            return ['error' => response()->json(['message' => 'Non authentifié'], 401)];
        }

        $module = Module::find($id);
        if (!$module || $module->deleted) {
            return ['error' => response()->json(['message' => 'Module non trouvé'], 404)];
        }

        return ['user' => $user, 'module' => $module];
    }
}
