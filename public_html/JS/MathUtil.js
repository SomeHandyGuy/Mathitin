/* 
 * Miscellaneous Mathematics/random functions for utility.
 */

function nonZeroRand(min, max) {
    return randomLowInt(min, max, 1, [0]);
}

function randomInt(min, max, excludes) {
    return randomLowInt(min, max, 1, excludes);
}

function randomLowInt(min, max, severity, excludes) {
    if (!severity)
        severity = 2;
    if (typeof excludes !== 'object')
        excludes = [excludes];
    var value;
    do {
        value = Math.floor(Math.pow(Math.random(), severity) * (max - min + 1) + min);
    } while (excludes.indexOf(value) !== -1);
    return value;
}

function randomDigitInt(limit) {// number of digits (1-10) is random and equally likely (eg 2-digit number has same prob as 10-digit number)
    if (!limit)
        limit = 10;
    return Math.floor(Math.pow(Math.pow(10, limit), Math.random()));
}

function randomFraction(min, max, denominatorMin, denominatorMax) {
    if (!denominatorMin)
        denominatorMin = 2;
    var seed = Math.random();
    var den = (denominatorMax) ? Math.floor(Math.random() * (denominatorMax - denominatorMin + 1)) : Math.round(1 / (seed * seed) + denominatorMin - 1);
    var num = Math.floor(Math.random() * (max * den - min * den + 1) + max * den);
    return new Fraction(num, den);
}

function randomOp(useLaTeX) {
    if (useLaTeX)
        return randomArrayElement(['+', '-', '\\times', '\\div']);
    else
        return randomArrayElement(['+', '-', 'xx', '-:']);
}

function randomArrayElement(array) {
    return array[randomInt(0, array.length - 1)];
}

function shuffle(arr) { //NOTE: destroys original array!
    var shuffle = [], count = arr.length;
    for (var i = 0; i < count; i++) {
        var p = randomInt(0, arr.length - 1);
        shuffle.push(arr[p]);
        arr.splice(p, 1);
    }
    return shuffle;
}

function gcd(a, b)
{
    if (b === 0)
        return a;
    else
        return gcd(b, a % b);
}

function primeFactorise(n) {//n must be less than 10000
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
            factors = [], working = n;
    for (var i = 0; i < primes.length && primes[i] < n * n; i++) {
        while (working % primes[i] === 0) {
            factors.push(primes[i]);
            working /= primes[i];
        }
    }
    return factors;
}

function factorial(n) {
    return (n === 0) ? 1 : n * factorial(n - 1);
}

function permutation(n, k) {
    if (k == 0)
        return 1;
    else
        return (k == 1) ? n : n * permutation(n - 1, k - 1);
}

function combination(n, k) {
    return permutation(n, k) / factorial(k);
}

function binom(n, p, k) {
    return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}


