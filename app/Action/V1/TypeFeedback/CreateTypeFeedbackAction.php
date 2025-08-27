<?php

namespace App\Action\V1\TypeFeedback;

use App\Models\TypeFeedback;
use Illuminate\Support\Str;

class CreateTypeFeedbackAction
{
    
    public function execute(array $data, $userId): TypeFeedback
    {
        return TypeFeedback::create([
            'user_id'    => $userId,
            'slug'       => Str::slug($data['name'] . '-' . Str::random(6)),
            'name'       => $data['name'],
            'description'=> $data['description'] ?? '',
        ]);
    }
}
