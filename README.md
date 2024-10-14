### Hexlet tests and linter status:

[![hexlet-check](https://github.com/DarkN3ro/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/DarkN3ro/frontend-project-46/actions/workflows/hexlet-check.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/14640bf0b4e3cf8362f0/maintainability)](https://codeclimate.com/github/DarkN3ro/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/14640bf0b4e3cf8362f0/test_coverage)](https://codeclimate.com/github/DarkN3ro/frontend-project-46/test_coverage)

## Description

Gendiff is a program that detects the difference between two data structures. This program accepts input data in json and yaml formats, compares them with each other and outputs the result in one of three format options. The files are subject to comparison, both of which are json, both of which are yaml, as well as if one format differs from the other, for example, the first json file and the second yaml.

## Functional

Support for input formats: yaml, json.

Creating a report in the following formats:
- stylish (default format)
- plain text
- json

## How to Setup

1. Clone repository
2. Go to the directory with the cloned repository
3. Run the command "make install"

## Calling the help information 
```bash
gendiff -h
```
## Calling the difference calculation

Creating a report in the format Stylish(default)
```bash
gendiff firstFileName.expansion secondFileName.expansion -f (--format)
```
```bash
gendiff firstFileName.expansion secondFileName.expansion -f (--format) stylish
```
Creating a report in the format Plain
```bash
gendiff firstFileName.expansion secondFileName.expansion -f (--format) plain
```
Creating a report in the format JSON
```bash
gendiff firstFileName.expansion secondFileName.expansion -f (--format) json
```

## Demo Games

- Comparing JSON type files

[![asciicast](https://asciinema.org/a/679507.svg)](https://asciinema.org/a/679507)

- Comparing YAML  type files

[![asciicast](https://asciinema.org/a/680839.svg)](https://asciinema.org/a/680839)

- Comparing JSON type files with nesting

[![asciicast](https://asciinema.org/a/680841.svg)](https://asciinema.org/a/680841)

- Comparing JSON type files with nesting (format 'stylish', 'plain', 'default')

[![asciicast](https://asciinema.org/a/680858.svg)](https://asciinema.org/a/680858)

- Comparing YAML type files with nesting (format 'stylish', 'plain', 'default')

[![asciicast](https://asciinema.org/a/680861.svg)](https://asciinema.org/a/680861)

- Comparing JSON type files with nesting (format 'json')

[![asciicast](https://asciinema.org/a/680864.svg)](https://asciinema.org/a/680864)

- Full-fledged operation of the program

[![asciicast](https://asciinema.org/a/680889.svg)](https://asciinema.org/a/680889)