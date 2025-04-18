<?php

namespace MyListerHub\FormBuilder\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \MyListerHub\FormBuilder\FormBuilder
 */
class FormBuilder extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyListerHub\FormBuilder\FormBuilder::class;
    }
}
