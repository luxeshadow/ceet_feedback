<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TypeFeedback;
use App\Action\V1\TypeFeedback\CreateTypeFeedbackAction;
use App\Action\V1\TypeFeedback\UpdateTypeFeedbackAction;
use App\Helpers\V1\TypeFeedbackHelper;
use App\Http\Requests\V1\UpdateTypeFeedbackRequest;
use App\Http\Requests\V1\StoreTypeFeedbackRequest;

/**
 * @OA\Post(
 *     path="/api/v1/type_feedbacks",
 *     summary="Créer un nouveau type de feedback",
 *     tags={"TypeFeedbacks"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/TypeFeedbackSchema")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Type de feedback créé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Type de feedback créé avec succès"),
 *             @OA\Property(
 *                 property="data",
 *                 ref="#/components/schemas/TypeFeedbackSchema"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Requête invalide"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/type_feedbacks",
 *     summary="Récupérer la liste des types de feedback",
 *     tags={"TypeFeedbacks"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste des types de feedback récupérée avec succès",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/TypeFeedbackSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/type_feedbacks/{id}",
 *     summary="Supprimer un type de feedback (soft delete)",
 *     tags={"TypeFeedbacks"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID du type de feedback à supprimer",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Type de feedback supprimé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Type de feedback supprimé avec succès")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Type de feedback non trouvé"
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 *   
 * Récupérer tous les types de feedback (sans pagination)
 *
 * @OA\Get(
 *     path="/api/v1/type_feedbacks/all",
 *     summary="Récupérer tous les types de feedback",
 *     tags={"TypeFeedbacks"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste complète des types de feedback",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/TypeFeedbackSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/type_feedbacks/{id}",
 *     summary="Mettre à jour un type de feedback",
 *     tags={"TypeFeedbacks"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID du type de feedback à mettre à jour",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/TypeFeedbackSchema")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Type de feedback mis à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Type de feedback mis à jour avec succès"),
 *             @OA\Property(property="data", ref="#/components/schemas/TypeFeedbackSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Type de feedback non trouvé"
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Non authentifié"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 */


class TypeFeedbackController extends Controller
{
    public function createTypeFeedback(StoreTypeFeedbackRequest $request, CreateTypeFeedbackAction $createTypeFeedbackAction)
    {
        try {
            $user = $request->user();
            $type_feedback = $createTypeFeedbackAction->execute($request->validated(), $user->id);

            return response()->json([
                'message' => 'Type de feedback créé avec succès',
                'data'    => $type_feedback,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du type de feedback',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
 
    public function getAllTypeFeedbacks()
    {
        try {
            $type_feedbacks = TypeFeedback::where('deletetype_feedback', false)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($type_feedbacks, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des types de feedback',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTypeFeedbacks(Request $request)
    {
        $perPage = 5;
        $currentPage = $request->query('page', 1);

        $type_feedbacks = TypeFeedback::where('deletetype_feedback', false)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'data' => $type_feedbacks->items(),
            'current_page' => $type_feedbacks->currentPage(),
            'last_page' => $type_feedbacks->lastPage(),
            'per_page' => $type_feedbacks->perPage(),
            'total' => $type_feedbacks->total(),
            'next_page_url' => $type_feedbacks->nextPageUrl(),
            'prev_page_url' => $type_feedbacks->previousPageUrl(),
        ]);
    }

    public function deleteTypeFeedback(Request $request, $id)
    {
        $check = TypeFeedbackHelper::checkUserAndTypeFeedback($request, $id);
        if (isset($check['error'])) {
            return $check['error'];
        }
        $type_feedback = $check['type_feedback'];
        try {
            $type_feedback->deletetype_feedback = true;
            $type_feedback->save();

            return response()->json([
                'message' => 'Type de feedback supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du type de feedback',
                'error' => $e->getMessage()
            ], 500);
        }
    }
   
    public function updateTypeFeedback(UpdateTypeFeedbackRequest $request, UpdateTypeFeedbackAction $updateTypeFeedbackAction, $id)
    {
        $check = TypeFeedbackHelper::checkUserAndTypeFeedback($request, $id);
        if (isset($check['error'])) {
            return $check['error'];
        }
        $type_feedback = $check['type_feedback'];

        try {
            $updatedTypeFeedback = $updateTypeFeedbackAction->execute($type_feedback, $request->validated());

            return response()->json([
                'message' => 'Type de feedback mis à jour avec succès',
                'data' => $updatedTypeFeedback,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du type de feedback',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
