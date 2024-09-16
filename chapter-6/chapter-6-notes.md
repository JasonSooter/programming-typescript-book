# Chapter 6 - Advanced Types

## Relationships Between Types

### Subtypes and Supertypes

#### Subtypes

If you have two types A and B, and B is a subtype of A, then you can safely use
a B anywhere an A is required

```
┌───────────────────┐
│         A         │
│  ┌─────────────┐  │
│  │      B      │  │
│  └─────────────┘  │
└───────────────────┘
 B is a Subtype of A
```

Some examples:

-   `Array` is a subtype of `Object`
-   Everything is a subtype of `any`
-   `Tuple` is a subtype of `Array`

Implications:

-   Anywhere you need an `Object` you can use an `Array`
-   Anywhere you need an `Array` you can also use a Tuple
-   Anywhere you need an `any` you can use an `Object`
-   You can use a `never` anywhere

#### Supertypes

A supertype is the opposite of a subtype.

If you have two types A and B, and B is a supertype of A, then you can safely
use an A anywhere a B is required.

```
┌─────────────────────┐
│          B          │
│  ┌───────────────┐  │
│  │       A       │  │
│  └───────────────┘  │
└─────────────────────┘
 B is a Supertype of A
```

Some examples:

-   `Array` is a supertype of `Tuple`.
-   `Object` is a supertype of `Array`.
-   `any` is a supertype of everything.
-   `never` is a supertype of nothing.

Implications: This is the opposite of subtypes

### Special syntax for subtypes and supertypes

-   `<:` === A <: B means "A is a subtype of or the same as the type B.”
-   `>:` === A >: B means "A is a supertype of or the same as the type B.”

### Shape and Array Variance

TypeScript’s behavior is as follows:

-   if you expect a shape, you can also pass a type with property types that are
    subtypes of their expected types
-   but you cannot pass a shape with property types that are supertypes of their
    expected types.

When talking about types, we say that TypeScript shapes (objects and classes)
are covariant in their property types.

> [!note] covariant: a type that is a subtype of another type

#### 4 Types of Variance

1. `Invariance`: A type is neither a subtype nor a supertype of another type.
2. `Covariance`: A type is a subtype of another type.
3. `Contravariance`: A type is a supertype of another type.
4. `Bivariance`: A type is both a subtype and a supertype of another type.

In TypeScript, every complex type is `covariant` in its members

-   objects
-   classes
-   arrays
-   function return types

with one exception: function parameter types are contravariant.

#### Function Variance

A function `A` is a subtype of function `B` **_if_** `A` has the same or lower
arity (number of parameters) than `B` **_AND_**:

-   `A`’s `this` type either isn’t specified, or is >: `B`’s `this` type.
    -   I never use `this` inside of a function, so not worried about this.
-   Each of `A`’s parameters is a supertype (`>:`) its corresponding parameter
    in `B`.
-   `A`’s return type is a subtype (`<:`) of `B`’s return type.”

Why are a function's `this` type and parameter types contravariant, but the
return type is covariant?

-   The `this` type and parameter types are contravariant because they are
    inputs to the function.
-   The return type is covariant because it is an output of the function.

##### An example using function return type:

```typescript
class Animal {}

/**
 * Bird is a subtype of Animal
 * Bird <: Animal
 */
class Bird extends Animal {
    chirp() {}
}

/**
 * Crow is a subtype of Bird
 * Crow <: Bird <: Animal
 */
class Crow extends Bird {
    caw() {}
}

function chirp(bird: Bird): Bird {
    bird.chirp();
    return bird;
}

/**
 * Error TS2345: Argument of type 'Animal' is not assignable to parameter of type 'Bird'.
 * Property 'chirp' is missing in type 'Animal' but required in type 'Bird'.
 */
chirp(new Animal());

chirp(new Bird());
chirp(new Crow());

function clone(f: (b: Bird) => Bird): void {}

function birdToBird(b: Bird): Bird {}
clone(birdToBird); // Works as expected

function birdToCrow(b: Bird): Crow {}
clone(birdToCrow); // Works as expected

function birdToAnimal(b: Bird): Animal {}
/**
 * Error TS2345: Argument of type '(b: Bird) => Animal' is not assignable to parameter of type '(b: Bird) => Bird'.
 * Type 'Animal' is not assignable to type 'Bird'.
 */
clone(birdToAnimal);
```

Functions are covariant in their return types which means that for a function to
be a subtype of another function, its return type has to be `<:` the other
function’s return type.

##### An example using function parameter types:

```typescript
function animaltoBird(a: Animal): Bird {}
clone(animaltoBird); // Works as expected

function crowToBird(c: Crow): Bird {}
/**
 * Error TS2345: Argument of type '(c: Crow) => Bird' is not
 * assignable to parameter of type '(b: Bird) => Bird'.
 *
 * The Crow type has the caw method, which is not present in the Bird type.
 */
clone(crowToBird);
```

Now if `clone` called `crowToBird` with a new `Bird`, we’d get an exception
because `.caw` is only defined on `Crows`, not on all `Birds`.

This means functions are `contravariant` in their parameter and `this` types
which means for a function to be a subtype of another function, each of its
parameters and its `this` type must be a supertype (`>:`) of its corresponding
parameter in the other function.
