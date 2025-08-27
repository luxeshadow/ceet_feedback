<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Module;
use App\Models\Phase;
use App\Action\V1\Module\CreateModuleAction;
use App\Action\V1\Module\UpdateModuleAction;
use App\Helpers\V1\ModuleHelper;
use App\Http\Requests\V1\StoreModuleRequest;
use App\Http\Requests\V1\UpdateModuleRequest;

/**
 * @OA\Post(
 *     path="/api/v1/modules",
 *     summary="Créer un nouveau module",
 *     tags={"Modules"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/ModuleSchema")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Module créé avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Module créé avec succès"),
 *             @OA\Property(property="data", ref="#/components/schemas/ModuleSchema")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/modules",
 *     summary="Récupérer la liste des modules",
 *     tags={"Modules"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste des modules récupérée avec succès",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(ref="#/components/schemas/ModuleSchema")
 *         )
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/modules/{id}",
 *     summary="Supprimer un module (soft delete)",
 *     tags={"Modules"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Module supprimé avec succès")
 * )
 *
 * @OA\Put(
 *     path="/api/v1/modules/{id}",
 *     summary="Mettre à jour un module",
 *     tags={"Modules"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/ModuleSchema")),
 *     @OA\Response(response=200, description="Module mis à jour avec succès")
 * )
 *  * @OA\Get(
 *     path="/api/v1/modules/{module}/phases",
 *     summary="Récupérer toutes les phases d'un module",
 *     tags={"Modules"},
 *     @OA\Parameter(
 *         name="module",
 *         in="path",
 *         required=true,
 *         description="ID du module",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Liste des phases du module avec count",
 *         @OA\JsonContent(
 *             @OA\Property(property="module_id", type="integer"),
 *             @OA\Property(property="count", type="integer"),
 *             @OA\Property(
 *                 property="phases",
 *                 type="array",
 *                 @OA\Items(ref="#/components/schemas/PhaseSchema")
 *             )
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/modules/{module}/phases",
 *     summary="Attacher une phase à un module",
 *     tags={"Modules"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="module",
 *         in="path",
 *         required=true,
 *         description="ID du module",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="phase_id", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Phase attachée avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Phase attachée au module avec succès")
 *         )
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/modules/{module}/phases",
 *     summary="Détacher une phase d'un module",
 *     tags={"Modules"},
 *     security={{"sanctum": {}}},
 *     @OA\Parameter(
 *         name="module",
 *         in="path",
 *         required=true,
 *         description="ID du module",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="phase_id", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Phase détachée avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Phase détachée du module avec succès")
 *         )
 *     )
 * )
 */
class ModuleController extends Controller
{
    public function createModule(StoreModuleRequest $request, CreateModuleAction $createModuleAction)
    {
        $user = $request->user();
        $module = $createModuleAction->execute($request->validated(), $user->id);

        return response()->json([
            'message' => 'Module créé avec succès',
            'data' => $module,
        ], 201);
    }
    public function getAllModules()
    {
        try {
            $modules = Module::where('deletemodule', false)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($modules, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des départements',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getModules(Request $request)
    {
        $perPage = 10;
        $currentPage = $request->query('page', 1);
        $modules = Module::where('deletemodule', false)
            ->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json([
            'data' => $modules->items(),
            'current_page' => $modules->currentPage(),
            'last_page' => $modules->lastPage(),
            'per_page' => $modules->perPage(),
            'total' => $modules->total(),
            'next_page_url' => $modules->nextPageUrl(),
            'prev_page_url' => $modules->previousPageUrl(),
        ]);
    }

    public function deleteModule(Request $request, $id)
    {
        $check = ModuleHelper::checkUserAndModule($request, $id);
        if (isset($check['error'])) return $check['error'];
        $module = $check['module'];
        $module->deletemodule = true;
        $module->save();

        return response()->json(['message' => 'Module supprimé avec succès']);
    }

    public function updateModule(UpdateModuleRequest $request, UpdateModuleAction $updateModuleAction, $id)
    {
        $check = ModuleHelper::checkUserAndModule($request, $id);
        if (isset($check['error'])) return $check['error'];

        $module = $check['module'];
        $updatedModule = $updateModuleAction->execute($module, $request->validated());

        return response()->json([
            'message' => 'Module mis à jour avec succès',
            'data' => $updatedModule,
        ]);
    }

    // Gestion des phases ---------------------

    public function getPhases(Module $module)
    {
        $phases = $module->phases()->get();
        $count = $phases->count();

        return response()->json([
            'module_id' => $module->id,
            'phases' => $phases,
            'count' => $count
        ]);
    }

    public function attachPhase(Module $module, Request $request)
    {
        $phaseId = $request->input('phase_id');
        $phase = Phase::findOrFail($phaseId);

        $module->phases()->syncWithoutDetaching([$phase->id]);

        return response()->json(['message' => 'Phase attachée au module avec succès']);
    }

    public function detachPhase(Module $module, Request $request)
    {
        $phaseId = $request->input('phase_id');
        $phase = Phase::findOrFail($phaseId);

        $module->phases()->detach($phase->id);

        return response()->json(['message' => 'Phase détachée du module avec succès']);
    }
}

