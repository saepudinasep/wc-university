<?php

namespace Database\Factories;

use App\Models\Schedule;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'teacher_id' => Teacher::factory()->create()->id,
            'subject_id' => Subject::factory()->create()->id,
            'class_id' => SchoolClass::factory()->create()->id,
            'day' => $this->faker->randomElement(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
            'start_time' => $this->faker->time,
            'end_time' => $this->faker->time,
        ];
    }
}
