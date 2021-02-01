<?php

//Live Options
$options = [
    'basePath' => '/api',
    'storagePath' => '../../storage/',
];

//For Development
if (php_sapi_name() == 'cli-server') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    $options = [
        'basePath' => '/api',
        'storagePath' => '../storage/',
    ];
}

require __DIR__ . '/../vendor/autoload.php';

use App\App;

$app = new App;
$app->run($options);
