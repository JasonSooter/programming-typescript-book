# Chapter 2 Notes

## TypeScript Compiler Process

1. (TSC) | TypeScript Source Code → TypeScript AST
2. (TSC) | AST is checked by Type Checker
3. (TSC) | TypeScript AST → JavaScript Source
4. (JS Runtime) | JavaScript Source → JavaScript AST
5. (JS Runtime) | AST → bytecode
6. (JS Runtime) | Bytecode is evaluated by runtime

## Definitions

- **Type System**: a set of rules that a typechecker uses to assign types to
  your program

## Two kinds of Type Systems

- Explicit Syntax: it is required to tell the compiler what type everything is
- Inference: Allow the compiler to infer the type of everything automatically

TypeScript is inspired by both.

### Examples of Explicit TypeScript Types

```javascript
let a: number = 1; // a is a number
let b: string = 'hello'; // b is a string
let c: boolean[] = [true, false]; // c is an array of booleans
```

### Examples where TypeScript will Infer Types

```javascript
let a = 1; // a is a number
let b = 'hello'; // b is a string
let c = [true, false]; // c is an array of booleans
```

> In general, it is good style to let TypeScript inver as many types as it can
> for you, keeping explicitly typed code to a minimum

## Initialize a TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "lib": ["es"],
    "outDir": "dist",
    "sourceMap": true,
    "removeComments": false
  },
  "include": ["src/**/*"]
}
```

## ESLint w/ TypeScript (instead of TSLint)

- [https://typescript-eslint.io/getting-started/](https://typescript-eslint.io/getting-started/)
