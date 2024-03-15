/* eslint-disable @typescript-eslint/no-unused-vars */
export default null; // Force module mode

/**
 * Question 1: For each of these values, what type will TypeScript infer?
 */
const a = 1042; // number
const b = 'apples and oranges'; // string
const c = 'pineapples'; // 'pineapples' (type literal)
const d = [true, true, false]; // boolean[]
const e = { type: 'ficus' }; // { type: string }
const f = [1, false]; // (number | boolean)[]
const g = [3]; // number[]
const h = null; // any (type widening)

/**
 * Question 2: Why does each of these throw the error it does?
 */

// Question 2a:
const i: 3 = 3;
// i = 4; // Error TS2322: Type '4' is not assignable to type '3'.

/**
 * Because `i` is a type literal, it can only be assigned the value 3.
 * The type of 3 is the type, thus 4 is not assignable to 3
 */

// 2b
const j = [1, 2, 3];
j.push(4);
// j.push('5'); // Error TS2345: Argument of type '"5"' is not assignable to parameter of type 'number'.

/**
 * TypeScript infers the type of `j` to be number[] as that is now it was initialized
 * The type of '5' is the type literal '5', which is not assignable to number
 */

// 2c
// let k: never = 4; // Error TS2322: Type '4' is not assignable to type 'never'.

/**
 * The type of 4 is number, which is not assignable to `never`
 * `never` is assignaable to every other type, but no type is assignable to never
 */

// 2d
const l: unknown = 4;
// let m = l * 2; // Error TS2571: Object is of type 'unknown'.

/**
 * The type of `l` is unknown, which is not a number
 * You can't perform arithmetic operations on unknown values
 * You have to first prove to TypeScript that `l` is a number
 * You can do that by refining the type of `l` using a type guard
 * For example, you can use a typeof type guard
 * if (typeof l === 'number') {
 *    let m = l * 2;
 * }
 */
