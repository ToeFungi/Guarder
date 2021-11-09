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
- [Guides](#guides)
    - [Default Guards](#default-guards)
    - [Official Guards](#official-guards)
    - [Examples](#examples)
    - [Creating Custom Guards](#creating-custom-guards)
- [Usage](#usage)
    - [Null Guard](#nullproperty-t-message-string-error-instantiable)
    - [Undefined Guard](#undefinedproperty-t-message-string-error-instantiable)
    - [Empty Guard](#emptyproperty-t-message-string-error-instantiable)
    - [Falsy Guard](#falsyproperty-t-message-string-error-instantiable)
    - [Get Registered Guards](#getregisteredguards)
    - [Unregister Guard](#unregisterguardguardname-string)
    - [Register Guard](#registerguardguardname-string-guard-instantiable)
    - [Custom Guards](#customguardname-string-property-t-message-string-error-instantiable)
    - [Inline Custom Guards](#guardguard-guard-property-t-message-string-error-instantiable)
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

## Guides

Guides are basic information about the package for easier use. This section aims to satisfy FAQs.

#### Default Guards

The default configured guards are the following:

- [EmptyGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/EmptyGuard.ts)  
  _Empty Guard ensures that the property is not null or undefined. A string should contain at least one character, an
  array should contain at least one item, an object should contain at least one key_
- [FalsyGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/FalsyGuard.ts)  
  _Falsy Guard ensures that the property does not evaluate to false in a type coercion_
- [NullGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/NullGuard.ts)  
  _Undefined Guard ensures that the property is not null_
- [UndefinedGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/UndefinedGuard.ts)  
  _Undefined Guard ensures that the property is not undefined_

As a general rule of thumb, default configured guards will always be available by name within the `Guarder` class.

#### Official Guards

The full list of packaged official guards include:

- [EmptyGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/EmptyGuard.ts)  
  _Empty Guard ensures that the property is not null or undefined. A string should contain at least one character, an
  array should contain at least one item, an object should contain at least one key_
- [FalsyGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/FalsyGuard.ts)  
  _Falsy Guard ensures that the property does not evaluate to false in a type coercion_
- [NegativeGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/NegativeGuard.ts)  
  _Negative Guard validates a property is not a negative number_
- [NullGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/NullGuard.ts)  
  _Undefined Guard ensures that the property is not null_
- [NumberGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/NumberGuard.ts)  
  _Number Guard validates that the property is a number_
- [UndefinedGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/UndefinedGuard.ts)  
  _Undefined Guard ensures that the property is not undefined_
- [WhitespaceGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/WhitespaceGuard.ts)  
  _Whitespace Guard validates that the string does not contain only whitespace_
- [ZeroGuard](https://github.com/ToeFungi/guarder/blob/master/src/guards/ZeroGuard.ts)  
  _Zero Guard validates that the property is not zero_

#### Examples

Considering this is a convenience package, the following example highlights reducing line count.

```typescript
// This is
if (property === undefined || property === null) {
  throw new Error('Property cannot be null')
}

// Replace by this
Guard.null(property)
// Or this
Guard.null(property, 'Custom Error Message')
// Or this
Guard.null(property, 'Custom Error Message', CustomError)
```

#### Creating Custom Guards

The package exposes the `Guard` interface which can be implemented to create your own custom guard classes. If you are
planning on using your custom guard multiple times, you can register your custom guard. If you want to use your custom
guard once, you can simply use the inline guard mechanism exposed by the library.

```typescript
class CustomGuard implements Guard {
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be `foo`'

    if (property === 'foo') {
      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { CustomGuard }
```

```typescript
// Register and use custom guard
Guarder.registerGuard('custom-guard', CustomGuard)
Guarder.custon('custom-guard', property, message, error)

// Inline and once off
Guarder.guard(CustomGuard, property, message, error)
```

## Usage

#### .null(property: T, message?: string, error?: Instantiable)

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

#### .undefined(property: T, message?: string, error?: Instantiable)

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

#### .empty(property: T, message?: string, error?: Instantiable)

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

#### .falsy(property: T, message?: string, error?: Instantiable)

You can guard against values that evaluate to false in type coercion.

[Falsy Values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

```typescript
Guarder.falsy('') // Error
Guarder.falsy(false) // Error
Guarder.falsy(0) // Error
Guarder.falsy(-0) // Error
Guarder.falsy(null) // Error
Guarder.falsy(undefined) // Error

Guarder.falsy('foo') // 'foo'
Guarder.falsy(1) // 1
Guarder.falsy([]) // []
Guarder.falsy({}) // {}
```

#### .getRegisteredGuards()

You can retrieve the list of registered guards to validate the guard functionality available. By default, the `empty`,
`null` and `undefined` guards are initialised.

```typescript
const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'empty', 'undefined' ]
```

#### .unregisterGuard(guardName: string)

You can unregister a specific guard by name. This will remove the guard from the map and it will no longer be available
for use.

```typescript
Guarder.unregisterGuard('empty')

const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'undefined' ]
```

#### .registerGuard(guardName: string, guard: Instantiable)

You can register guards and specify the guard name. This allows you to build custom guards and register them for use.

```typescript
Guarder.registerGuard('custom-guard', TestGuard)

const guards = Guarder.getRegisteredGuards()
console.log({ guards })
// [ 'null', 'empty', 'undefined', 'custom-guard' ]
```

#### .custom(guardName: string, property: T, message?: string, error?: Instantiable)

You can use your custom guard after it is registered with the `custom` functionality. You need to specify which guard
you want to use and pass the remaining parameters as normal.

```typescript
Guarder.registerGuard('custom-guard', TestGuard)
const property = Guarder.custom('custom-guard', 'property', 'Property failed validation', CustomError)
console.log({ property })
```

#### .guard(guard: Guard, property: T, message?: string, error?: Instantiable)

You can specify the guard to use as a once off guard without needing to register it using the `guard` mechanism. The
`TestGuard` guard will not be registered in the guard map and will need to be passed each time the mechanism is used.

```typescript
const property = Guarder.guard(TestGuard, 'property', 'Property failed validation', CustomError)
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
