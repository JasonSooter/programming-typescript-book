/**
 * Chapter 4 | Rest Parameters
 * - Variadic function
 */
function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sumVariadicSafe(1, 2, 3); /*?*/ // evaluates to 6
sumVariadicSafe(1, 2, 3, 4); /*?*/ // evaluates to 10
