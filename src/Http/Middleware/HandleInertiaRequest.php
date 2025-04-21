<?php

namespace MyListerHub\FormBuilder\Http\Middleware;

use Inertia\Middleware;

class HandleInertiaRequest extends Middleware
{
    protected $rootView = 'form-builder::app';
}
