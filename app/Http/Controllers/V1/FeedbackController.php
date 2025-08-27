<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreFeedbackRequest;
use App\Action\V1\Feedback\CreateFeedbackAction;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function createFeedback(StoreFeedbackRequest $request, CreateFeedbackAction $action)
    {
        $userId = optional($request->user())->id;

        $feedbacks = $action->execute($request->validated(), $userId);

        return response()->json([
            'status'  => 'success',
            'message' => 'Feedback(s) créé(s) avec succès',
            'data'    => $feedbacks
        ], 201);
    }

   public function userFeedbacks(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Utilisateur non authentifié'
        ], 401);
    }

    $perPage = $request->query('per_page', 10);
    $currentPage = $request->query('page', 1);

    $feedbacks = Feedback::with([
            'departement',
            'module',
            'phase',
            'typeFeedback',
            'comments.user' 
        ])
        ->where('user_id', $user->id)
        ->orderByDesc('created_at')
        ->paginate($perPage, ['*'], 'page', $currentPage);

    return response()->json([
        'status' => 'success',
        'data' => $feedbacks->items(),
        'current_page' => $feedbacks->currentPage(),
        'last_page' => $feedbacks->lastPage(),
        'per_page' => $feedbacks->perPage(),
        'total' => $feedbacks->total(),
        'next_page_url' => $feedbacks->nextPageUrl(),
        'prev_page_url' => $feedbacks->previousPageUrl(),
    ], 200);
}


    public function getAllFeedbacks(Request $request)
    {
        $perPage = 10;
        $currentPage = $request->query('page', 1);

        $feedbacks = Feedback::with(['departement', 'module', 'phase', 'typeFeedback'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'data' => $feedbacks->items(),
            'current_page' => $feedbacks->currentPage(),
            'last_page' => $feedbacks->lastPage(),
            'per_page' => $feedbacks->perPage(),
            'total' => $feedbacks->total(),
            'next_page_url' => $feedbacks->nextPageUrl(),
            'prev_page_url' => $feedbacks->previousPageUrl(),
        ]);
    }

  public function findByGroupId(string $groupId)
{
    $feedbacks = Feedback::with([
            'departement',
            'module',
            'phase',
            'typeFeedback',
            'comments.user' // Ajout des commentaires avec les auteurs
        ])
        ->where('feedback_group_id', $groupId)
        ->orderByDesc('created_at')
        ->get();

    if ($feedbacks->isEmpty()) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Aucun feedback trouvé pour ce groupId'
        ], 404);
    }

    return response()->json([
        'status' => 'success',
        'data'   => $feedbacks
    ], 200);
}

}
