const tasks = arr => arr.join(' && ')

const insights = './tools/vendor/bin/phpinsights --no-interaction --min-quality=95 --min-style=95 --min-complexity=90 --min-architecture=90'
const cpd = './tools/vendor/bin/phpcpd --fuzzy ./src'
const tests = './tools/vendor/bin/codeception'

module.exports = {
  hooks: {
    'pre-commit': tasks(['lint-staged']),
    'pre-push': tasks([insights, cpd, tests])
  }
}
