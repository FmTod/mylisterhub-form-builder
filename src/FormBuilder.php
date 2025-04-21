<?php

namespace MyListerHub\FormBuilder;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\Vite;

class FormBuilder
{
    /**
     * Get the assets for the FormBuilder.
     */
    public static function vite(array $entrypoints): Htmlable
    {
        $vite = Vite::useHotFile(__DIR__.'/../resources/dist/hot')
            ->useBuildDirectory('vendor/form-builder');

        return $vite($entrypoints);
    }
}
