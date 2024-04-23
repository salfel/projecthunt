<?php

$providers = [
    App\Providers\AppServiceProvider::class,
];

if (! app()->isProduction()) {
    $providers[] = App\Providers\TelescopeServiceProvider::class;
}

return $providers;
