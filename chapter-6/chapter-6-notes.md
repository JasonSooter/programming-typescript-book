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

### Variance
