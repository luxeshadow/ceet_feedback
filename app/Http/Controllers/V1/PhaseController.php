<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Phase;
use App\Action\V1\Phase\CreatePhaseAction;
use App\Action\V1\Phase\UpdatePhaseAction;
use App\Helpers\V1\PhaseHelper;
use App\Http\Requests\V1\StorePhaseRequest;
use App\Http\Requests\V1\UpdatePhaseRequest;

/**
 * @OA\Post(
 *     path="/api/v1/phases",
 *     summary="Créer une nouvelle phase",
 *     tags={"Phases"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/PhaseSchema")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Phase créée avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Phase créée avec succès"),
 *             @OA\Property(property="data", ref="#/components/schemas/PhaseSchema")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/phases",
 *     summary="Récupérer la liste des phases",
 *     tags={"Phases"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste des phases récupérée avec succès",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/PhaseSchema")
 *         )
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/phases/{id}",
 *     summary="Supprimer une phase (soft delete)",
 *     tags={"Phases"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Phase supprimée avec succès")
 * )
 *
 * @OA\Put(
 *     path="/api/v1/phases/{id}",
 *     summary="Mettre à jour une phase",
 *     tags={"Phases"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/PhaseSchema")),
 *     @OA\Response(response=200, description="Phase mise à jour avec succès")
 * )
 */
class PhaseController extends Controller
{
    public function createPhase(StorePhaseRequest $request, CreatePhaseAction $createPhaseAction)
    {
        $user = $request->user();
        $phase = $createPhaseAction->execute($request->validated(), $user->id, $request->module_id);

        return response()->json([
            'message' => 'Phase créée avec succès',
            'data' => $phase,
        ], 201);
    }

    public function getPhases(Request $request)
    {
        $perPage = 10;
        $currentPage = $request->query('page', 1);
        $phases = Phase::where('deletephase', false)
            ->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'data' => $phases->items(),
            'current_page' => $phases->currentPage(),
            'last_page' => $phases->lastPage(),
            'per_page' => $phases->perPage(),
            'total' => $phases->total(),
            'next_page_url' => $phases->nextPageUrl(),
            'prev_page_url' => $phases->previousPageUrl(),
        ]);
    }

    public function deletePhase(Request $request, $id)
    {
        $check = PhaseHelper::checkUserAndPhase($request, $id);
        if (isset($check['error'])) return $check['error'];

        $phase = $check['phase'];
        $phase->deleted = true;
        $phase->save();

        return response()->json(['message' => 'Phase supprimée avec succès']);
    }

    public function updatePhase(UpdatePhaseRequest $request, UpdatePhaseAction $updatePhaseAction, $id)
    {
        $check = PhaseHelper::checkUserAndPhase($request, $id);
        if (isset($check['error'])) return $check['error'];

        $phase = $check['phase'];
        $updatedPhase = $updatePhaseAction->execute($phase, $request->validated());

        return response()->json([
            'message' => 'Phase mise à jour avec succès',
            'data' => $updatedPhase,
        ]);
    }
}
