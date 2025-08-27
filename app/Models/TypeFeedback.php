<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TypeFeedback extends Model
{
 use HasFactory;
     protected $table = 'type_feedbacks';
    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'description',
        'deletetype_feedback',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
