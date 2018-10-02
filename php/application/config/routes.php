<?php

return [

    'login' => [
        'controller' => 'account',
        'action' => 'login',
    ],

    'register' => [
        'controller' => 'account',
        'action' => 'register',
    ],

    'user' => [
        'controller' => 'account',
        'action' => 'user',
    ],

    'photo' => [
        'controller' => 'account',
        'action' => 'photo',
    ],

    'editInfo' => [
        'controller' => 'profile',
        'action' => 'editInfo',
    ],

    'editPhotos' => [
        'controller' => 'profile',
        'action' => 'editPhotos',
    ],

    'addPhoto' => [
        'controller' => 'profile',
        'action' => 'addPhoto',
    ],

    'likesViews' => [
        'controller' => 'account',
        'action' => 'likesViews',
    ],

    'friendsList' => [
        'controller' => 'chat',
        'action' => 'friendsList',
    ],

    'selectChat' => [
        'controller' => 'chat',
        'action' => 'selectChat',
    ],

    'sendMessage' => [
        'controller' => 'chat',
        'action' => 'sendMessage',
    ],

    'search' => [
        'controller' => 'search',
        'action' => 'search',
    ],
];