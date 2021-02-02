<?php

//Live Options
$options = [
    'basePath' => '/api',
    'storagePath' => '../../../storage/',
    'composerVendor' => '../../vendor/',
    'sleepTime' => 10,
    'maxSize' => 10000000, //max strlen in storage file
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
        'composerVendor' => '../vendor/',
        'sleepTime' => 2,
        'maxSize' => 1000000, //max strlen in storage file
    ];
}

//Security Sleep to prevent brute force attacks
sleep($options['sleepTime']);

require __DIR__ . '/' . $options['composerVendor'] . 'autoload.php';

use App\App;

$app = new App;
$app->run($options);
