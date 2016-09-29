/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function term() {
    this.index = new Array();
    this.symbol = new Array();
}

/*
 * List of non printing characters (invisible symbols to prevent like terms)
 * -------------------------------------------------------------------------
 * no space:    &zwnj; &zwj; &lrm; &rlm; &x0b; &#x09;
 * spaces:      &ensp; &emsp; &thinsp; &#x09;
 */

term.prototype.addSymbol = function(sym, ind) {
    if (sym || sym != '') {
        if (typeof ind == 'number')
            ind = new Fraction(ind, 1);
        var newsymbol = true;
        for (var i = 0; i < this.symbol.length; i++)
            if (this.symbol[i] === sym) {
                this.index[i] = this.index[i].add(ind);
                if (this.index[i].numerator == 0) {
                    this.symbol.splice(i, 1);
                    this.index.splice(i, 1);
                }
                newsymbol = false;
            }
        if (newsymbol && ind.numerator != 0) {
            this.symbol.push(sym);
            this.index.push(ind);
            var tempArray = new Array();
            for (var i = 0; i < this.symbol.length; i++) {
                tempArray[i] = [this.symbol[i], this.index[i]];
            }
            tempArray.sort(function(a, b) {
                if (a[0] > b[0])
                    return 1;
                else if (a[0] < b[0])
                    return -1;
                else
                    return 0;
            });
            for (var i = 0; i < this.symbol.length; i++) {
                this.symbol[i] = tempArray[i][0];
                this.index[i] = tempArray[i][1];
            }
        }
    }
}

term.prototype.removeSymbol = function(sym) {
    for (var i = 0; i < this.symbol.length; i++) {
        if (this.symbol[i] == sym) {
            this.symbol.splice(i, 1);
            this.index.splice(i, 1);
        }
    }
}

term.prototype.absorb = function(src) {
    for (var i = 0; i < src.symbol.length; i++)
        this.addSymbol(src.symbol[i], src.index[i]);
}

term.prototype.isSame = function(compare) {
    if (this.symbol.length != compare.symbol.length)
        return false;
    for (var i = 0; i < this.symbol.length; i++) {
        if (this.symbol[i] != compare.symbol[i])
            return false;
        if (this.index[i].numerator != compare.index[i].numerator)
            return false;
        if (this.index[i].denominator != compare.index[i].denominator)
            return false;
    }
    return true;
}

term.prototype.string = function() {
    var string = '';
    for (var i = 0; i < this.symbol.length; i++)
        string += this.symbol[i] + '^' + this.index[i].string() + '.';
    return string;
}

term.prototype.substitute = function(original, newSymbol) { //newSymbol should NOT be a number
    if (this.symbol.length) {
        var i = 0;
        while (i < this.symbol.length && this.symbol[i] != original)
            i++;
        if (i != this.symbol.length) {
            var ind = this.index[i];
            this.removeSymbol(original);
            this.addSymbol(newSymbol, ind);
            return i;
        }
    }
    return false;
}


function algebra() {
    this.terms = new Array();
    this.coef = new Array();
    this.surd = true;
    this.terms[0] = new term();
    this.coef[0] = new Fraction(0, 1);
}

algebra.prototype.copy = function(src) {
    this.terms = new Array();
    this.coef = new Array();
    for (var i = 0; i < src.terms.length; i++) {
        this.terms[i] = new term();
        this.terms[i].absorb(src.terms[i]);
        this.coef[i] = src.coef[i];
    }
}

algebra.prototype.pushTerm = function(pushString) {
    if (pushString) {
        pushString += '.';
        var temp = new algebra();
        var parseNumber = false, isNegative = false, parsePower = false, parseSymbol = false, parseFraction = false;
        var number = 0, power = 0, sym = '', den = 0;
        for (var i = 0; i < pushString.length; i++) {
            switch (pushString[i]) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    if (parseNumber) {
                        number *= 10;
                        number += parseInt(pushString[i]);
                    }
                    else if (parsePower) {
                        power *= 10;
                        power += parseInt(pushString[i]);
                        if (isNegative) {
                            power *= -1;
                            isNegative = false;
                        }
                    }
                    else if (parseFraction) {
                        den *= 10;
                        den += parseInt(pushString[i]);
                    }
                    else {
                        parseNumber = true;
                        number = parseInt(pushString[i]);
                        if (isNegative) {
                            number *= -1;
                            isNegative = false;
                        }
                    }
                    break;
                case '-':
                    isNegative = true;
                    break;
                case '^':
                    parsePower = true;
                    break;
                case '/':
                    parseNumber=false;
                    parseFraction = true;
                    break;
                default:
                    if (parsePower) {
                        temp.terms[0].addSymbol(sym, power);
                        parseSymbol = false;
                        parsePower = false;
                    }
                    else if (parseFraction) {
                        temp.coef[0] = new Fraction(number, den);
                        parseFraction = false;
                    }
                    else if (parseSymbol) {
                        temp.terms[0].addSymbol(sym, 1);
                        parseSymbol = false;
                    }
                    else if (isNegative) {
                        temp.coef[0] = new Fraction(-1, 1);
                        isNegative = false;
                    }
                    else if (parseNumber) {
                        parseNumber = false;
                        temp.coef[0] = new Fraction(number, 1);
                    }
                    if (pushString[i] != '.') {
                        sym = pushString[i];
                        parseSymbol = true;
                    }
                    break;
            }
        }
        this.copy(this.add(temp));
    }
}

algebra.prototype.add = function(addto) {
    var answer = new algebra();
    var copythis = new algebra();
    var copyaddto = new algebra();
    copythis.copy(this);
    if (typeof addto == 'number') {
        copyaddto.coef[0] = new Fraction(addto, 1);
        copyaddto.terms[0] = new term();
    }
    else
        copyaddto.copy(addto);
    for (var i = 0; i < copythis.terms.length; i++) {
        for (var j = 0; j < copyaddto.terms.length; j++) {
            if (copythis.terms[i].isSame(copyaddto.terms[j])) {
                copythis.coef[i] = copythis.coef[i].add(copyaddto.coef[j]);
                copyaddto.terms.splice(j, 1);
                copyaddto.coef.splice(j, 1);
                j--;
            }
        }
    }
    answer.terms = copythis.terms.concat(copyaddto.terms);
    answer.coef = copythis.coef.concat(copyaddto.coef);
    for (var i = 0; i < answer.coef.length; i++) {
        if (answer.coef[i].numerator == 0) {
            answer.terms.splice(i, 1);
            answer.coef.splice(i, 1);
            i--
        }
    }
    if (answer.coef.length == 0) {
        answer.coef[0] = new Fraction(0, 1);
        answer.terms[0] = new term();
    }
    return answer;
}

algebra.prototype.sub = function(subwith) {
    var copysubwith = new algebra();
    if (typeof subwith == 'number') {
        copysubwith.coef[0] = new Fraction(0 - subwith, 1);
        copysubwith.terms[0] = new term();
    }
    else
        copysubwith = subwith.mult(-1);
    return this.add(copysubwith);
}

algebra.prototype.mult = function(multby) {
    var answer = new algebra();
    if (typeof multby == 'number') {
        var tempAlg = new algebra();
        tempAlg.coef[0] = new Fraction(multby, 1);
        tempAlg.terms[0] = new term();
        multby = tempAlg;
    }
    if ((this.coef.length == 1 && this.coef[0].numerator == 0) || (multby.coef.length == 1 && multby.coef[0].numerator == 0))
        return answer;
    for (var i = 0; i < this.terms.length; i++)
        for (var j = 0; j < multby.terms.length; j++) {
            var temp = new term();
            temp.absorb(this.terms[i]);
            temp.absorb(multby.terms[j]);
            answer.terms[j + i * multby.terms.length] = temp;
            answer.coef[j + i * multby.terms.length] = this.coef[i].mult(multby.coef[j]);
        }
    return answer;
}

algebra.prototype.div = function(divby) {
    var answer = new algebra();
    if (typeof divby == 'number') {
        answer.coef[0] = new Fraction(divby, 1);
        answer.terms[0] = new term();
        return this.div(answer);
    }
    else {
        var one = new Fraction(1, 1);
        answer.coef[0] = one;
        answer.terms[0] = new term();
        answer.terms[0].addSymbol(this, one);
        answer.terms[0].addSymbol(divby, new Fraction(-1, 1));
        return answer;
    }
}

algebra.prototype.substitute = function(original, newValue) {
    if (this.coef.length) {
        var hasChanged = false;
        if (typeof newValue == 'number')
            newValue = new Fraction(newValue, 1);
        for (var i = 0; i < this.coef.length; i++) {
            if (newValue instanceof Fraction) {
                var target = this.terms[i].substitute(original, original);
                if (target !== false) {
                    this.coef[i] = this.coef[i].mult(newValue.pow(this.terms[i].index[target].decimal()));
                    this.terms[i].removeSymbol(original);
                    hasChanged = true;
                }
            }
            else {
                if (this.terms[i].substitute(original, newValue) !== false)
                    hasChanged = true;
            }
        }
        if (hasChanged) {
            var temp = new algebra();
            this.copy(temp.add(this));
        }
    }
}

algebra.prototype.stringIndex = function() {
    var string = '';
    if (this.terms.length == 0)
        return '0';
    for (var i = 0; i < this.terms.length; i++) {
        if (i && this.coef[i].negative == false)
            string += '+';
        if (Math.abs(this.coef[i].numerator) != 1 || this.coef[i].denominator != 1 || this.terms[i].symbol.length == 0)
            string += this.coef[i].string();
        else if (this.coef[i].numerator == -1)
            string += '-';
        for (var j = 0; j < this.terms[i].symbol.length; j++) {
            var indexAfter = '^(' + this.terms[i].index[j].string() + ')';
            if (this.terms[i].index[j].denominator != 1 && this.surd) {
                if (this.terms[i].index[j].denominator != 2)
                    string += 'root ' + this.terms[i].index[j].denominator + ' ';
                else
                    string += 'sqrt ';
                if (this.terms[i].index[j].numerator != 1)
                    indexAfter = '^(' + this.terms[i].index[j].numerator + ')';
                else
                    indexAfter = '';
            }
            if (this.terms[i].symbol[j] instanceof algebra) {
                if (this.terms[i].symbol.length > 1 || this.coef[i].numerator != this.coef[i].denominator || this.terms[i].index[j].numerator != this.terms[i].index[j].denominator) {
                    string += '(' + this.terms[i].symbol[j].string() + ')';
                }
                else {
                    string += this.terms[i].symbol[j].string();
                }
            }
            else
                string += this.terms[i].symbol[j] + ' ';
            if (this.terms[i].index[j].numerator != this.terms[i].index[j].denominator)
                string += indexAfter;
        }
    }
    if (string == '')
        string = '1';
    return string;
}


algebra.prototype.stringFraction = function() {
    var string = '';
    var negOne = new Fraction(-1, 1);
    for (var i = 0; i < this.terms.length; i++) {
        if (i && this.coef[i].negative == false)
            string += '+';
        else if (this.coef[i].negative)
            string += '-';
        var num = new algebra();
        var den = new algebra();
        num.coef[0] = new Fraction(Math.abs(this.coef[i].numerator), 1);
        num.terms[0] = new term();
        den.coef[0] = new Fraction(Math.abs(this.coef[i].denominator), 1);
        den.terms[0] = new term();
        for (var j = 0; j < this.terms[i].symbol.length; j++) {
            if (this.terms[i].index[j].negative)
                den.terms[0].addSymbol(this.terms[i].symbol[j], this.terms[i].index[j].mult(negOne));
            else
                num.terms[0].addSymbol(this.terms[i].symbol[j], this.terms[i].index[j]);
        }
        if (den.terms[0].symbol.length == 0 && den.coef[0].numerator == 1)
            string += num.stringIndex();
        else
            string += '(' + num.stringIndex() + ')/(' + den.stringIndex() + ')';
    }
    if (string == '')
        string = '0';
    return string;
}

algebra.prototype.string = function() {
    var neg = false;
    for (var i = 0; i < this.terms.length; i++)
        for (var j = 0; j < this.terms[i].symbol.length; j++) {
            if (this.terms[i].index[j].negative)
                return this.stringFraction()
        }
    return this.stringIndex();
}
