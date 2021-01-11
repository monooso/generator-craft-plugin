# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.3.0] - 2021-01-11
### Fixed
- Fixed deprecated PHP CS Fixer config
- Removed unused import from main plugin file

### Added
- Added boilerplate test files
- Added and configured [`monooso/craft-bolt`](https://github.com/monooso/craft-bolt) dependency, to speed up tests
- Added [`putyourlightson/craft-log-to-file`](https://github.com/putyourlightson/craft-log-to-file) dependency, for plugin-specific logs

## [0.2.0] - 2021-01-05
### Fixed
- Fixed license in `tools/composer.json`
- Fixed plugin class in `composer.json`
- Fixed SVG icons resizing bug

### Changed
- Updated template `.editorconfig` to use two spaces for JSON

## 0.1.0 - 2021-01-05
### Added
- Initial alpha release

[Unreleased]: https://github.com/monooso/generator-craft-plugin/compare/v0.3.0...main
[0.2.0]: https://github.com/monooso/generator-craft-plugin/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/monooso/generator-craft-plugin/compare/v0.1.0...v0.2.0