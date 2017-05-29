function makeVars34() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = new term();
    var one = new Fraction(1, 1);
    x.addSymbol(randomArrayElement(pronumeral), one);
    var negOneF = new Fraction(-1, 1);
    var negOne = new algebra();
    negOne.coef[0] = negOneF;
    negOne.terms[0] = new term();
    var a = new Array();
    for (var i = 0; i < 8; i++) {
        a[i] = new algebra();
        if (i == 0) {
            a[i].terms[0] = x;
            a[i].coef[0] = one;
        } else {
            a[i].terms[0] = new term();
            if (i == 2 || i == 5 || i == 7) {
                if (randomInt(0, 1) || i == 7)
                    a[i].coef[0] = new Fraction(randomInt(-9, 9), 1);
                else
                    a[i].coef[0] = new Fraction(0, 1);
            } else if (i == 1 || i == 4)
                a[i].coef[0] = new Fraction(randomInt(1, 9), 1);
            else if (i == 3 || i == 6)
                do {
                    a[i].coef[0] = new Fraction(randomInt(2, 9), 1);
                } while (i == 6 && gcd(a[3].coef[0].numerator, a[6].coef[0].numerator) == Math.min(a[3].coef[0].numerator, a[6].coef[0].numerator));
            else
                a[i].coef[0] = new Fraction(1, 1);
        }
    }
    var g = gcd(a[3].coef[0].numerator, a[6].coef[0].numerator);
    if (g != 1) {
        a[3].coef[0].numerator /= g;
        a[6].coef[0].numerator /= g;
    }
    var a10string = '';
    var a10stringy = '';
    if (randomInt(0, 1)) {
        a[8] = a[0].mult(a[1]).add(a[2]).div(a[3]).add(a[0].mult(a[4]).add(a[5]).div(a[6]));
        a[9] = a[0].mult(a[1]).add(a[2]).add(a[3].mult(a[0].mult(a[4]).add(a[5]).div(a[6])));
        a10string = a[6].string() + '(' + a[0].mult(a[1]).add(a[2]).string() + ')+' + a[3].string() + '(' + a[0].mult(a[4]).add(a[5]).string() + ')';
        a10stringy = a[6].mult(a[0].mult(a[1]).add(a[2])).string() + '+' + (a[3].mult(a[0].mult(a[4]).add(a[5]))).string();
        a[10] = a[6].mult(a[0].mult(a[1]).add(a[2])).add(a[3].mult(a[0].mult(a[4]).add(a[5])));
    } else {
        a[8] = a[0].mult(a[1]).add(a[2]).div(a[3]).sub(a[0].mult(a[4]).sub(a[5]).div(a[6]));
        a[9] = a[0].mult(a[1]).add(a[2]).sub(a[3].mult(a[0].mult(a[4]).add(a[5]).div(a[6])));
        a10string = a[6].string() + '(' + a[0].mult(a[1]).add(a[2]).string() + ')-' + a[3].string() + '(' + a[0].mult(a[4]).add(a[5]).string() + ')';
        a10stringy = a[6].mult(a[0].mult(a[1]).add(a[2])).string() + '-' + (a[3].mult(a[0].mult(a[4]).add(a[5]))).string();
        a[10] = a[6].mult(a[0].mult(a[1]).add(a[2])).sub(a[3].mult(a[0].mult(a[4]).add(a[5])));
    }
    a[11] = a[7].mult(a[3]).mult(a[6]);
    var qNum = {'equ': a[8].string() + '=' + a[7].string(), 'STEP1': 'Multiply both sides by `' + a[3].string() + '`<span style="float:right">`' + a[9].string() + '=' + a[7].mult(a[3]).string() + '`</span>', 'STEP2': 'Multiply both sides by `' + a[6].string() + '`<span style="float:right">`' + a10string + '=' + a[11].string() + '`</span>', 'STEP3': 'Expand brackets <span style="float:right">`' + a10stringy + '=' + a[11].string() + '`</span>', 'STEP4': 'Gather like terms <span style="float:right">`' + a[10].string() + '=' + a[11].string() + '`</span>', 'STEP5': '', 'STEP6': '', "$": "`"};
    if (a[10].coef.length > 1) {
        if (a[10].coef[1].numerator > 0)
            qNum['STEP5'] = 'Subtract ' + a[10].coef[1].string() + ' from both sides <span style="float:right">`';
        else
            qNum['STEP5'] = 'Add ' + a[10].coef[1].mult(negOneF).string() + ' to both sides <span style="float:right">`';
        var t = new algebra();
        t.coef[0] = a[10].coef[1];
        t.terms[0] = new term();
        a[11] = a[11].sub(t);
        qNum['STEP5'] += a[10].sub(t).string() + '=' + a[11].string() + '`</span>';
    }
    if (a[10].coef[0].numerator != 1)
        qNum['STEP6'] = 'Divide both sides by ' + a[10].coef[0].string() + '<span style="float:right">`' + a[0].string() + '=' + a[11].coef[0].div(a[10].coef[0]).string() + '`</span>';
    qNum['question'] = '<p>Solve the following equation:</p><p>[$][equ][$]</p>';
    qNum['answer'] = '<div style="width:300px;"><p style="margin: 0 0 1.5em 0;">[STEP1]</p><p>[STEP2]</p><p>[STEP3]</p><p>[STEP4]</p><p>[STEP5]</p><p>[STEP6]</p>';
    setup(34, qNum);
}makeVars34();