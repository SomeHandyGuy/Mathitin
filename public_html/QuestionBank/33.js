function makeVars33() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = new term();
    var one = new Fraction(1, 1);
    x.addSymbol(randomArrayElement(pronumeral), one);
    var negOneF = new Fraction(-1, 1);
    var negOne = new algebra();
    negOne.coef[0] = negOneF;
    negOne.terms[0] = new term();
    var a = new Array();
    var intSol = new Fraction(1, 1);
    var pow = new Fraction(1, 1);
    if (randomInt(0, 1)) {
        pow.numerator = randomInt(2, 5);
        intSol.numerator = Math.pow(randomInt(1, 4), pow.numerator);
    } else {
        pow.denominator = randomInt(2, 5);
        intSol.numerator = randomInt(1, 4);
    }
    for (var i = 0; i < 6; i++) {
        a[i] = new algebra();
        if (i == 0) {
            a[i].terms[0] = x;
            a[i].coef[0] = one;
        } else {
            a[i].terms[0] = new term();
            if (i == 3 || i == 4) {
                if (randomInt(0, 1))
                    a[i].coef[0] = new Fraction(randomInt(-9, 9), 1);
                else
                    a[i].coef[0] = new Fraction(0, 1);
            } else {
                if ((i == 1 || i == 2) && randomInt(0, 1))
                    a[i].coef[0] = new Fraction(randomInt(1, 9), 1);
                else
                    a[i].coef[0] = new Fraction(1, 1);
            }
        }
    }
    a[5].coef[0] = a[1].coef[0].mult(intSol).add(a[4].coef[0]);
    a[6] = new algebra();
    a[6].copy(a[1]);
    if (a[2].coef[0].numerator != 1 || a[3].coef[0].numerator)
        a[6].terms[0].addSymbol(a[0].mult(a[2]).add(a[3]), pow);
    else {
        a[6].terms[0].addSymbol(a[0].terms[0].symbol[0], pow);
    }
    a[6] = a[6].add(a[4]);
    var qNum = {'equ': a[6].string() + '=' + a[5].string(), 'STEP1': '', 'STEP2': '', 'STEP3': '', 'STEP4': '', 'STEP5': '', "$": "`"};
    var action = '';
    if (a[4].coef[0].numerator) {
        action = 'subtract ' + a[4].string() + ' from';
        if (a[4].coef[0].numerator < 0)
            action = 'add ' + a[4].mult(negOne).string() + ' to';
        qNum['STEP1'] = action + ' both sides <span style="float:right">`' + a[6].sub(a[4]).string() + '=' + a[5].sub(a[4]).string() + '`</span>';
    }
    if (a[1].coef[0].numerator != 1) {
        var da1 = new algebra();
        da1.coef[0] = new Fraction(a[1].coef[0].denominator, a[1].coef[0].numerator);
        da1.terms[0] = new term();
        qNum['STEP2'] = 'Divide both sides by ' + a[1].string() + '<span style="float:right">`' + a[6].sub(a[4]).mult(da1).string() + '=' + a[5].sub(a[4]).coef[0].div(a[1].coef[0]).string() + '`</span>';
    }
    var pm = false;
    if (pow.numerator > pow.denominator) {
        if (pow.numerator != 2)
            if (pow.numerator != 4)
                qNum['STEP3'] = 'Take `root ' + pow.numerator + ' ` of both sides';
            else {
                qNum['STEP3'] = 'Take `+-root ' + pow.numerator + ' ` of both sides';
                pm = true;
            }
        else {
            qNum['STEP3'] = 'Take `+-sqrt ` of both sides';
            pm = true;
        }
    } else {
        qNum['STEP3'] = 'Raise both sides to power of ' + pow.denominator;
    }
    var res1 = new Fraction(1, 1);
    var res2 = new Fraction(1, 1);
    res1 = a[5].sub(a[4]).coef[0].div(a[1].coef[0]).pow(pow.denominator / pow.numerator);
    qNum['STEP3'] += '<span style="float:right">`' + a[0].mult(a[2]).add(a[3]).string() + '=' + res1.string();
    if (a[3].coef[0].numerator) {
        action = 'subtract ' + a[3].string() + ' from';
        if (a[3].coef[0].numerator < 0)
            action = 'add ' + a[3].mult(negOne).string() + ' to';
        qNum['STEP4'] = action + ' both sides<span style="float:right">`' + a[0].mult(a[2]).string() + '=' + res1.sub(a[3].coef[0]).string();
    }
    if (a[2].coef[0].numerator != 1) {
        qNum['STEP5'] = 'Divide both sides by ' + a[2].string() + '<span style="float:right">`' + a[0].string() + '=' + res1.sub(a[3].coef[0]).div(a[2].coef[0]).string();
    }
    if (pm) {
        res2 = a[5].sub(a[4]).coef[0].div(a[1].coef[0]).pow(pow.denominator / pow.numerator).mult(negOneF);
        qNum['STEP3'] += '`&#160;&#160; or &#160;&#160;`' + res2.string();
        if (qNum['STEP4'])
            qNum['STEP4'] += '`&#160;&#160; or &#160;&#160;`' + res2.sub(a[3].coef[0]).string();
        if (qNum['STEP5'])
            qNum['STEP5'] += '`&#160;&#160; or &#160;&#160;`' + res2.sub(a[3].coef[0]).div(a[2].coef[0]).string();
    }
    qNum['STEP3'] += '`</span>';
    if (qNum['STEP4'])
        qNum['STEP4'] += '`</span>';
    if (qNum['STEP5'])
        qNum['STEP5'] += '`</span>';
    qNum['question'] = '<p>Solve the following equation:</p><p>[$][equ][$]</p>';
    qNum['answer'] = '<p>[STEP1]</p><p>[STEP2]</p><p>[STEP3]</p><p>[STEP4]</p><p>[STEP5]</p>';
    setup(33, qNum);
}makeVars33();