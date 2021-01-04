const Generator = require('yeoman-generator')
const { toSnakeCase } = require('js-convert-case')
const licenses = require('generator-license').licenses

const staticTemplates = {
  _editorconfig: '.editorconfig',
  _gitignore: '.gitignore',
  '_huskyrc.js': '.huskyrc.js',
  _nvmrc: '.nvmrc',
  '_php_cs.dist': ['.php_cs', '.php_cs.dist'],
  'phpinsights.php': 'phpinsights.php',
  'src/_gitkeep': 'src/.gitkeep',
  'src/icon.svg': 'src/icon.svg',
  'src/icon-mask.svg': 'src/icon-mask.svg',
  'tests/_gitkeep': 'tests/.gitkeep'
}

const dynamicTemplates = {
  'CHANGELOG.md': 'CHANGELOG.md',
  'codeception.yml': 'codeception.yml',
  'composer.json': 'composer.json',
  'package.json': 'package.json',
  'README.md': 'README.md',
  'src/Plugin.php': 'src/Plugin.php',
  'src/models/Settings.php': 'src/models/Settings.php',
  'src/templates/settings.twig': 'src/templates/settings.twig',
  'tools/composer.json': 'tools/composer.json'
}

const toKebabCase = (input) => toSnakeCase(input).replace('_', '-')
const validateString = (value) => typeof value === 'string'
const validateRequired = (value) => value.length > 0
const validateEmail = (value) => validateString(value) && value.includes('@')
const validatePluginHandle = (value) => /^[a-z-]+$/.test(value)
const validatePluginPackage = (value) => /^[a-z_-]+\/[a-z_-]+$/.test(value)
const validatePluginVersion = (value) => /^\d+\.\d+\.\d+$/.test(value)

module.exports = class extends Generator {
  async prompting () {
    this.props = await this.prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        store: true,
        validate: (value) => validateString(value) && validateRequired(value)
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email',
        store: true,
        validate: validateEmail
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author website (optional)',
        store: true
      },
      {
        type: 'input',
        name: 'pluginName',
        message: 'Plugin name (e.g. Oh Hai)',
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
      },
      {
        type: 'input',
        name: 'pluginDescription',
        message: 'Plugin description',
        validate: (value) => validateString(value) && validateRequired(value)
      },
      {
        type: 'input',
        name: 'pluginVersion',
        message: 'Plugin version',
        default: '0.1.0',
        validate: validatePluginVersion
      },
      {
        type: 'input',
        name: 'pluginHandle',
        message: 'Plugin handle (e.g. oh-hai)',
        default: ({ pluginName }) => toKebabCase(pluginName),
        validate: validatePluginHandle
      },
      {
        type: 'input',
        name: 'pluginNamespace',
        message: 'Plugin namespace (e.g. username)',
        validate: (value) => validateString(value) && validateRequired(value)
      },
      {
        type: 'input',
        name: 'pluginPackage',
        message: 'Package name (e.g. username/craft-oh-hai)',
        default: ({ pluginNamespace, pluginHandle }) => `${pluginNamespace}/craft-${pluginHandle}`,
        validate: validatePluginPackage
      },
      {
        type: 'list',
        name: 'pluginLicense',
        message: 'Select a license',
        default: 'MIT',
        choices: licenses,
        store: true,
        validate: (value) => validateString(value) && validateRequired(value)
      }
    ])
  }

  writing () {
    this._prepProps()
    this._copyFiles()
    this._copyTemplates()

    this.composeWith(require.resolve('generator-license'), {
      name: this.props.authorName,
      email: this.props.authorEmail,
      website: this.props.authorUrl,
      license: this.props.pluginLicense,
      output: 'LICENSE.txt'
    })
  }

  _ensureArray (item) {
    return Array.isArray(item) ? item : [item]
  }

  _prepProps () {
    Object.entries(this.props).forEach(([key, value]) => {
      this.props[key] = value.trim()
    })
  }

  _copyFiles () {
    for (const [from, to] of Object.entries(staticTemplates)) {
      this._ensureArray(to).forEach((t) => {
        this.fs.copy(this.templatePath(from), this.destinationPath(t))
      })
    }
  }

  _copyTemplates () {
    const context = this._templateContext()

    for (const [from, to] of Object.entries(dynamicTemplates)) {
      this._ensureArray(to).forEach((t) => {
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(t), context)
      })
    }
  }

  _templateContext () {
    const safeHandle = this.props.pluginHandle.replace(/[_-]/, '').toLowerCase()

    return {
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      plugin: {
        name: this.props.pluginName,
        handle: this.props.pluginHandle,
        description: this.props.pluginDescription,
        namespace: `${this.props.pluginNamespace}\\${safeHandle}`,
        package: this.props.pluginPackage,
        license: this.props.pluginLicense,
        version: this.props.pluginVersion
      },
      date: {
        ymd: new Date().toISOString().split('T')[0],
        year: new Date().getUTCFullYear()
      }
    }
  }
}
