<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'facebook' => [
        'client_id'     => '1429516694137733',
        'client_secret' => 'c2f0c7ca516d2eb581a5d0e1cd069d16',
        'redirect'      => 'https://laravelvue-ecommerce.herokuapp.com/authorize/facebook/callback',
    ],

    'google' => [
        'client_id'     => '348291687009-527em844vracnuoj61sphd8qg6uradio.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect'      => 'https://laravelvue-ecommerce.herokuapp.com/authorize/google/callback',
    ],

    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

];
