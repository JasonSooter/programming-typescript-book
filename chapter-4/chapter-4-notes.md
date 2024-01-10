# Chapter 4 Notes | Functions

## Declaring and Invoking Functions

Basic function in Typescript with annotated function parameters:
```typescript
function add(a: number, b:number) {
	return a + b
}
```

In most cases, function parameters will be annotated. But you can also annotate the return type as shown below:
```typescript
function add(a: number, b:number): number {
	return a + b
}
```

Five ways functions can be declared in both JavaScript & Typescript
```typescript
// Named function
function greet(name: string) {
  return 'hello ' + name
}

// Function expression
const greet2 = function(name: string) {
  return 'hello ' + name
}

// Arrow function expression
const greet3 = (name: string) => {
  return 'hello ' + name
}

// Shorthand arrow function expression
const greet4 = (name: string) => 'hello ' + name
```

Typescript will point out:
- if you provide the wrong number or arguments
- and/or arguments of the wrong type
```typescript
add(1)            // Error TS2554: Expected 2 arguments, but got 1.
add(1, 'a')       // Error TS2345: Argument of type '"a"' is not assignable
                  // to parameter of type 'number'.
```

## Optional and Default Parameters

Just as with `object` & `tuple` types, you use the question mark `?` to mark parameters as optional.  When declaring a function, required parameters must be listed first with optional parameters to follow

```typescript
function log(message: string, userId?: string) {
  let time = new Date().toLocaleTimeString()
  console.log(time, message, userId || 'Not signed in')
}

log('Page loaded') // Logs "12:38:31 PM Page loaded Not signed in"
log('User signed in', 'da763be') // Logs "12:38:31 PM User signed in da763be"
```

As with JavaScript, you can provide default values for optional parameters, but since a default value has been provided, it no longer needs to come after required parameters. Also, you no longer need to provide a type (`string`) as Typescript can infer the type based on the type of the default value. AND, you can drop the `?` from the end of the parameter as shown below where `log` is refactored:

```typescript
function log(message: string, userId = 'Not signed in') {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}

log('User clicked on a button', 'da763be')
log('User signed out')
```

In some cases you may want to provide a type AND a default value as shown below:
```typescript
type Context = {
  appId?: string
  userId?: string
}

function log(message: string, context: Context = {}) {
  let time = new Date().toISOString()
  console.log(time, message, context.userId)
}
```

More often than not, you'll use default parameters over optional parameters

## Rest Parameters
If a function takes a list of arguments, you can pass in an array:
```typescript
function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sum([1, 2, 3]) // evaluates to 6
```

However, if you'd like to create a function that accepts a variable number of arguments (variadic), you can use rest parameters:

```typescript
// Note the ... that prefixes the `numbers` parameter
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sumVariadicSafe(1, 2, 3) // evaluates to 6
sumVariadicSafe(1, 2, 3, 4) // evaluates to 10
```

A function can have at most 1 rest parameter and it must come last if more than 1 parameter exists. The type for`console.log`  provides a good example:
```typescript
interface Console {
  log(message?: any, ...optionalParams: any[]): void
}
```

## Call Signature

As used earlier, we typed `sum` as follows:
```typescript
function sum(a: number, b: number): number {
  return a + b
}
```

We can say the call signature of `sum` is:
```typescript
(a: number, b: number) => number
```

Here are the call signatures of functions we've used above:
```typescript
// function greet(name: string)
type Greet = (name: string) => string

// function log(message: string, userId?: string)
type Log = (message: string, userId?: string) => void

// function sumVariadicSafe(...numbers: number[]): number
type SumVariadicSafe = (...numbers: number[]) => number
```

### Log rewritten to use its call signature

```typescript
type Log = (message: string, userId?: string) => void

const log: Log = (message, userId = 'Not signed in') => {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}
```

1. We declare a function expression `log`, and explicitly type it as type `Log`.
2. We don’t need to annotate our parameters since `message` is already annotated as a `string` as part of the definition for `Log`. Instead, we let TypeScript infer it for us from Log.
3. We add a default value for `userId`, since we captured `userId`’s type in our signature for `Log`, but we couldn’t capture the default value as part of `Log` because `Log` is a type and can’t contain values.
4. We don’t need to annotate our return type again, since we already declared it as void in our `Log` type.

## Contextual Typing

In the previous example, since we declared that `log` was of type `Log`, TypeScript is able to infer from context that `message` of type `string`. This powerful feature is called `contextual typing`.

## Generic Types





