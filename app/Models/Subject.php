<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
    ];

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function studyGroups(): HasMany
    {
        return $this->hasMany(StudyGroup::class);
    }

    public function lessonMaterials(): HasMany
    {
        return $this->hasMany(LeasonMaterial::class);
    }
}
