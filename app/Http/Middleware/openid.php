<?php

namespace App\Http\Middleware;

use Closure;

class openid
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->session()->has('openid')) {
            return $next($request);
        } else {
            return response('微信未授权', 401);
        }
    }
}
