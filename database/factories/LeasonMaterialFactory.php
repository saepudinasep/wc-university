<?php

namespace Database\Factories;

use App\Models\LeasonMaterial;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeasonMaterial>
 */
class LeasonMaterialFactory extends Factory
{
    protected $model = LeasonMaterial::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'subject_id' => Subject::factory()->create()->id,
            'teacher_id' => Teacher::factory()->create()->id,
            'title' => $this->faker->word,
            'content' => $this->faker->text,
        ];
    }
}
