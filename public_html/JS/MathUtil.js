/* 
 * Miscellaneous Mathematics/random functions for utility.
 */

function nonZeroRand(min, max) {
    var num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num === 0);
    return num;
}

function randomInt(min, max) {
    return randomLowInt(min, max, 1);
}

function randomLowInt(min, max, severity) {
    if (!severity)
        severity = 2;
    return Math.floor(Math.pow(Math.random(), severity) * (max - min + 1) + min);
}

function randomDigitInt(limit) {// number of digits (1-10) is random and equally likely (eg 2-digit number has same prob as 10-digit number)
    if (!limit)
        limit = 10;
    return Math.floor(Math.pow(Math.pow(10, limit), Math.random()));
}

function randomOp() {
    var op = Math.floor(Math.random() * 4);
    var sign = ['+', '-', 'xx', '-:'];
    return sign[op];
}

function randomArrayElement(array) {
    return array[randomInt(0, array.length - 1)];
}

function gcd(a, b)
{
    if (b === 0)
        return a;
    else
        return gcd(b, a % b);
}

function factorial(n) {
    return (n == 0) ? 1 : n * factorial(n - 1);
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


