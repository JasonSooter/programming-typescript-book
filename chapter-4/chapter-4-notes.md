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

- Generic Type Parameter: A placeholder type used to enforce a type-level constraint in multiple places. Also know as polymorphic type parameter

### Defining Filter using a Generic type parameter

```ts
type Filter = {
	<T>(array: T[], f: (item: T) => boolean): T[]
}
```

The above type allows us to derive the following:
- the function `filter` uses a generic type parameter `T`
- we don't know what this type will be ahead of time
- we rely on TypeScript to infer what type it is each time we call `filter`

TypeScript infers `T` from the type we pass in for `array`. Each type `filter` is called, TypeScript substitutes that type in for every `T` it sees. `T` is a placeholder type, to be filled in by the typechecker from context' it *parameterizes* `Filter`'s type, which is why we call it a generic type `parameter`

> [!note] Because it's such a mouthful to say "generic type parameter" every time, people often shorten it to just `generic type`, or simply `generic`

Use `<>` to declare generic type parameters. They're equivalent to the `type` keyword, but for `generic types`

In the same way that a function's parameter gets re-bound every time you call that function, each call to `filter` gets its own binding to `T`

```ts
type Filter = {
	<T>(array: T[], f: (item: T) => boolean): T[]
}

let filter : Filter = (array, f) => // ...

// (a) T is bound to `number`
filter([1, 2, 3], _ => _ > 2)

// (b) T is bound to `string`
filter(['a', 'b', 'c'], _ => _ !== 'b')

// (c) T is bound to {firstName: string}
let names = [
	{firstName: 'beth'},
	{firstName: 'caitlyn'},
	{firstName: 'xin'}
]
filter(names, _ => _.firstName.startsWith('b'))
```

> [!note] Use generics whenever you can. They will help keep your code general, reusable, and terse.


### Where can you declare Generics?

For each of TypeScript’s ways to declare a call signature, there’s a way to add a generic type to it:

```ts
// 1. A full call signature, with T scoped to an individual signature
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter = // ...

// 2. A full call signature, with `T` scoped to ALL of the signatures
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter<number> = // ...

// 3. Like 1 but a shorthand call signature instead of a full one
type Filter = <T>(array: T[], f: (item: T) => boolean) => T[]
let filter: Filter = // ...

// 4. Like 2 but a shorthand call signature instead of a full one
type Filter<T> = (array: T[], f: (item: T) => boolean) => T[]
let filter: Filter<string> = // ...

// 5. A named function call signature, with `T` scoped to the signature
function filter<T>(array: T[], f: (item: T) => boolean): T[] { // ... }
```

### Writing `map` using Generic Parameterization

```ts
function map<T, U>(array: T[], f: (item: T) => U): U[] {
	let result = []
	for (let i = 0; i < array.length; i++) {
		result[i] = f(array[i])
	}
	return result
}

// in use
const result = map(
	['a', 'b', 'c'],  // An array of T
	_ => _ === 'a'    // A function that returns a U
)
result; // An array of U
```

## Generic Type Aliases
```ts
type MyEvent<T> = {
	target: T
	type: string
}

type ButtonEvent = MyEvent<HTMLButtonElement>

// One type can be used to build another
type TimedEvent<T> = {
	event: MyEvent<T>
	from: Date
	to: Date
}

// Generic type aliases can be used in a function signature
function triggerEvent<T>(event: MyEvent<T>): void {
	// ...
}

triggerEvent({ // T is Element | null
	target: document.querySelector('#myButton'),
	type: 'mouseover'
})
```

1. We call `triggerEvent` with an object
2. TypeScript sees that according to our function’s signature, the argument we passed has to have the type `MyEvent<T>`. It also notices that we defined `MyEvent<T>` as `{target: T, type: string}`.
3. TypeScript notices that the `target` field of the object we passed is `document.querySelector('#myButton')`. That implies that `T` must be whatever type `document.querySelector('#myButton')` is: `Element | null`. So `T` is now bound to `Element | null`.
4. TypeScript goes through and replaces every occurrence of `T` with `Element | null`.
5. TypeScript checks that all of our types satisfy assignability. They do, so our code typechecks.

## Bounded Polymorphism

### Implementing a Binary Tree
1. Regular `TreeNode`s
2. `LeafNode`s, which are `TreeNode`s that don’t have children
3. `InnerNode`s, which are `TreeNode`s that do have children

```ts
type TreeNode = { value: string }
type LeafNode = TreeNode & { isLeaf: true }
type InnerNode = TreeNode & {
	children: [TreeNode] | [TreeNode, TreeNode]
}
```

- a `TreeNode` is an object with a single property, `value`.
- The `LeafNode` type has all the properties `TreeNode` has, plus a property `isLeaf` that’s always `true`. 
- `InnerNode` also has all of `TreeNode`’s properties, plus a `children` property that points to either one or two children.

### Writing a `mapNode` function
```ts
let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}

let a1 = mapNode(a, _ => _.toUpperCase()) // TreeNode
let b1 = mapNode(b, _ => _.toUpperCase()) // LeafNode
let c1 = mapNode(c, _ => _.toUpperCase()) // InnerNode
```

Function criteria:
- Accepts a subtype of `TreeNode` and returns _that same subtype_. i.e. Passing in
	- a `LeafNode` should return a `LeafNode`
	- an `InnerNode` should return an `InnerNode`
	- a `TreeNode` should return a `TreeNode`

```ts
function mapNode<T extends TreeNode>(
	node: T,
	f: (value: string) => string
): T {
	return { ...node, value: f(node.value) }
} 
```

Notes:
- `mapNode` is a function that defines a single generic type parameter, `T`. `T` has an upper bound of `TreeNode`. That is, `T` can be either a `TreeNode`, or a subtype of `TreeNode`.
- `mapNode` takes two parameters:
	- the first of which is a `node` of type `T`. Because we said `node extends TreeNode`, if we passed in something that’s not a `TreeNode`—say, an empty object `{}`, `null`, or an array of `TreeNode`s—that would be an instant red squiggly. `node` has to be either a `TreeNode` or a subtype of `TreeNode`.
	- the second of which is a callback function
- `mapNode` returns a value of type `T` (a `TreeNode` or any subtype of `TreeNode`)

Why did we have to declare `T` that way?
- If we had typed `T` as just `T` (leaving off `extends TreeNode`), then `mapNode` would have thrown a compile-time error, because you can’t safely read `node.value` on an unbounded `node` of type `T` (what if a user passes in a number?).
- If we had left off the `T` entirely and declared `mapNode` as `(node: TreeNode, f: (value: string) => string) => TreeNode`, then we would have lost information after mapping a node: `a1`, `b1`, and `c1` would all just be `TreeNode`s.
- By saying that `T extends TreeNode`, we get to preserve the input node’s specific type (`TreeNode`, `LeafNode`, or `InnerNode`), even after mapping it.

### Bounded Polymorphism with Multiple Constraints

```ts
type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }

function logPerimeter<
  Shape extends HasSides & SidesHaveLength
>(s: Shape): Shape {
  console.log(s.numberOfSides * s.sideLength)
  return s
}

type Square = HasSides & SidesHaveLength
let square: Square = { numberOfSides: 4, sideLength: 3 }
logPerimeter(square) // Square, logs "12"
```

Notes:
- `logPerimeter` is a function that takes a single argument `s` of type `Shape`
- `Shape` is a generic type that extends both the `HasSides` type and the `SidesHaveLength` type. In other words, a `Shape` has to at least have sides with lengths.
- `logPerimeter` returns a value of the exact same type you gave it

### Generic Type Defaults

Just like you can give function parameters default values, you can give generic type parameters default types.

The `MyEvent` type above given a default type (`HTMLElement`) for the its generic:
```ts
type MyEvent<T = HTMLElement> = {
  target: T
  type: string
}

// with a bound added
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T
  type: string
}

let myEvent: MyEvent = {
  target: myElement,
  type: string
}
```

## Type-Driven Development
> A style of programming where you sketch out type signatures first, and fill in values later.
