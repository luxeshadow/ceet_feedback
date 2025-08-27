<?php

namespace App\Helpers\V1;

use Illuminate\Http\Request;
use App\Models\Departement;

class DepartementHelper
{
  
    public static function checkUserAndDepartement(Request $request, int $id)
    {
        $user = $request->user();
        if (!$user) {
            return ['error' => response()->json(['message' => 'Non authentifié'], 401)];
        }

        $departement = Departement::find($id);
        if (!$departement || $departement->deletedept) {
            return ['error' => response()->json(['message' => 'Département non trouvé'], 404)];
        }

        return ['user' => $user, 'departement' => $departement];
    }
}
