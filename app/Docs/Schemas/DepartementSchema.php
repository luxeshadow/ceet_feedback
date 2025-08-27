<?php

namespace App\Docs\Schemas;

use Docs\Annotations as DA;

/**
 * @OA\Schema(
 *     schema="DepartementSchema",
 *     type="object",
 *     title="Département",
 *     description="Ressource département",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="slug", type="string", example="informatique-abc123"),
 *     @OA\Property(property="name", type="string", example="Informatique"),
 *     @OA\Property(property="description", type="string", example="Département en charge de l'informatique."),
 *     @OA\Property(property="deletedept", type="boolean", example=false),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-18T12:34:56Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-18T12:34:56Z")
 * )
 */
class DepartementSchema {}
