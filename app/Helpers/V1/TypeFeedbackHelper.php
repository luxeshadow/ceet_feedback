<?php

namespace App\Helpers\V1;

use Illuminate\Http\Request;
use App\Models\TypeFeedback;

class TypeFeedbackHelper
{
    public static function checkUserAndTypeFeedback(Request $request, int $id)
    {
        $user = $request->user();
        if (!$user) {
            return ['error' => response()->json(['message' => 'Non authentifié'], 401)];
        }

        $type_feedback = TypeFeedback::find($id);
        if (!$type_feedback || $type_feedback->deletedept) {
            return ['error' => response()->json(['message' => 'Type de feedback non trouvé'], 404)];
        }

        return ['user' => $user, 'type_feedback' => $type_feedback];
    }
}
