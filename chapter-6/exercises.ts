export default null; // Force module mode

// 1. For each of the following pairs of types, decide if the first type is
// assignable to the second type, and why or why not. Think about these in
// terms of subtyping and variance, and refer to the rules at the start of
// the chapter if you're unsure (if you're still unsure, just type it into
// your code editor to check!):

// 1a. 1 and number
let a: number;
a = 1 as 1;
/* Yes. The type literal 1 is a subtype of number, so it's assignable to number */

// 1b. number and 1
// let b: 1;
// b = 2 as number;
/* ERROR TS2322: Type 'number' is not assignable to type '1'.ts(2322) */
/* No. number is a supertype of 1, so it's not assignable to 1 */

// 1c. string and number | string
let c: number | string;
c = 'foo' as string;
/* Yes. string is a subtype of number | string, so it's assignable to number | string */

// 1d. boolean and number
// let d: number;
// d = true as boolean;
/* No. boolean & number are not related types, so they're not assignable to each other */

// 1e. number[] and (number | string)[]
let e: (number | string)[];
e = [1] as number[];
/* Yes. number[] is a subtype of (number | string)[], so it's assignable to (number | string)[] */

// 1f. (number | string)[] and number[]
// let f: number[];
// f = [1] as (number | string)[];
/* ERROR TS2322: Type '(number | string)[]' is not assignable to type 'number[]'.ts(2322) */

// 1g. {a: true} and {a: boolean}
let g: { a: boolean };
g = { a: true } as { a: true };
/* Yes. {a: true} is a subtype of {a: boolean}, so it's assignable to {a: boolean} */

// 1h. {a: {b: [string]}} and {a: {b: [number | string]}}
let h: { a: { b: [number | string] } };
h = { a: { b: ['foo'] } } as { a: { b: [string] } };
/* Yes. {a: {b: [string]}} is a subtype of {a: {b: [number | string]}}, so it's assignable to {a: {b: [number | string]}} */

// 1i. (a: number) => string and (b: number) => string
let i: (b: number) => string;
i = ((a: number) => 'foo') as (a: number) => string;
/* Yes. (a: number) => string is a subtype of (b: number) => string, so it's assignable to (b: number) => string */

// 1j. (a: number) => string and (a: string) => string
// let j: (a: string) => string;
// j = ((a: number) => 'foo') as (a: number) => string;
/* ERROR TS2322: Type '(a: number) => string' is not assignable to type '(a: string) => string'.ts(2322) */
/* No. number & string parameters differ */

// 1k. (a: number | string) => string and (a: string) => string
let k: (a: string) => string;
k = ((a: number | string) => 'foo') as (a: number | string) => string;
/* Yes. (a: number | string) => string is a subtype of (a: string) => string, so it's assignable to (a: string) => string */

// 1l. E.X (defined in an enum enum E {X = 'X'}) and F.X (defined in an enum enum F {X = 'X'})let
enum E {
    X = 'X'
}
enum F {
    X = 'X'
}

let l: F.X;
// l = E.X as E.X;
/* No. For an enum member to be assignable to another enum member, it has to come from the same enum. */

/**
 * 2. If I have an object type type O = {a: {b: {c: string}}}, what's the type of keyof O? What about O['a']['b']?
 */
type O = { a: { b: { c: string } } };
type P = keyof O; // "a"
type Q = O['a']['b']; // { c: string }

/**
 * 3. Write an `Exclusive<T, U>` type that computes the types that are in either T or U, but not both.
 * For example, Exclusive<1 | 2 | 3, 2 | 3 | 4> should resolve to 1 | 4.
 * Write out step-by-step how the typechecker evaluates Exclusive<1 | 2, 2 | 4>.
 */
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;

type R = Exclusive<1 | 2 | 3, 2 | 3 | 4>; // 1 | 4
type U = Exclusive<1 | 2, 2 | 4>; // 1 | 4

/**
 * 1. Start with Exclusive<1 | 2, 2 | 4>
 * 2. Substitute. Exclude<1 | 2, 2 | 4> | Exclude<2 | 4, 1 | 2>
 * 3. Substitute. (1 | 2 extends 2 | 4 ? never : 1 | 2) | (2 | 4 extends 1 | 2 ? never : 2 | 4)
 * 4. Distribute. (1 extends 2 | 4 ? never : 1) | (2 extends 2 | 4 ? never : 2) | (2 extends 1 | 2 ? never : 2) | (4 extends 1 | 2 ? never : 4)
 * 5. Simplify. 1 | never | never | 4
 * 6. Simplify. 1 | 4
 */

/**
 * 4. Rewrite the example (from Definite Assignment Assertions) to avoid the definite assignment assertion.
 */
let globalCache = {
    get(key: string) {
        return 'user';
    }
};

let userId = fetchUser();
userId.toUpperCase();

function fetchUser() {
    return globalCache.get('userId');
}
