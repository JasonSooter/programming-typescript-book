/**
 * Exercise 2
 *
 * When you try to instantiate BaseClass directly,
 * TypeScript will give you an error saying that the
 * constructor is protected and only accessible within
 * the class declaration or by derived classes. However,
 * you can successfully create an instance of DerivedClass,
 * which in turn can call the protected constructor of BaseClass.
 *
 * This feature can be particularly useful for enforcing certain
 * design patterns, like the Factory Method, where you want to
 * control the instantiation process tightly or when you're
 * setting up a base class that should only be used as a parent
 * for more specific subclasses.
 */
class BaseClass {
    protected constructor() {
        console.log('BaseClass constructor called');
    }
}

// This class extends BaseClass, allowed with protected constructor
class DerivedClass extends BaseClass {
    constructor() {
        super(); // Calls the protected constructor of BaseClass
        console.log('DerivedClass constructor called');
    }
}

// const instanceOfBase = new BaseClass(); // Error: The class 'BaseClass' constructor is protected and only accessible within the class declaration.
const instanceOfDerived = new DerivedClass(); // Works: DerivedClass can be instantiated, and it can call the protected constructor of BaseClass.
