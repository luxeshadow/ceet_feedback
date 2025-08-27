<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\V1\StoreUserRequest;
use App\Http\Requests\V1\LoginUserRequest;
use App\Action\V1\Admin\CreateUserAction;
use App\Action\V1\Admin\LoginUserAction;

/**
 * @OA\Post(
 *     path="/api/v1/register",
 *     summary="Créer un nouvel utilisateur",
 *     tags={"Users"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/UserSchema")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Utilisateur créé avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/UserSchema")
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/login",
 *     summary="Connexion d'un utilisateur",
 *     tags={"Users"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="first_name", type="string", example="John"),
 *             @OA\Property(property="password", type="string", format="password", example="StrongPass123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Connexion réussie",
 *         @OA\JsonContent(ref="#/components/schemas/UserSchema")
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Identifiants invalides"
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/logout",
 *     summary="Déconnexion de l'utilisateur",
 *     tags={"Users"},
 *     security={{"sanctum": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Opération réussie"
 *     )
 * )
 */


class UserController extends Controller
{
    public function createUser(StoreUserRequest $request, CreateUserAction $createUserAction)
    {
        try {
            $result = $createUserAction->execute($request->validated());

            return response()->json([
                'message' => 'Utilisateur créé avec succès.',
                'user'    => $result['user'],
                'token'   => $result['token'],
                'role'    => $result['role'],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Erreur lors de la création de l’utilisateur.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
    public function loginUser(LoginUserRequest $request, LoginUserAction $loginUserAction)
    {
        try {
            $result = $loginUserAction->execute($request->validated());

            if (!$result['success']) {
                return response()->json([
                    'status'  => 'error',
                    'message' => $result['message']
                ], 401);
            }
            return response()->json([
                'status'  => 'success',
                'message' => 'Connexion réussie',
                'user'    => $result['user'],
                'token'   => $result['token'],
                'role'    => $result['role'],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Erreur lors de la connexion.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
    public function logoutUser(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status'  => 'success',
                'message' => 'Déconnexion réussie',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Erreur lors de la déconnexion.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

}
