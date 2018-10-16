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

    'findMatches' => [
        'controller' => 'search',
        'action' => 'findMatches',
    ],

    'activateAccount' => [
        'controller' => 'account',
        'action' => 'activateAccount',
    ],

    'prewUser' => [
        'controller' => 'account',
        'action' => 'prewUser',
    ],

    'fakeUser' => [
        'controller' => 'profile',
        'action' => 'fakeUser',
    ],

    'blockUser' => [
        'controller' => 'profile',
        'action' => 'blockUser',
    ],

    'likeUser' => [
        'controller' => 'profile',
        'action' => 'likeUser',
    ],

    'unLikeUser' => [
        'controller' => 'profile',
        'action' => 'unLikeUser',
    ],

    'forgotPass' => [
        'controller' => 'account',
        'action' => 'forgotPass',
    ],

    'notification' => [
        'controller' => 'profile',
        'action' => 'notification',
    ],

    'clearNotification' => [
        'controller' => 'profile',
        'action' => 'clearNotification',
    ],

    'newTag' => [
        'controller' => 'profile',
        'action' => 'newTag',
    ],

    'delTag' => [
        'controller' => 'profile',
        'action' => 'delTag',
    ],

];