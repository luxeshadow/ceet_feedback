<?php

namespace App\Helpers\V1;

use Illuminate\Http\Request;
use App\Models\Phase;

class PhaseHelper
{
    
    public static function checkUserAndPhase(Request $request, int $id): array
    {
        $user = $request->user();
        if (!$user) {
            return ['error' => response()->json(['message' => 'Non authentifié'], 401)];
        }

        $phase = Phase::find($id);
        if (!$phase || $phase->deleted) {
            return ['error' => response()->json(['message' => 'Phase non trouvée'], 404)];
        }

        return ['user' => $user, 'phase' => $phase];
    }
}
