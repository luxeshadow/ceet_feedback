<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
  protected $table = 'feedbacks';
    protected $fillable = [
        'slug',
        'user_id',
        'departement_id',
        'module_id',
        'phase_id',
        'description',
        'file',
        'status',
        'deletefeedback',
        'feedback_group_id',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function departement(): BelongsTo
    {
        return $this->belongsTo(Departement::class);
    }


    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

   
    public function phase(): BelongsTo
    {
        return $this->belongsTo(Phase::class);
    }

    public function typeFeedback(): BelongsTo
    {
        return $this->belongsTo(TypeFeedback::class, 'type_feedback_id');
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class, 'feedback_id');
    }


}
