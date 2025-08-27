<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Phase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'description',
        'deletephase',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function modules()
    {
        return $this->belongsToMany(Module::class, 'module_phase')
                    ->withTimestamps();
    }
}

