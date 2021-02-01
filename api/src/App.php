<?php

namespace App;

use App\Controller\Storage;
use Slim\Factory\AppFactory;

class App
{
    public $app;
    public $options;

    public function run($options)
    {
        $this->options = $options;
        $this->app = AppFactory::create();

        //apply settings
        $this->app->setBasePath($options['basePath']);

        //do some app stuff
        $this->initControllers();

        $this->app->run();
    }

    public function initControllers()
    {
        $storage = new Storage($this->app, $this->options);
    }
}
