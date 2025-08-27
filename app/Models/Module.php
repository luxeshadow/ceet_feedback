<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'description',
        'deletemodule',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function phases()
    {
        return $this->belongsToMany(Phase::class, 'module_phase')
                    ->withTimestamps();
    }
}


