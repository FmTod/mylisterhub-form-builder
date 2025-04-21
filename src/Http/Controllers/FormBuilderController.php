<?php

namespace MyListerHub\FormBuilder\Http\Controllers;

use Inertia\Inertia;

class FormBuilderController
{
    public function __invoke()
    {
        return Inertia::render('FormBuilder');
    }
}
