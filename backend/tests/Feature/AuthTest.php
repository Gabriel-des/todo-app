<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testLogin()
    {
        $user = User::factory()->create(['password' => bcrypt('123456')]);
        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => '123456'
        ]);
        $response->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }
}
