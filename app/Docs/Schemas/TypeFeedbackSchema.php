<?php

namespace App\Docs\Schemas;

use Docs\Annotations as DA;

/**
 * @OA\Schema(
 *     schema="TypeFeedbackSchema",
 *     type="object",
 *     title="TypeFeedback",
 *     description="Ressource TypeFeedback",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="slug", type="string", example="feedback-bug"),
 *     @OA\Property(property="name", type="string", example="Bug Logiciel"),
 *     @OA\Property(property="description", type="string", example="Feedback concernant un bug logiciel rencontré par l'utilisateur"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-26T08:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-26T08:00:00Z")
 * )
 */
class TypeFeedbackSchema {}
