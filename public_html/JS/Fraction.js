/*
 * Use fractions instead of decimals
 *
 */

function Fraction(numerator, denominator) {
    if (typeof numerator === 'number')
        this.numerator = numerator;
    else
        this.numerator = 0;
    if (typeof denominator === 'number')
        this.denominator = denominator;
    else
        this.denominator = 1;
    this.negative = false;
    this.improper = false;
    this.whole = true;
    this.undefined = false;
    this.simplify();
}

Fraction.prototype.add = function(sumwith) {
    if (typeof sumwith == 'number')
        sumwith = new Fraction(sumwith, 1);
    var num = this.numerator * sumwith.denominator + sumwith.numerator * this.denominator;
    var den = this.denominator * sumwith.denominator;
    var answer = new Fraction(num, den);
    return answer;
};

Fraction.prototype.sub = function(subwith) {
    if (typeof subwith == 'number')
        subwith = new Fraction(subwith, 1);
    var sub = new Fraction(-subwith.numerator, subwith.denominator);
    return this.add(sub);
};

Fraction.prototype.mult = function(multwith) {
    if (typeof multwith == 'number')
        multwith = new Fraction(multwith, 1);
    var num = this.numerator * multwith.numerator;
    var den = this.denominator * multwith.denominator;
    var answer = new Fraction(num, den);
    return answer;
};

Fraction.prototype.div = function(divwith) {
    if (typeof divwith == 'number')
        divwith = new Fraction(divwith, 1);
    var dividor = new Fraction(divwith.denominator, divwith.numerator);
    return this.mult(dividor);
};

Fraction.prototype.pow = function(index) {
    var pow = new Fraction(Math.pow(this.numerator, index), Math.pow(this.denominator, index));
    return pow;
};

Fraction.prototype.greaterThan = function(compare) {
    if (this.numerator / this.denominator > compare.numerator / compare.denominator)
        return true;
    else
        return false;
}

Fraction.prototype.simplify = function() {
    if (this.denominator == 0)
        this.undefined = true;
    else
        this.undefined = false;
    if (this.denominator < 0) {
        this.numerator *= -1;
        this.denominator *= -1;
    }
    if (this.numerator < 0)
        this.negative = true;
    else
        this.negative = false;
    while(this.numerator%1!=0||this.denominator%1!=0){
        this.numerator*=10;
        this.denominator*=10;
    }
    if (this.numerator != 1 && this.denominator != 1) {
        var g = gcd(Math.abs(this.numerator), this.denominator);
        if (g) {
            this.numerator /= g;
            this.denominator /= g;
        }
    }
    if (Math.abs(this.numerator) > this.denominator)
        this.improper = true;
    else
        this.improper = false;
    if (this.denominator == 1)
        this.whole = true;
    else
        this.whole = false;
};

Fraction.prototype.string = function() {
    if (this.undefined)
        return 'undefined';
    var string = this.numerator;
    if (this.denominator !== 1)
        string += '/' + this.denominator;
    return string;
};

Fraction.prototype.improperString = function() {
    var string = Math.floor(Math.abs(this.numerator) / Math.abs(this.denominator));
    if (string === 0)
        string = '';
    if (this.negative)
        string = '-' + string;
    if (this.numerator % this.denominator !== 0)
        string += ' ' + Math.abs(this.numerator) % this.denominator + '/' + this.denominator;
    return string;
};

Fraction.prototype.decimal = function() {
    return this.numerator / this.denominator;
};

function gcd(a, b)
{
    if (typeof a == 'number' && typeof b == 'number') {
        if (b === 0)
            return a;
        else
            return gcd(b, a % b);
    }
    else
        throw new Error('GCD of non-number');
}

function lcm(a, b) {
    return Math.abs(a * b / gcd(a, b));
}