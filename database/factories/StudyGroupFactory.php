<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\StudyGroup;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyGroup>
 */
class StudyGroupFactory extends Factory
{
    protected $model = StudyGroup::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'name' => $this->faker->word,
            'subject_id' => Subject::factory()->create()->id,
            'class_id' => SchoolClass::factory()->create()->id,
            'teacher_id' => Teacher::factory()->create()->id,
        ];
    }
}
