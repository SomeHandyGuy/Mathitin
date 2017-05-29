function makeVars30() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = new term();
    var one = new Fraction(1, 1);
    var negOne = new Fraction(-1, 1);
    x.addSymbol(randomArrayElement(pronumeral), one);
    var a = new Array();
    for (var i = 0; i < 4; i++) {
        a[i] = new algebra();
        if (i == 0) {
            a[i].terms[0] = x;
            a[i].coef[0] = one;
        } else {
            a[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
            a[i].terms[0] = new term();
        }
    }
    var qNum = {"$": "`"};
    switch (randomInt(0, 5)) {
        case 0:
            while (a[1].coef[0].numerator == 1)
                a[1].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).string() + '=' + a[3].string();
            if (a[2].coef[0].numerator > 0)
                qNum['first'] = 'subtract ' + a[2].string() + ' from both sides';
            else
                qNum['first'] = 'add ' + Math.abs(a[2].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[0].mult(a[1]).string() + '=' + a[3].sub(a[2]).string();
            qNum['second'] = 'divide both sides by ' + a[1].string();
            qNum['result2'] = a[0].string() + '=' + a[3].coef[0].sub(a[2].coef[0]).div(a[1].coef[0]).string();
            break;
        case 1:
            while (a[1].coef[0].numerator == 1)
                a[1].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
            a[2].coef[0] = new Fraction(randomInt(1, 9), 1);
            qNum['equ'] = a[2].add(a[0].mult(a[1])).string() + '=' + a[3].string();
            if (a[2].coef[0].numerator > 0)
                qNum['first'] = 'subtract ' + a[2].string() + ' from both sides';
            else
                qNum['first'] = 'add ' + Math.abs(a[2].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[0].mult(a[1]).string() + '=' + a[3].sub(a[2]).string();
            qNum['second'] = 'divide both sides by ' + a[1].string();
            qNum['result2'] = a[0].string() + '=' + a[3].coef[0].sub(a[2].coef[0]).div(a[1].coef[0]).string();
            break;
        case 2:
            a[1].coef[0] = new Fraction(randomInt(2, 9), 1);
            qNum['equ'] = a[0].div(a[1]).add(a[2]).string() + '=' + a[3].string();
            if (a[2].coef[0].numerator > 0)
                qNum['first'] = 'subtract ' + a[2].string() + ' from both sides';
            else
                qNum['first'] = 'add ' + Math.abs(a[2].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[0].div(a[1]).string() + '=' + a[3].sub(a[2]).string();
            qNum['second'] = 'multiply both sides by ' + a[1].string();
            qNum['result2'] = a[0].string() + '=' + a[3].sub(a[2]).mult(a[1]).string();
            break;
        case 3:
            a[1].coef[0] = new Fraction(randomInt(2, 9), 1);
            a[2].coef[0] = new Fraction(randomInt(1, 9), 1);
            qNum['equ'] = a[2].add(a[0].div(a[1])).string() + '=' + a[3].string();
            if (a[2].coef[0].numerator > 0)
                qNum['first'] = 'subtract ' + a[2].string() + ' from both sides';
            else
                qNum['first'] = 'add ' + Math.abs(a[2].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[0].div(a[1]).string() + '=' + a[3].sub(a[2]).string();
            qNum['second'] = 'multiply both sides by ' + a[1].string();
            qNum['result2'] = a[0].string() + '=' + a[3].sub(a[2]).mult(a[1]).string();
            break;
        case 4:
            a[2].coef[0] = new Fraction(randomInt(2, 9), 1);
            qNum['equ'] = a[0].add(a[1]).div(a[2]).string() + '=' + a[3].string();
            if (a[1].coef[0].numerator > 0)
                qNum['second'] = 'subtract ' + a[1].string() + ' from both sides';
            else
                qNum['second'] = 'add ' + Math.abs(a[1].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[0].add(a[1]).string() + '=' + a[3].mult(a[2]).string();
            qNum['first'] = 'multiply both sides by ' + a[2].string();
            qNum['result2'] = a[0].string() + '=' + a[3].mult(a[2]).sub(a[1]).string();
            break;
        case 5:
            a[1].coef[0] = new Fraction(randomInt(1, 9), 1);
            a[2].coef[0] = new Fraction(randomInt(2, 9), 1);
            qNum['equ'] = a[1].add(a[0]).div(a[2]).string() + '=' + a[3].string();
            if (a[1].coef[0].numerator > 0)
                qNum['second'] = 'subtract ' + a[1].string() + ' from both sides';
            else
                qNum['second'] = 'add ' + Math.abs(a[1].coef[0].numerator) + ' to both sides';
            qNum['result1'] = a[1].add(a[0]).string() + '=' + a[3].mult(a[2]).string();
            qNum['first'] = 'multiply both sides by ' + a[2].string();
            qNum['result2'] = a[0].string() + '=' + a[3].mult(a[2]).sub(a[1]).string();
            break;
    }
    qNum['question'] = '<p>Solve the following equation:</p><p>[$][equ][$]</p>';
    qNum['answer'] = '<p>First we [first]</p><p>[$][result1][$]</p><p>then we [second]</p><p>[$][result2][$]</p>';
    setup(30, qNum);
}makeVars30();