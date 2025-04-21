<?php

use MyListerHub\FormBuilder\Http\Controllers\FormBuilderController;
use MyListerHub\FormBuilder\Http\Middleware\HandleInertiaRequest;

Route::get('form-builder', FormBuilderController::class)
    ->middleware(HandleInertiaRequest::class)
    ->name('form-builder.index');
