<?php

namespace App\Docs\Schemas;

use Docs\Annotations as DA;

/**
 * @OA\Schema(
 *     schema="UserSchema",
 *     type="object",
 *     title="Utilisateur",
 *     description="Ressource utilisateur",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="first_name", type="string", example="John"),
 *     @OA\Property(property="last_name", type="string", example="Doe"),
 *     @OA\Property(property="email", type="string", example="john@example.com"),
 *     @OA\Property(property="rule", type="string", example="user"),
 *     @OA\Property(property="status", type="string", example="active"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class UserSchema {}
