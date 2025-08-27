<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'feedback_id',
        'comment'
    ];

    // Relation vers le feedback
    public function feedback(): BelongsTo
    {
        return $this->belongsTo(Feedback::class);
    }

    // Relation vers l'utilisateur qui a commenté
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

