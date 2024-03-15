# Chapter 5 - Classes and Interfaces

> If you’re like most programmers coming from an object-oriented programming
> language, classes are your bread and butter.

😬 This does not define me whatsoever. I so rarely use Classes. But LFG!

## Classes and Inheritance

> Building a Chess Engine

See [chessEngine.ts](chessEngine.ts)

> Every piece has a color and a current position. In chess, positions are
> modeled as (letter, number) coordinate pairs; letters run from left to right
> along the x-axis, numbers from bottom to top along the y-axis. Standard
> algebraic notation in chess: A–H (the x-axis) are called “files” and 1–8 (the
> inverted y-axis) “ranks”

### Access Modifiers

TypeScript supports three access modifiers: `public`, `private`, and
`protected`.

Access modifiers allow you to design classes that don't expose too much
information about their implementations. Instead, they expose well-defined APIs
for others to use.

-   `public` is the default and is accessible from anywhere
-   `private` is accessible from this class only
    -   within the constructor this automatically assigns the parameter to
        `this` (`this.file` and so on), and sets its visibility to private,
        meaning that code within a `Piece` instance can read and write to it,
        but code outside of a Piece instance can’t. Different instances of
        `Piece` can access each other’s private members; instances of any other
        class—even a subclass of `Piece`—can’t.
-   `protected` is like `private`, but it’s also accessible from subclasses of
    `Piece`
    -   `position` is declared as `protected`. Like `private`, `protected`
        assigns the property to `this`, but unlike `private`, `protected` makes
        the property visible both to instances of `Piece` and to instances of
        any subclass of `Piece`. We didn’t assign `position` a value when
        declaring it, so we have to assign a value to it in `Piece`’s
        constructor function. If we hadn’t assigned it a value in the
        constructor, TypeScript would have told us that the variable is not
        definitely assigned, i.e., we said it’s of type `T`, but it’s actually
        `T` | `undefined` because it’s not assigned a value in a property
        initializer or in the constructor—so we would need to update its
        signature to indicate that it’s not necessarily a `Position`, but it
        might also be `undefined`
-   `new Piece` takes three parameters: `color`, `file`, and `rank`
    -   We added two modifiers to `color`:
        -   `private`, meaning assign it to `this` and make sure it’s only
            accessible from an instance of `Piece`
        -   `readonly`, meaning that after this initial assignment it can only
            be read and can’t be written anymore

### `abstract` Classes

“We’ve defined a Piece class, but we don’t want users to instantiate a new Piece
directly—we want them to extend it to create a Queen, a Bishop, and so on, and
instantiate that. We can use the type system to enforce that for us, using the
abstract keyword:

```ts
abstract class Piece {}

// Error TS2511: Cannot create an instance of an abstract class.
new Piece('White', 'E', 1);
```

“The abstract keyword means that you can’t instantiate the class directly, but
it doesn’t mean you can’t define some methods on it:

```ts
abstract class Piece {
    moveTo(position: Position) {
        this.position = position;
    }
    abstract canMoveTo(position: Position): boolean;
}
```

### Classes Summary

-   Declare classes with the class keyword. Extend them with the extends
    keyword.
-   Classes can be either concrete or abstract. Abstract classes can have
    abstract methods and abstract properties.
-   Methods can be private, protected, or, by default, public. They can be
    instance methods or static methods.
-   Classes can have instance properties, which can also be private, protected,
    or, by default, public. You can declare them in constructor parameters or as
    property initializers.
-   You can mark instance properties as readonly when declaring them.

### `super`

As with JavaScript, TypeScript supports `super` calls. If your child class
overrides a method defined on its parent class (say, if Queen and Piece both
implement the take method), the child instance can make a `super` call to call
its parent’s version of the method (e.g., super.take). There are two kinds of
super calls:

1. Method calls, like super.take.
2. Constructor calls, which have the special form super() and can only be called
   from a constructor function. If your child class has a constructor function,
   you must call super() from the child’s constructor to correctly wire up the
   class (don’t worry, TypeScript will warn you if you forget; it’s like a cool
   futuristic robot elephant in that way).

Note that you can only access a parent class’s methods, and not its properties,
with `super`.

## Using `this` as a Return Type

### Implementing ES6's `Set` data structure

```ts
let set = new Set();
set.add(1).add(2).add(3);
set.has(2); // true
set.has(4); // false
```

```ts
class Set {
    has(value: number): boolean {
        // ...
    }
    /**
     * Setting return type to `this` allows chaining
     */
    add(value: number): this {}
}
```

### Interfaces

When you use classes, you will often find yourself using them with interfaces.

Like type aliases, interfaces are a way to name a type so you don’t have to
define it inline. Type aliases and interfaces are mostly two syntaxes for the
same thing (like function expressions and function declarations), but there are
a few small differences. Let’s start with what they have in common. Consider the
following type alias:

```ts
type Sushi = {
    calories: number;
    salty: boolean;
    tasty: boolean;
};
```

This can easily be rewritten as an interface:

```ts
interface Sushi {
    calories: number;
    salty: boolean;
    tasty: boolean;
}
```

Everywhere you used your Sushi type alias, you can also use your Sushi
interface. Both declarations define shapes, and those shapes are assignable to
one another (in fact, they’re identical!).

Things get more interesting when you start combining types. Let’s model another
food in addition to Sushi:

```ts
type Cake = {
    calories: number;
    sweet: boolean;
    tasty: boolean;
};
```

A lot of foods have calories and are tasty—not just Sushi and Cake. Let’s pull
Food out into its own type, and redefine our foods in terms of it:

```ts
type Food = {
    calories: number;
    tasty: boolean;
};

type Sushi = Food & {
    salty: boolean;
};

type Cake = Food & {
    sweet: boolean;
};
```

Nearly equivalently, you can do that with interfaces too:

```ts
interface Food {
    calories: number;
    tasty: boolean;
}
interface Sushi extends Food {
    salty: boolean;
}
interface Cake extends Food {
    sweet: boolean;
}
```

> **Note** Interfaces don’t have to extend other interfaces. In fact, an
> interface can extend any shape: an object type, a class, or another interface.

#### The 4 differences between types and interfaces:

1. Type aliases are more general as their right-hand side can be any type,
   including a type expression. For an interface, the right-hand side must be a
   shape. For example, `type A = string | number` is valid, but
   `interface A = string | number` is not.
2. When you extend an interface, TypeScript checks that the shape you’re
   extending is compatible with the shape you’re extending it with. When you
   extend a type, TypeScript doesn’t check that the shape you’re extending is
   compatible with the shape you’re extending it with. When you’re modeling
   inheritance for object types, the assignability check that TypeScript does
   for interfaces can be a helpful tool to catch errors.

```ts
interface A {
    good(x: number): string;
    bad(x: number): string;
}

/**
 * Error TS2430: Interface 'B' incorrectly extends interface 'A'. Type 'number'
 * is not assignable to type 'string'.
 */
interface B extends A {
    good(x: string | number): string;
    bad(x: string): string;
}
```

3. Declaration Merging: multiple interfaces with the same name in the same scope
   are automatically merged; multiple type aliases with the same name in the
   same scope will throw a compile-time error.

### Declaration Merging

Declaration merging is TypeScript’s way of automatically combining multiple
declarations that share the same name. A few features of TypeScript use it:

-   Interfaces
-   Enums
-   Namespaces

```ts
// User has a single field, name
interface User {
    name: string;
}

// User now has two fields, name and age
interface User {
    age: number;
}

let a: User = {
    name: 'Ashley',
    age: 30
};
```

If you try to merge two types with the same name, TypeScript will throw an
error:

```ts
// Error TS2300: Duplicate identifier 'User'.
type User = {
    name: string;
};

// Error TS2300: Duplicate identifier 'User'.
type User = {
    age: number;
};
```

### Implmentations

When you declare a class, you can use the `implements` keyword to say that it
satisfies a particular interface. Like other explicit type annotations, this is
a convenient way to add a type-level constraint that your class is implemented
correctly as closely as possible to the implementation itself, so that the error
from an incorrect implementation doesn’t show up downstream where it’s less
clear why it was thrown

```ts
interface Animal {
    eat(food: string): void;
    sleep(hours: number): void;
}

// Note the use of `implements` instead of `extends`
class Cat implements Animal {
    eat(food: string) {
        console.info('Ate some', food, '. Mmm!');
    }
    sleep(hours: number) {
        console.info('Slept for', hours, 'hours');
    }
}
```

`Cat` has to implement every method that `Animal` declares, and can implement
more methods and properties on top if it wants.

You’re not limited to implementing just one interface—you can implement as many
as you want:

```ts
interface Animal {
    readonly name: string;
    eat(food: string): void;
    sleep(hours: number): void;
}

interface Feline {
    meow(): void;
}

class Cat implements Animal, Feline {
    name = 'Whiskers';
    eat(food: string) {
        console.info('Ate some', food, '. Mmm!');
    }
    sleep(hours: number) {
        console.info('Slept for', hours, 'hours');
    }
    meow() {
        console.info('Meow');
    }
}
```

#### `implement` w/ Interfaces vs. `extend` an Abstract Classe

`implement`ing an interface is very similar to `extend`ing an abstract class.

The key difference is that interfaces are more general and lightweight, and
abstract classes are more special-purpose and feature-rich.

An interface:

-   is a way to model a shape—an `object`, `array`, `function`, `class`, or
    `class` instance
-   does not emit JavaScript code
-   only exists at compile time.

An abstract class:

-   can only model a class.
-   emits runtime code—a JavaScript class
-   can have constructors
-   provide default implementations
-   set access modifiers for properties and methods.

Interfaces can’t do any of those things.

Which one to use?

-   It depends on your use case.
    -   Use an abstract `class` when an implementation is shared among multiple
        classes.
    -   Use `interface` when a lightweight way to say “this class is a T” is
        needed.

### Classes are Structurally Typed

As with every other type in TypeScript, TypeScript compares classes by their
structure, not by their name. A `class` is compatible with any other type that
shares its shape, including a regular old object that defines the same
properties or methods as the `class`. This means that if you have a function
that takes a `Zebra` and you give it a `Poodle`, TypeScript may not mind:

```ts
class Zebra {
    trot() {
        // ...
    }
}

class Poodle {
    trot() {
        // ...
    }
}

function ambleAround(animal: Zebra) {
    animal.trot();
}

let zebra = new Zebra();
let poodle = new Poodle();

ambleAround(zebra); // OK
ambleAround(poodle); // OK
```

As long as `Poodle` is assignable to `Zebra`, TypeScript is OK with this because
from our function’s point of view, the two are interchangeable; all that matters
is that they implement `.trot`. If you were using almost any other language that
types classes nominally, this code would have raised an error; but TypeScript is
structurally typed through and through, so this code is perfectly acceptable.

The exception to this rule is classes with private or protected fields: when
checking whether or not a shape is assignable to a class, if the class has any
private or protected fields and the shape is not an instance of that class or a
subclass of that class, then the shape is not assignable to the class:

```ts
class A {
    private x = 1;
}
class B extends A {}

function f(a: A) {}

f(new A()); // OK
f(new B()); // OK

/**
 * Error TS2345: Argument of type '{x: number}' is not
 * assignable to parameter of type 'A'. Property 'x' is
 * private in type 'A' but not in type '{x: number}'.”
 */
f({ x: 1 });
```

### Classes Declare Both Values and Types

Most things that you can express in TypeScript are either values or types:

```ts
// value
let a = 1999 function b() {}
// type
type a = number interface b { (): void }
```

Types and values are namespaced separately in TypeScript. Depending on how you
use a term (`a` or `b` in this example), TypeScript knows whether to resolve it
to a type or to a value:

```ts
if (a + 1 > 3) {
    //... // TypeScript infers from context that you mean the value a
}

// TypeScript infers from context that you mean the type a
let x: a = 3;
```

This contextual term resolution is really nice, and lets us do cool things like
implement companion types

Classes and enums are special. They are unique because they generate both a type
in the type namespace and a value in the value namespace:

```ts
class C {} // In this context, C refers to the instance type of our C class.
let c: C = new C(); // In this context, C refers to C the value.

// In this context, E refers to the type of our E enum.
enum E {
    F,
    G
}
let e: E = E.F; // In this context, E refers to E the value.
```

When we work with classes, we need:

-   a way to say “this variable should be an instance of this class”
    -   classes generate types at the type level so we’re able to express this
        “is-a” relationship
-   a way to represent a class at runtime
-   classes generate a value at the value level so we can instantiate it as well

### Polymorphism

Skipping until I figure out why I'd use it. I can see using them with functions,
but not with classes at this time.

### Mixins

Skipping until I figure out why I'd use them.

### Decorators

Skipping as they are experimental and I don't see myself using them at this time

### Simulating `final` Classes

Skipping as I don't see myself using them at this time since I've yet to use
this feature in other languages

### Design Patterns

#### Factory Pattern

Skipping as I don't see myself using them at this time since I've yet to use
them.

#### Builder Pattern

Skipping as I don't see myself using them at this time since I've yet to use
them.

### Exercises

#### Exercise 1

What are the differences between a class and an interface?

Class:

-   A blueprint for creating objects.
-   It encapsulates data for the object and methods to manipulate that data.
-   Classes support inheritance, meaning one class can extend another,
    inheriting its properties and methods.
-   They are real entities that can be instantiated into objects using the new
    keyword.

Interface:

-   A TypeScript feature (not present in JavaScript) used to define the
    structure that an object should conform to.
-   Interfaces can include properties and method definitions
-   But all are abstract, meaning they don't provide implementation details.
-   They're used for type-checking and are not compiled into JavaScript.
-   Interfaces can extend multiple other interfaces, enabling more flexible
    design patterns than class inheritance.

Key differences:

-   Compilation:
    -   Classes exist in JavaScript and TypeScript, meaning they are part of the
        compiled JavaScript code. Interfaces are TypeScript-specific and are
        used for type-checking during development; they disappear in the
        compiled JavaScript. Implementation vs. Definition: Classes implement
        functionality, whereas interfaces define an object's shape. You write
        code in a class to define how methods work, but in an interface, you
        just declare method signatures or properties.
-   Instantiation:
    -   You can instantiate classes to create new objects. Interfaces cannot be
        instantiated; they're purely a compile-time construct.
-   Extension vs. Implementation:
    -   Classes can extend other classes (single inheritance) but implement
        multiple interfaces, allowing a class to type-check against multiple
        structures.
-   Constructor:
    -   Classes can have constructors, special methods for creating and
        initializing an object created with a class.
    -   Interfaces cannot have constructors.

Given my preference for descriptive naming and functional programming,
interfaces are particularly useful for defining complex types or contracts
within a codebase, without committing to a specific implementation upfront. This
aligns well with principles of functional programming by emphasizing the shape
and behavior of data over its concrete representation.

#### Exercise 2

Q: When you mark a class’s constructor as `private`, that means you can’t
instantiate or extend the class. What happens when you mark it as `protected`
instead? Play around with this in your code editor, and see if you can figure it
out.

A: When you mark a class constructor as `protected` in TypeScript, it means:

-   Instantiation:
    -   You cannot instantiate the class directly from outside the class itself
        or outside a subclass of it. This is similar to a private constructor
        but with an important difference regarding inheritance.
-   Inheritance:
    -   Unlike with a private constructor, a protected constructor allows the
        class to be extended. Subclasses can be created that derive from this
        class, and these subclasses can call the protected constructor of the
        parent class. `protected` is like `private`, but it’s also accessible
        from subclasses of `Piece`

See [exercises.ts](./exercises.ts) for an example.

#### Exercise 3

Skipping as it uses the Factory Pattern and I don't see myself using them at
this time since I've yet to use them.

#### Exercise 4

Skipping as it uses the Builder Pattern and I don't see myself using them at
this time since I've yet to use them.
