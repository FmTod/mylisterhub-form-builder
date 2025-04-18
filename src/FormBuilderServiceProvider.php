<?php

namespace MyListerHub\FormBuilder;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use MyListerHub\FormBuilder\Commands\FormBuilderCommand;

class FormBuilderServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('form-builder')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_form_builder_table')
            ->hasCommand(FormBuilderCommand::class);
    }
}
