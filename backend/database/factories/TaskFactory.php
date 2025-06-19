<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'    => User::factory(), // Cria automaticamente um usuário associado
            'title'      => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'completed'  => $this->faker->boolean(20),
        ];
    }
}
