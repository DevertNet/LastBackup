<?php

namespace App;

use Slim\Factory\AppFactory;
use App\Controller\Storage;

class App
{
    public $app;

    public function run($options)
    {
        $this->app = AppFactory::create();

        //apply settings
        $this->app->setBasePath($options['basePath']);

        //do some app stuff
        $this->initControllers();

        $this->app->run();
    }

    public function initControllers()
    {
        $storage = new Storage($this->app);
    }
}
