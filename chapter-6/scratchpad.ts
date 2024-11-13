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
// chirp(new Animal());

chirp(new Bird());
chirp(new Crow());

function clone(f: (b: Bird) => Bird): void {}

function birdToBird(b: Bird): Bird {
    return b;
}
clone(birdToBird); // Works as expected

function birdToCrow(b: Bird): Crow {
    return new Crow();
}
clone(birdToCrow); // Works as expected

function birdToAnimal(b: Bird): Animal {
    return new Animal();
}

/**
 * Error TS2345: Argument of type '(b: Bird) => Animal' is not assignable to parameter of type '(b: Bird) => Bird'.
 * Type 'Animal' is not assignable to type 'Bird'.
 */
// clone(birdToAnimal);

function animalToBird(a: Animal): Bird {
    return new Bird();
}
clone(animalToBird); // Works as expected

function crowToBird(c: Crow): Bird {
    return new Bird();
}
// clone(crowToBird); // Error TS2345: Argument of type '(c: Crow) => Bird' is not assignable to parameter of type '(b: Bird) => Bird'.
// Types of parameters 'c' and 'b' are incompatible.
// Property 'caw' is missing in type 'Bird' but required in type 'Crow'.
