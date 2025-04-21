<?php

namespace MyListerHub\FormBuilder;

use MyListerHub\FormBuilder\Commands\FormBuilderCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

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
            ->hasAssets()
            ->hasRoutes(['web', 'api'])
            ->hasMigration('create_form_builder_table')
            ->hasCommand(FormBuilderCommand::class);
    }
}
