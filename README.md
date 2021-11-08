# Guarder

[![NPM Version](https://badge.fury.io/js/guarder.svg)](https://badge.fury.io/js/guarder)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_guarder&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ToeFungi_guarder)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_guarder&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ToeFungi_guarder)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_guarder&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ToeFungi_guarder)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_guarder&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ToeFungi_guarder)

Guarder is a simple validation library that allows quick validation on properties.

**This project is still in development.**

## Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
    - [Null Guard](#nullt--anyproperty-t-message-string-error-classerror-t)
    - [Undefined Guard](#undefinedt--anyproperty-t-message-string-error-classerror-t)
    - [Empty Guard](#emptyt--anyproperty-t-message-string-error-classerror-t)
    - [Get Registered Guards](#getregisteredguards-string)
    - [Unregister Guard](#unregisterguardguardname-string-void)
    - [Register Guard](#registerguardguardname-string-guard-classguard-void)
    - [Custom Guards](#customt--anyguardname-string-property-t-message-string-error-classerror-t)
    - [Inline Custom Guards](#inlinecustomt--anyguard-guard-property-t-message-string-error-classerror-t)
- [Tests](#tests)
- [Issues](#issues)
- [Contributions](#contributions)
- [License](#license)

## Getting Started

You can get started with cloning the Guarder repository by using the following command:

```bash
$ git clone git@github.com:ToeFungi/guarder.git
$ cd guarder
$ npm i
```

## Installation

Use the following command to install the Guarder package:

```
npm i guarder
```

## Usage

#### .null<T = any>(property: T, message?: string, error?: Class<Error>): T

You can validate that the specified property is not `null` using the `.null` guard and specify the error message and
error to be thrown if the property is `null`.

```typescript
// Returns the property
const property = Guarder.null('not null')
console.log({ property })

// Throws `ArgumentError`
const property = Guarder.null(null)

// Throws `ArgumentError('Property is null')`
const property = Guarder.null(null, 'Property is null')

// Throws `CustomError('Property is null')`
const property = Guarder.null(null, 'Property is null', CustomError)
```

#### .undefined<T = any>(property: T, message?: string, error?: Class<Error>): T

You can validate that the specified property is not `undefined` using the `.undefined` guard and specify the error
message and error to be thrown if the property is `undefined`.

```typescript
// Returns the property
const property = Guarder.undefined('not undefined')
console.log({ property })

// Throws `ArgumentError`
const property = Guarder.undefined(undefined)

// Throws `ArgumentError('Property is undefined')`
const property = Guarder.undefined(undefined, 'Property is undefined')

// Throws `CustomError('Property is undefined')`
const property = Guarder.undefined(undefined, 'Property is undefined', CustomError)
```

#### .empty<T = any>(property: T, message?: string, error?: Class<Error>): T

You can validate that the specified property is not `empty` using the `.empty` guard and specify the error message and
error to be thrown if the property is `empty`. The property will be considered empty if:

It is an empty string, an array with length of 0 or an object with no keys. Undefined and null are also considered to be
empty.

```typescript
// Returns the property
const property = Guarder.empty('not empty')
console.log({ property })

// Throws `ArgumentError`
const property = Guarder.empty('')
const property = Guarder.empty([])
const property = Guarder.empty({})
const property = Guarder.empty(null)
const property = Guarder.empty(undefined)

// Throws `ArgumentError('Property is empty')`
const property = Guarder.empty('', 'Property is empty')

// Throws `CustomError('Property is empty')`
const property = Guarder.empty('', 'Property is undefined', CustomError)
```

#### .getRegisteredGuards(): string[]

You can retrieve the list of registered guards to validate the guard functionality available. By default, the `empty`,
`null` and `undefined` guards are initialised.

```typescript
const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'empty', 'undefined' ]
```

#### .unregisterGuard(guardName: string): void

You can unregister a specific guard by name. This will remove the guard from the map and it will no longer be available
for use.

```typescript
Guarder.unregisterGuard('empty')

const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'undefined' ]
```

#### .registerGuard(guardName: string, guard: Class<Guard>): void

You can register guards and specify the guard name. This allows you to build custom guards and register them for use.

```typescript
Guarder.registerGuard('custom-guard', TestGuard)

const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'empty', 'undefined', 'custom-guard' ]
```

#### .custom<T = any>(guardName: string, property: T, message?: string, error?: Class<Error>): T

You can use your custom guard after it is registered with the `custom` functionality. You need to specify which guard
you want to use and pass the remaining parameters as normal.

```typescript
Guarder.registerGuard('custom-guard', TestGuard)
const property = Guarder.custom('custom-guard', 'property', 'Property failed validation', CustomError)
console.log({ property })
```

#### .inlineCustom<T = any>(guard: Guard, property: T, message?: string, error?: Class<Error>): T

You can specify the guard to use as a once off guard without needing to register it using the `inlineCustom` mechanism.
The `TestGuard` guard will not be registered in the guard map and will need to be passed each time the mechanism is
used.

```typescript
const property = Guarder.inlineCustom(TestGuard, 'property', 'Property failed validation', CustomError)
console.log({ property })
```

## Tests

To run tests, you should be able to simply run be able to run the following.

```bash
$ npm run test
$ npm run coverage
```

The testing framework used is Mocha. Chai and nyc are used for assertions and coverage reporting respectively. Ensure
that any new changes are covered by an accompanying test suite.

## Issues

If you find any problems while working with this library, please log an issue
[here](https://github.com/ToeFungi/guarder/issues) so that development can begin to rectify the error.

## Contributions

This project is completely open source and as such, you are invited to make contributions. Fork the project, make some
changes and make the pull request. If you have any feedback regarding the functionality, please don't hesitate to open
an issue so this can be resolved. Please ensure that any pull requests have unit tests that cover any additional
functionality.

## License

MIT License

Copyright (c) 2021 Alex Pickering
