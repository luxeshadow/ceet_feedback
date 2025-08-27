<?php

namespace App\Action\V1\Feedback;

use App\Models\Feedback;
use Illuminate\Support\Str;

class CreateFeedbackAction
{
    
   public function execute(array $data, ?int $userId = null): array
{
    $feedbacks = [];
    $groupId = Str::uuid();

    foreach ($data['phases'] as $phaseId) {
        $slug = Str::slug(
            substr($data['description'] ?? 'feedback', 0, 50) . '-' . Str::random(6)
        );
        $filePath = null;
        if (!empty($data['file']) && $data['file'] instanceof \Illuminate\Http\UploadedFile) {
            $filePath = $data['file']->store('feedbacks', 'public');
        }

        $feedbacks[] = Feedback::create([
            'user_id'          => $userId,
            'departement_id'   => $data['departement_id'],
            'module_id'        => $data['module_id'],
            'phase_id'         => $phaseId,
            'description'      => $data['description'] ?? '',
            'file'             => $filePath,
            'status'           => $data['status'] ?? 'En attente',
            'slug'             => $slug,
            'feedback_group_id'=> $groupId,
        ]);
    }

    return $feedbacks;
}

}
