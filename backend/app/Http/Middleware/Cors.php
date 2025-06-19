<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $r, Closure $next)
    {
        if ($r->getMethod() === "OPTIONS") {
            return response('', 204)
                ->header('Access-Control-Allow-Origin','*')
                ->header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
                ->header('Access-Control-Allow-Headers','Content-Type, Authorization');
        }
        $res = $next($r);
        $res->headers->set('Access-Control-Allow-Origin','*');
        $res->headers->set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
        $res->headers->set('Access-Control-Allow-Headers','Content-Type, Authorization');
        return $res;
    }
}
