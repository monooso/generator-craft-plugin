<?php

return [
    'dsn'         => $_ENV['DB_DSN'] ?: null,
    'driver'      => $_ENV['DB_DRIVER'],
    'server'      => $_ENV['DB_SERVER'],
    'port'        => $_ENV['DB_PORT'],
    'database'    => $_ENV['DB_DATABASE'],
    'user'        => $_ENV['DB_USER'],
    'password'    => $_ENV['DB_PASSWORD'],
    'schema'      => $_ENV['DB_SCHEMA'],
    'tablePrefix' => $_ENV['DB_TABLE_PREFIX'],
];
