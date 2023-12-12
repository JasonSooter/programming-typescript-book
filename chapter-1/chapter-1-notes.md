# Chapter 1 Notes

## What does "safer" mean?

Type Safety: Using types to prevent programs from doing invalid things

## What happens in JavaScript

```typescript
3 + []; // Evaluates to the string "3"

let obj = {};
obj.foo; // Evaluates to undefined

function a(b) {
  return b / 2;
}
a('z'); // Evaluates to NaN”
```

## What you'd like to happen (friendly messages to help you)

```typescript
3 + []; // Error: Did you really mean to add a number and an array?

let obj = {};
obj.foo; // Error: You forgot to define the property "foo" on obj.

function a(b) {
  return b / 2;
}
a('z'); // Error: The function "a" expects a number, but you gave it a string.”
```

## What TypeScript does for you (very close to friendly messages to help you)

```typescript
3 + []; // Error TS2365: Operator '+' cannot be applied to types '3' and 'never[]'.

let obj = {};
obj.foo; // Error TS2339: Property 'foo' does not exist on type '{}'.

function a(b: number) {
  return b / 2;
}
a('z'); // Error TS2345
// Argument of type '"z"' is not assignable to parameter of type 'number'.”
```
