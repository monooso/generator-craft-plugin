const tasks = arr => arr.join(' && ')

const insights = './vendor/bin/phpinsights --no-interaction --min-quality=95 --min-complexity=95 --min-architecture=95 --min-style=95'
const cpd = './vendor/bin/phpcpd --fuzzy ./src'
const phpunit = './vendor/bin/phpunit'

module.exports = {
  'hooks': {
    'pre-commit': tasks(['lint-staged']),
    'pre-push': tasks([insights, cpd, phpunit])
  }
}
