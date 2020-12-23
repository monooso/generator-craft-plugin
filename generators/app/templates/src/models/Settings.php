<?php

declare(strict_types=1);

namespace <%= plugin.namespace %>\models;

use craft\base\Model;

final class Settings extends Model
{
    public string $foo = 'default';

    /**
     * Define the settings validation rules
     *
     * @return array
     */
    public function rules(): array
    {
        return [
          [['foo'], 'required'],
        ];
    }
}