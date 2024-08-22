<?php

namespace Database\Seeders;

use App\Models\LeasonMaterial;
use App\Models\Schedule;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\StudyGroup;
use App\Models\StudyGroupMember;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create one admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create additional teacher and student users
        User::factory()->count(2)->teacher()->create();
        User::factory()->count(2)->student()->create();

        // Create teachers and students based on users
        Teacher::factory()->count(2)->create();
        Student::factory()->count(2)->create();

        // Create subjects
        Subject::factory()->count(3)->create();

        // Create school classes
        SchoolClass::factory()->count(3)->create();

        // Create schedules
        Schedule::factory()->count(3)->create();

        // Create study groups
        StudyGroup::factory()->count(3)->create();

        // Create study group members
        StudyGroupMember::factory()->count(3)->create();

        // Create leason materials
        LeasonMaterial::factory()->count(3)->create();

        // Create student classes
        StudentClass::factory()->count(3)->create();
    }
}
