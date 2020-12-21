<?php

declare(strict_types=1);

return [
    'preset'  => 'laravel',
    'exclude' => [],
    'add'     => [],

    'remove' => [
        NunoMaduro\PhpInsights\Domain\Insights\ForbiddenTraits::class,
        SlevomatCodingStandard\Sniffs\Classes\SuperfluousExceptionNamingSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\DisallowArrayTypeHintSyntaxSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\DisallowMixedTypeHintSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\TypeHintDeclarationSniff::class,
    ],

    'config' => [
        PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff::class => [
            'lineLimit'         => 120,
            'absoluteLineLimit' => PHP_INT_MAX,
            'ignoreComments'    => false,
        ],
    ],
];
