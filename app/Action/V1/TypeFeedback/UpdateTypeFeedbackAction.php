<?php

namespace App\Action\V1\TypeFeedback;

use App\Models\TypeFeedback;

class UpdateTypeFeedbackAction
{
    
    public function execute(TypeFeedback $type_feedback, array $data): TypeFeedback
    {
        $type_feedback->update([
            'name'        => $data['name'] ?? $type_feedback->name,
            'description' => $data['description'] ?? $type_feedback->description,
        ]);

        return $type_feedback;
    }
}
