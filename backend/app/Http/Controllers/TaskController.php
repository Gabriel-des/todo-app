<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller {
    public function index() {
        $tasks = Task::where('user_id', auth()->id())->get();
        return response()->json($tasks);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description'=>'string|nullable',
        ]);
        $data['user_id'] = auth()->id();
        $task = Task::create($data);
        return response()->json($task, 201);
    }
    public function show($id) {
        $task = Task::findOrFail($id);
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error'=>'Não autorizado'], 403);
        }
        return response()->json($task);
    }
    public function update(Request $request, $id) {
        $task = Task::findOrFail($id);
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error'=>'Não autorizado'], 403);
        }
        $task->update($request->only(['title','description','completed']));
        return response()->json($task);
    }
    public function destroy($id) {
        $task = Task::findOrFail($id);
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error'=>'Não autorizado'], 403);
        }
        $task->delete();
        return response()->json(null, 204);
    }
}
