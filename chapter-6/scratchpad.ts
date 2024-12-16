/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * -----------------
 * Share & Array Variance
 */

// An existing user that we got from the server
type ExistingUser = {
    id: number;
    name: string;
};

// A new user that hasn't been saved to the server yet
type NewUser = {
    name: string;
};

function deleteUser(user: { id?: number; name: string }) {
    delete user.id;
}

let existingUser: ExistingUser = {
    id: 123456,
    name: 'Ima User'
};

deleteUser(existingUser);

type LegacyUser = {
    id?: number | string;
    name: string;
};

let legacyUser: LegacyUser = {
    id: '793331',
    name: 'Xin Yang'
};

/**
 * Argument of type 'LegacyUser' is not assignable to parameter of type '{ id?: number | undefined; name: string; }'.
 * Types of property 'id' are incompatible.
 * Type 'string | number | undefined' is not assignable to type 'number | undefined'.
 * Type 'string' is not assignable to type 'number'.
 */
// deleteUser(legacyUser);

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

/**
 * -----------------
 * Parse CSS Strings
 * -----------------
 */
// We use a union of string literals to describe
// the possible values a CSS unit can have
type Unit = 'cm' | 'px' | '%';

// Enumerate the units
let units: Unit[] = ['cm', 'px', '%'];

// Check each unit, and return null if there is no match
function parseUnit(value: string): Unit | null {
    for (let i = 0; i < units.length; i++) {
        if (value.endsWith(units[i])) {
            return units[i];
        }
    }
    return null;
}

type Width = {
    unit: Unit;
    value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
    // If width is null or undefined, return early
    if (width == null) {
        return null;
    }

    // If width is a number, default to pixels
    if (typeof width === 'number') {
        return { unit: 'px', value: width };
    }

    // Try to parse a unit from width
    let unit = parseUnit(width);
    if (unit) {
        return { unit, value: parseFloat(width) };
    }

    // Otherwise, return null
    return null;
}

/**
 * -----------------
 * Discriminated Union Types
 * -----------------
 */
type UserTextEvent = {
    type: 'TextEvent'; // Literal type
    value: string;
    target: HTMLInputElement;
};
type UserMouseEvent = {
    type: 'MouseEvent'; // Literal type
    value: [number, number];
    target: HTMLElement;
};

type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) {
    if (event.type === 'TextEvent') {
        event.value; // string
        event.target; // HTMLInputElement
        // ...
        return;
    }

    event.value; // [number, number]
    event.target; // HTMLElement
}

/**
 * Totality Checking
 */
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

// function getNextDay(w: Weekday): Day {
//     switch (w) {
//         case 'Mon':
//             return 'Tue';
//     }
// }
// ERROR TS2366: Function lacks ending return statement and return type does not include 'undefined'.ts(2366)

/**
 * The Keying-In Operator
 */
type APIResponse = {
    user: {
        userId: string;
        friendList: {
            count: number;
            friends: {
                firstName: string;
                lastName: string;
            }[];
        };
    };
};

// Keying-in operator to get the type of the friendList property
type FriendList = APIResponse['user']['friendList'];

function renderFriendList(friendList: FriendList) {
    // ...
}

/**
 * Record Types
 */
// type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
// type Day = Weekday | 'Sat' | 'Sun';

// let nextDay: Record<Weekday, Day> = {
//     Mon: 'Tue'
// };
// Error TS2739: Type '{Mon: "Tue"}' is missing the following properties
// from type 'Record<Weekday, Day>': Tue, Wed, Thu, Fri.

let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat'
};
