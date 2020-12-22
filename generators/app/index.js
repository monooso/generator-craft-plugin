const Generator = require('yeoman-generator')
const { toPascalCase } = require('js-convert-case')
const licenses = require('generator-license').licenses

const staticTemplates = {
  _editorconfig: '.editorconfig',
  _gitignore: '.gitignore',
  '_huskyrc.js': '.huskyrc.js',
  _nvmrc: '.nvmrc',
  '_php_cs.dist': '.php_cs.dist',
  '_scrutinizer.yml': '.scrutinizer.yml',
  'phpinsights.php': 'phpinsights.php',
  'src/_gitkeep': 'src/.gitkeep',
  'tests/_gitkeep': 'tests/.gitkeep',
  'tools/php-cs-fixer/composer.json': 'tools/php-cs-fixer/composer.json'
}

const dynamicTemplates = [
  'CHANGELOG.md',
  'composer.json',
  'package.json',
  'README.md',
  'src/Plugin.php',
  'src/models/Settings.php',
  'templates/settings.twig'
]

const validateString = (value) => {
  return typeof value === 'string'
}

const validateRequired = (value) => {
  return value.length > 0
}

const validatePackageName = (value) => {
  return /^[a-z_-]+\/[a-z_-]+$/.test(value)
}

const validatePluginHandle = (value) => {
  return /^[a-z-]+[a-z-]+$/.test(value)
}

const validatePluginVersion = (value) => {
  return /^\d+\.\d+\.\d+$/.test(value)
}

const validateEmail = (value) => {
  return validateString(value) && value.includes('@')
}

module.exports = class extends Generator {
  async prompting () {
    this.props = await this.prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        store: true,
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
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
        name: 'authorWebsite',
        message: 'Author website (optional)',
        store: true
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (e.g. username/craft-oh-hai)',
        validate: validatePackageName
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
        name: 'pluginHandle',
        message: 'Plugin handle (e.g. oh-hai)',
        validate: validatePluginHandle
      },
      {
        type: 'input',
        name: 'pluginDescription',
        message: 'Plugin description',
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
      },
      {
        type: 'input',
        name: 'pluginVersion',
        message: 'Plugin version',
        default: '0.1.0',
        validate: validatePluginVersion
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select a license',
        default: 'MIT',
        choices: licenses,
        store: true,
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
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
      website: this.props.authorWebsite,
      license: this.props.license,
      output: 'LICENSE.txt'
    })
  }

  _prepProps () {
    Object.entries(this.props).forEach(([key, value]) => {
      this.props[key] = value.trim()
    })
  }

  _copyFiles () {
    for (const [from, to] of Object.entries(staticTemplates)) {
      this.fs.copy(this.templatePath(from), this.destinationPath(to))
    }
  }

  _copyTemplates () {
    const context = this._templateContext()

    dynamicTemplates.forEach((f) =>
      this.fs.copyTpl(this.templatePath(f), this.destinationPath(f), context)
    )
  }

  _templateContext () {
    return {
      authorEmail: this.props.authorEmail,
      authorName: this.props.authorName,
      authorWebsite: this.props.authorWebsite,
      autoloadNamespace: toPascalCase(this.props.pluginHandle),
      dateStamp: new Date().toISOString().split('T')[0],
      dateYear: new Date().getUTCFullYear(),
      license: this.props.license,
      packageName: this.props.packageName,
      pluginDescription: this.props.pluginDescription,
      pluginHandle: this.props.pluginHandle,
      pluginName: this.props.pluginName,
      pluginVersion: this.props.pluginVersion,
      title: this.props.pluginName
    }
  }
}
