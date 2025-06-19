<?php

namespace App\Services;
use App\Repositories\UserRepository;
use App\Events\UserRegistered;

class UserService {
    protected $repo;
    public function __construct(UserRepository $repo) {
        $this->repo = $repo;
    }
    public function registerUser(array $data) {
        // lógica adicional, ex: validações extras, eventos, etc.
        $data['password'] = bcrypt($data['password']);
        $user = $this->repo->create($data);
        event(new UserRegistered($user));
        return $user;
    }
}
