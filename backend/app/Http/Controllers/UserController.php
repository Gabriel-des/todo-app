<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\UserService;

class UserController extends Controller {
    protected $userService;
    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }
    public function store(Request $request) {
        $user = $this->userService->registerUser($request->all());
        return response()->json($user, 201);
    }
}
