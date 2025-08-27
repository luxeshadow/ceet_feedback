<?php

namespace App\Docs\Schemas;

use Docs\Annotations as DA;

/**
 * @OA\Schema(
 *     schema="ModuleSchema",
 *     type="object",
 *     title="Module",
 *     description="Ressource module",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="slug", type="string", example="maths-xyz123"),
 *     @OA\Property(property="name", type="string", example="Mathématiques"),
 *     @OA\Property(property="description", type="string", example="Module sur les bases des mathématiques."),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-18T12:34:56Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-18T12:34:56Z")
 * )
 */
class ModuleSchema {}
