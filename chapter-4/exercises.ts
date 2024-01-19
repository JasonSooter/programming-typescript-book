/**
 * Exercise 1
 * Q: Which parts of a function’s type signature does TypeScript infer: the parameters, the return type, or both?
 * A: Both (if possible).
 *   - the return type is always inferred
 *   - the parameter types are inferred if possible
 */

/**
 * Exercise 2
 * Q: Is JavaScript’s arguments object typesafe? If not, what can you use instead?
 * A: No, `arguments` is not typesafe. You can use rest parameters instead.
 *  - before: `function f() { console.log(arguments) }`
 *  - after:  `function f(...args: unknown[]) { console.log(args) }`
 */

/**
 * Exercise 3
 * Q: You want the ability to book a vacation that starts immediately.
 *    Update the overloaded reserve function from earlier in this chapter
 *    (“Overloaded Function Types”) with a third call signature that takes
 *    just a destination, without an explicit start date. Update reserve’s
 *    implementation to support this new overloaded signature.
 * A: See below.
 */

type Reservation = unknown;

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation;
    (from: Date, destination: string): Reservation;
    (destination: string): Reservation;
};
let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    const isOneWayTrip =
        fromOrDestination instanceof Date &&
        toOrDestination instanceof Date &&
        destination !== undefined;
    const isRoundTrip =
        fromOrDestination instanceof Date &&
        typeof toOrDestination === 'string';
    const isImmediateTrip = typeof fromOrDestination === 'string';

    switch (true) {
        case isOneWayTrip: {
            return; // Book a one-way trip
        }
        case isRoundTrip: {
            return; // Book a round trip
        }
        case isImmediateTrip: {
            return; // Book a trip right away
        }
    }
};

/**
 * Exercise 4
 * Skipping... I've never found a use for `call` in my own code
 * and I don't want to spend time on it because I don't plan to use it
 * in the future.
 *
 * If the need arises, I'll come back to this and dig into it.
 */

/**
 * Exercise 5
 * Q: Implement a small typesafe assertion library, `is`, that
 * satifies the tests below:
 */
function is<T>(a: T, ...b: [T, ...T[]]): boolean {
    return b.every((_) => _ === a);
}

// Compare a string and a string
is('string', 'otherstring'); // false

// Compare a boolean and a boolean
is(true, false); // false

// Compare a number and a number
is(42, 42); // true

// Comparing two different types should give a compile-time error
// Error TS2345: Argument of type '"foo"' is not assignable
// to parameter of type 'number'
// is(10, 'foo');

// [Hard] I should be able to pass any number of arguments
is([1], [1, 2], [1, 2, 3]); // false
