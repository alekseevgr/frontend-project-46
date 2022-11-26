### Hexlet tests and linter status:
[![Actions Status](https://github.com/alekseevgr/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/alekseevgr/frontend-project-46/actions)
[![Node.js CI](https://github.com/alekseevgr/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/alekseevgr/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/360efcf317da4cc44f03/maintainability)](https://codeclimate.com/github/alekseevgr/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/360efcf317da4cc44f03/test_coverage)](https://codeclimate.com/github/alekseevgr/frontend-project-46/test_coverage)

## Description

**Вычислитель отличий** это программа, которая показывает различия между двумя файлами. Поддерживаемые форматы файлов: JSON, YML, YAML.

## Requirements

Installed Node.js version 13 and above

## Setup

clone the repository or use 
 ```bash
 git clone git@github.com:alekseevgr/frontend-project-46.git
 ```
 install dependencies
 ```bash
 make install
 ```

## Run tests

```bash
make test
```

## How to use

```bash
node bin/gendiff.js -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```