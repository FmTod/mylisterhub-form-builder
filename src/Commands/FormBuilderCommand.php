<?php

namespace MyListerHub\FormBuilder\Commands;

use Illuminate\Console\Command;

class FormBuilderCommand extends Command
{
    public $signature = 'mylisterhub-form-builder';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
