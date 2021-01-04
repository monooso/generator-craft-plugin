<?php

declare(strict_types=1);

return [
    'preset'  => 'default',
    'exclude' => [],
    'add'     => [],

    'remove' => [
        NunoMaduro\PhpInsights\Domain\Insights\ForbiddenTraits::class,
        PHP_CodeSniffer\Standards\Generic\Sniffs\Formatting\SpaceAfterNotSniff::class,
        PhpCsFixer\Fixer\ClassNotation\OrderedClassElementsFixer::class,
        SlevomatCodingStandard\Sniffs\Classes\SuperfluousExceptionNamingSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\DisallowArrayTypeHintSyntaxSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\DisallowMixedTypeHintSniff::class,
        SlevomatCodingStandard\Sniffs\TypeHints\TypeHintDeclarationSniff::class,
    ],

    'config' => [
        PhpCsFixer\Fixer\Operator\BinaryOperatorSpacesFixer::class => [
            'align_double_arrow' => true,
            'align_equals'       => false,
        ],
        PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff::class => [
            'lineLimit'         => 120,
            'absoluteLineLimit' => PHP_INT_MAX,
            'ignoreComments'    => false,
        ],
    ],
];
