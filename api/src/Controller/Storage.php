<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Storage
{
    public $name = 'storage';
    public $app;

    public function __construct($app)
    {
        $this->app = $app;
        $this->getAction();
        $this->postAction();
    }

    public function getAction()
    {
        $output = [
            'found' => false,
            'encyptedData' => false,
        ];

        $this->app->get('/' . $this->name . '/{hash}', function (Request $request, Response $response, array $args) use ($output) {
            $name = $args['hash'];

            $response->getBody()->write((string) json_encode($output));

            return $response->withHeader('Content-type', 'application/json')->withStatus(404);
        });
    }

    public function postAction()
    {
        $output = [
            'success' => false,
        ];

        $this->app->map(['POST', 'PUT'], '/' . $this->name . '/{hash}', function (Request $request, Response $response, array $args) use ($output) {
            $name = $args['hash'];

            $response->getBody()->write((string) json_encode($output));

            return $response->withHeader('Content-type', 'application/json')->withStatus(200);
        });

        // Accept Cors Preflight shizzle
        $this->app->map(['OPTIONS'], '/' . $this->name . '/{hash}', function (Request $request, Response $response, array $args) use ($output) {
            $response->getBody()->write((string) json_encode([]));

            return $response->withHeader('Content-type', 'application/json')->withStatus(200);
        });
    }
}
