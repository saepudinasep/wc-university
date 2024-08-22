<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\StudyGroup;
use App\Models\StudyGroupMember;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyGroupMember>
 */
class StudyGroupMemberFactory extends Factory
{
    protected $model = StudyGroupMember::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'group_id' => StudyGroup::factory()->create()->id,
            'student_id' => Student::factory()->create()->id,
        ];
    }
}
