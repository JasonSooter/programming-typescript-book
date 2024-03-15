# Chapter 5 - Classes and Interfaces

> If you’re like most programmers coming from an object-oriented programming language, classes are your bread and butter.

😬 This does not define me whatsoever. I so rarely use Classes. But LFG!

## Classes and Inheritance

> Building a Chess Engine

See [chessEngine.ts](chessEngine.ts)

> Every piece has a color and a current position. In chess, positions are modeled as (letter, number) coordinate pairs; letters run from left to right along the x-axis, numbers from bottom to top along the y-axis. Standard algebraic notation in chess: A–H (the x-axis) are called “files” and 1–8 (the inverted y-axis) “ranks”

### Access Modifiers

TypeScript supports three access modifiers: `public`, `private`, and `protected`.

Access modifiers allow you to design classes that don't expose too much information about their implementations. Instead, they expose well-defined APIs for others to use.

- `public` is the default and is accessible from anywhere
- `private` is accessible from this class only
  - within the constructor this automatically assigns the parameter to `this` (`this.file` and so on), and sets its visibility to private, meaning that code within a `Piece` instance can read and write to it, but code outside of a Piece instance can’t. Different instances of `Piece` can access each other’s private members; instances of any other class—even a subclass of `Piece`—can’t.
- `protected` is like `private`, but it’s also accessible from subclasses of `Piece`
  - `position` is declared as `protected`. Like `private`, `protected` assigns the property to `this`, but unlike `private`, `protected` makes the property visible both to instances of `Piece` and to instances of any subclass of `Piece`. We didn’t assign `position` a value when declaring it, so we have to assign a value to it in `Piece`’s constructor function. If we hadn’t assigned it a value in the constructor, TypeScript would have told us that the variable is not definitely assigned, i.e., we said it’s of type `T`, but it’s actually `T` | `undefined` because it’s not assigned a value in a property initializer or in the constructor—so we would need to update its signature to indicate that it’s not necessarily a `Position`, but it might also be `undefined`
- `new Piece` takes three parameters: `color`, `file`, and `rank`
  - We added two modifiers to `color`:
    - `private`, meaning assign it to `this` and make sure it’s only accessible from an instance of `Piece`
    - `readonly`, meaning that after this initial assignment it can only be read and can’t be written anymore

### `abstract` Classes

“We’ve defined a Piece class, but we don’t want users to instantiate a new Piece directly—we want them to extend it to create a Queen, a Bishop, and so on, and instantiate that. We can use the type system to enforce that for us, using the abstract keyword:

```ts
abstract class Piece {}

// Error TS2511: Cannot create an instance of an abstract class.
new Piece('White', 'E', 1);
```

“The abstract keyword means that you can’t instantiate the class directly, but it doesn’t mean you can’t define some methods on it:

```ts
abstract class Piece {
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}
```

### Classes Summary

- Declare classes with the class keyword. Extend them with the extends keyword.
- Classes can be either concrete or abstract. Abstract classes can have abstract methods and abstract properties.
- Methods can be private, protected, or, by default, public. They can be instance methods or static methods.
- Classes can have instance properties, which can also be private, protected, or, by default, public. You can declare them in constructor parameters or as property initializers.
- You can mark instance properties as readonly when declaring them.

### `super`

As with JavaScript, TypeScript supports `super` calls. If your child class overrides a method defined on its parent class (say, if Queen and Piece both implement the take method), the child instance can make a `super` call to call its parent’s version of the method (e.g., super.take). There are two kinds of super calls:

1. Method calls, like super.take.
2. Constructor calls, which have the special form super() and can only be called from a constructor function. If your child class has a constructor function, you must call super() from the child’s constructor to correctly wire up the class (don’t worry, TypeScript will warn you if you forget; it’s like a cool futuristic robot elephant in that way).

Note that you can only access a parent class’s methods, and not its properties, with `super`.

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

Like type aliases, interfaces are a way to name a type so you don’t have to define it inline. Type aliases and interfaces are mostly two syntaxes for the same thing (like function expressions and function declarations), but there are a few small differences. Let’s start with what they have in common. Consider the following type alias:

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

Everywhere you used your Sushi type alias, you can also use your Sushi interface. Both declarations define shapes, and those shapes are assignable to one another (in fact, they’re identical!).

Things get more interesting when you start combining types. Let’s model another food in addition to Sushi:

```ts
type Cake = {
  calories: number;
  sweet: boolean;
  tasty: boolean;
};
```

A lot of foods have calories and are tasty—not just Sushi and Cake. Let’s pull Food out into its own type, and redefine our foods in terms of it:

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

> **Note**
> Interfaces don’t have to extend other interfaces. In fact, an interface can extend any shape: an object type, a class, or another interface.
