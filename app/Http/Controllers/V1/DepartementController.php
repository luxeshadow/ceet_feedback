<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Departement;
use App\Action\V1\Departement\CreateDepartementAction;
use App\Action\V1\Departement\UpdateDepartementAction;
use App\Helpers\V1\DepartementHelper;
use App\Http\Requests\V1\UpdateDepartementRequest;
use App\Http\Requests\V1\StoreDepartementRequest;

/**
 * @OA\Post(
 *     path="/api/v1/departements",
 *     summary="Créer un nouveau département",
 *     tags={"Departements"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/DepartementSchema")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Département créé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Département créé avec succès"),
 *             @OA\Property(
 *                 property="data",
 *                 ref="#/components/schemas/DepartementSchema"
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
 *     path="/api/v1/departements",
 *     summary="Récupérer la liste des départements",
 *     tags={"Departements"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste des départements récupérée avec succès",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/DepartementSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/departements/{id}",
 *     summary="Supprimer un département (soft delete)",
 *     tags={"Departements"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID du département à supprimer",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Département supprimé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Département supprimé avec succès")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Département non trouvé"
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
 * Récupérer tous les départements (sans pagination)
 *
 * @OA\Get(
 *     path="/api/v1/departements/all",
 *     summary="Récupérer tous les départements",
 *     tags={"Departements"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste complète des départements",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/DepartementSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Erreur serveur"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/departements/{id}",
 *     summary="Mettre à jour un département",
 *     tags={"Departements"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID du département à mettre à jour",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/DepartementSchema")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Département mis à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Département mis à jour avec succès"),
 *             @OA\Property(property="data", ref="#/components/schemas/DepartementSchema")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Département non trouvé"
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


class DepartementController extends Controller
{
    public function createDepartement(StoreDepartementRequest $request, CreateDepartementAction $createDepartementAction)
    {
        try {
            $user = $request->user();
            $departement = $createDepartementAction->execute($request->validated(), $user->id);

            return response()->json([
                'message' => 'Département créé avec succès',
                'data'    => $departement,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du département',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
 
    public function getAllDepartements()
    {
        try {
            $departements = Departement::where('deletedept', false)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($departements, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des départements',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function getDepartements(Request $request)
    {
        $perPage = 5;
        $currentPage = $request->query('page', 1);

        $departements = Departement::where('deletedept', false)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'data' => $departements->items(),
            'current_page' => $departements->currentPage(),
            'last_page' => $departements->lastPage(),
            'per_page' => $departements->perPage(),
            'total' => $departements->total(),
            'next_page_url' => $departements->nextPageUrl(),
            'prev_page_url' => $departements->previousPageUrl(),
        ]);
    }


    public function deleteDepartement(Request $request, $id)
    {
        $check = DepartementHelper::checkUserAndDepartement($request, $id);
        if (isset($check['error'])) {
            return $check['error'];
        }
        $departement = $check['departement'];
        try {
            $departement->deletedept = true;
            $departement->save();

            return response()->json([
                'message' => 'Département supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du département',
                'error' => $e->getMessage()
            ], 500);
        }
    }
   

    public function updateDepartement(UpdateDepartementRequest $request, UpdateDepartementAction $updateDepartementAction, $id)
    {
        $check = DepartementHelper::checkUserAndDepartement($request, $id);
        if (isset($check['error'])) {
            return $check['error'];
        }
        $departement = $check['departement'];

        try {
            $updatedDepartement = $updateDepartementAction->execute($departement, $request->validated());

            return response()->json([
                'message' => 'Département mis à jour avec succès',
                'data' => $updatedDepartement,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du département',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
