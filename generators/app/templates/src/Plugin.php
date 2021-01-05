<?php

declare(strict_types=1);

namespace <%= plugin.namespace %>;

use Craft;
use craft\base\Plugin;
use yii\web\Response;
use <%= plugin.namespace %>\models\Settings;

final class <%= plugin.class %> extends Plugin
{
    public $hasCpSettings = true;

    /**
     * Initialise the plugin
     *
     * @return void
     */
    public function init(): void
    {
        parent::init();
    }

    /**
     * Create an instance of the plugin settings model
     *
     * @return Settings
     */
    protected function createSettingsModel(): Settings
    {
        return new Settings();
    }

    /**
     * Renders the settings HTML
     *
     * @return string
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->getView()->renderTemplate(
            '<%= plugin.handle %>/settings',
            ['settings' => $this->getSettings()]
        );
    }
}