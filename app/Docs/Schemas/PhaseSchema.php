<?php

namespace App\Docs\Schemas;

use Docs\Annotations as DA;

/**
 * @OA\Schema(
 *     schema="PhaseSchema",
 *     type="object",
 *     title="Phase",
 *     description="Ressource phase",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="slug", type="string", example="phase-abc123"),
 *     @OA\Property(property="name", type="string", example="Phase de conception"),
 *     @OA\Property(property="description", type="string", example="Cette phase couvre la planification et la conception du projet."),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-18T12:34:56Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-18T12:34:56Z")
 * )
 */
class PhaseSchema {}
