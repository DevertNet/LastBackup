<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Storage
{
    public $name = 'storage';
    public $app;
    public $options;

    public function __construct($app, $options)
    {
        $this->options = $options;
        $this->app = $app;
        $this->getAction();
        $this->postAction();
    }

    public function getAction()
    {
        $output = [
            'found' => false,
            'encryptedData' => false,
        ];

        $this->app->get('/' . $this->name . '/{hashedPassword}', function (Request $request, Response $response, array $args) use ($output) {
            $hashedPassword = $args['hashedPassword'];

            //check if storage exists
            $filepath = $this->getFullPath($hashedPassword);
            if ($hashedPassword && file_exists($filepath)) {
                $output = [
                    'found' => true,
                    'encryptedData' => file_get_contents($filepath),
                ];
            }

            //return body as json
            $response->getBody()->write((string) json_encode($output));
            return $response->withHeader('Content-type', 'application/json')->withStatus($output['found'] ? 200 : 404);
        });
    }

    public function postAction()
    {
        $output = [
            'success' => true,
        ];

        $this->app->map(['POST', 'PUT'], '/' . $this->name . '/{hashedPassword}', function (Request $request, Response $response, array $args) use ($output) {
            //get json body as php array
            $contentType = $request->getHeaderLine('Content-Type');
            if (strstr($contentType, 'application/json')) {
                $contents = json_decode(file_get_contents('php://input'), true);
            }

            //check if body was sended and is an array
            if ($contents && is_array($contents)) {
                //get main information
                $hashedPassword = $args['hashedPassword'];
                $encryptedData = $contents['encryptedData'];

                //save backup file
                //TODO: try catch block and change success state in $output
                $this->saveBackupFile($hashedPassword, $encryptedData);
            }

            //return body as json
            $response->getBody()->write((string) json_encode($output));
            return $response->withHeader('Content-type', 'application/json')->withStatus(200);
        });

        // Accept Cors Preflight shizzle
        $this->app->map(['OPTIONS'], '/' . $this->name . '/{hash}', function (Request $request, Response $response, array $args) use ($output) {
            $response->getBody()->write((string) json_encode([]));

            return $response->withHeader('Content-type', 'application/json')->withStatus(200);
        });
    }

    public function saveBackupFile($hashedPassword, $encryptedData)
    {
        //folder
        $path = $this->getPath($hashedPassword);

        //full path with filename
        $filepath = $this->getFullPath($hashedPassword);

        //create folder if not exists
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }

        //save backup
        file_put_contents($filepath, $encryptedData);
    }

    public function getPath($hashedPassword)
    {
        $folder1 = substr($hashedPassword, 0, 2);
        $folder2 = substr($hashedPassword, 2, 2);
        return $this->options['storagePath'] . $folder1 . DIRECTORY_SEPARATOR . $folder2 . DIRECTORY_SEPARATOR;
    }

    public function getFullPath($hashedPassword)
    {
        return $this->getPath($hashedPassword) . $hashedPassword;
    }
}
