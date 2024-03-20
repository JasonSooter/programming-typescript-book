/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * -----------------
 * Function Variance
 * -----------------
 */
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

/**
 * -----------------
 *
 * -----------------
 */
