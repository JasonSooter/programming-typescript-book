function squareOf(n: number) {
    return n * n;
}

squareOf(2); // 4
// squareOf('z'); // Error TS2345: Argument of type '"z"' is not assignable to parameter of type 'number'.

/**
 * Enums
 */

enum Language {
    English,
    Spanish,
    Russian
}

const myFirstLanguage = Language.Russian;
console.log('myFirstLanguage', myFirstLanguage);
const mySecondLanguage = Language['English'];
console.log('mySecondLanguage', mySecondLanguage);
