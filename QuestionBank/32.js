function makeVars32() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = new term();
    var one = new Fraction(1, 1);
    var negOne = new algebra();
    negOne.coef[0] = new Fraction(-1, 1);
    negOne.terms[0] = new term();
    var zero = new algebra();
    zero.coef[0] = new Fraction(0, 1);
    zero.terms[0] = new term();
    x.addSymbol(randomArrayElement(pronumeral), one);
    var a = new Array();
    for (var i = 0; i < 10; i++) {
        a[i] = new algebra();
        if (i == 0) {
            a[i].terms[0] = x;
            a[i].coef[0] = one;
        } else {
            a[i].terms[0] = new term();
            if (i == 2 || i == 4 || i == 5)
                a[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
            else if (i == 3)
                a[i].coef[0] = new Fraction(randomInt(2, 9), 1);
            else if (i == 1)
                a[i].coef[0] = new Fraction(randomInt(1, 9), 1);
            else
                a[i].coef[0] = one;
        }
    }
    var qNum = {'exp': 'Expand brackets:&#160;&#160;&#160;&#160;', 'expand': '', 'addsub1': '', 'addsub2': '', 'result1': '', 'result2': '', 'result3': '', "$": "`"};
    var expand = true;
    switch (randomInt(0, 6)) {
        case 0:
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).div(a[3]).string() + '=' + a[5].string();
            qNum['mult'] = a[3].string();
            expand = false;
            qNum['factor'] = '`' + a[0].mult(a[1]).add(a[2]).string() + '=' + a[5].mult(a[3]).string() + '`';
            a[6] = a[1];
            a[7] = a[2];
            a[8] = zero;
            a[9] = a[5].mult(a[3]);
            break;
        case 1:
            qNum['equ'] = a[2].div(a[0].mult(a[3]).add(a[4])).string() + '=' + a[5].string();
            qNum['mult'] = '(' + a[0].mult(a[3]).add(a[4]).string() + ')';
            qNum['factor'] = '`' + a[2].string() + '=' + a[5].string() + '(' + a[0].mult(a[3]).add(a[4]).string() + ')`';
            a[6] = zero;
            a[7] = a[2];
            a[8] = a[5].mult(a[3]);
            a[9] = a[5].mult(a[4]);
            break;
        case 2:
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).div(a[0].mult(a[3]).add(a[4])).string() + '=' + a[5].string();
            qNum['mult'] = '(' + a[0].mult(a[3]).add(a[4]).string() + ')';
            qNum['factor'] = '`' + a[0].mult(a[1]).add(a[2]).string() + '=' + a[5].string() + '(' + a[0].mult(a[3]).add(a[4]).string() + ')`';
            a[6] = a[1];
            a[7] = a[2];
            a[8] = a[5].mult(a[3]);
            a[9] = a[5].mult(a[4]);
            break;
        case 3:
            qNum['equ'] = a[0].mult(a[1]).div(a[0].mult(a[3]).add(a[4])).string() + '=' + a[5].string();
            qNum['mult'] = '(' + a[0].mult(a[3]).add(a[4]).string() + ')';
            qNum['factor'] = '`' + a[0].mult(a[1]).string() + '=' + a[5].string() + '(' + a[0].mult(a[3]).add(a[4]).string() + ')`';
            a[6] = a[1];
            a[7] = zero;
            a[8] = a[5].mult(a[3]);
            a[9] = a[5].mult(a[4]);
            break;
        case 4:
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).div(a[0].mult(a[3])).string() + '=' + a[5].string();
            qNum['mult'] = a[0].mult(a[3]).string();
            expand = false;
            qNum['factor'] = '`' + a[0].mult(a[1]).add(a[2]).string() + '=' + a[5].mult(a[0]).mult(a[3]).string() + '`';
            a[6] = a[1];
            a[7] = a[2];
            a[8] = a[5].mult(a[3]);
            a[9] = zero;
            break;
        case 5:
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).div(a[3]).string() + '=' + a[0].mult(a[4]).add(a[5]).string();
            qNum['mult'] = a[3].string();
            qNum['factor'] = '`' + a[0].mult(a[1]).add(a[2]).string() + '=' + a[3].string() + '(' + a[0].mult(a[4]).add(a[5]).string() + ')`';
            a[6] = a[1];
            a[7] = a[2];
            a[8] = a[3].mult(a[4]);
            a[9] = a[3].mult(a[5]);
            break;
        case 6:
            qNum['equ'] = a[0].mult(a[1]).add(a[2]).div(a[3]).string() + '=' + a[0].mult(a[4]).string();
            qNum['mult'] = a[3].string();
            expand = false;
            qNum['factor'] = '`' + a[0].mult(a[1]).add(a[2]).string() + '=' + a[3].mult(a[0]).mult(a[4]).string() + '`';
            a[6] = a[1];
            a[7] = a[2];
            a[8] = a[3].mult(a[4]);
            a[9] = zero;
            break;
    }
    if (expand)
        qNum['expand'] = '`' + a[6].mult(a[0]).add(a[7]).string() + '=' + a[0].mult(a[8]).add(a[9]).string() + '`';
    else
        qNum['exp'] = '';
    if (a[6].coef[0].numerator < a[8].coef[0].numerator || a[6].coef[0].numerator == 0) {
        if (a[6].coef[0].numerator) {
            if (a[6].coef[0].numerator > 0)
                qNum['addsub1'] = 'subtract `' + a[0].mult(a[6]).string() + '` from both sides:&#160;&#160;&#160;&#160;';
            else
                qNum['addsub1'] = 'add `' + a[0].mult(a[6]).mult(negOne).string() + '` to both sides:&#160;&#160;&#160;&#160;';
            qNum['result1'] = '`' + a[7].string() + '=' + a[0].mult(a[8]).add(a[9]).sub(a[6].mult(a[0])).string() + '`';
        }
        if (a[9].coef[0].numerator) {
            if (a[9].coef[0].numerator > 0)
                qNum['addsub2'] = 'subtract `' + a[9].string() + '` from both sides:&#160;&#160;&#160;&#160;';
            else
                qNum['addsub2'] = 'add `' + a[9].mult(negOne).string() + '` to both sides:&#160;&#160;&#160;&#160;';
            qNum['result2'] = a[7].sub(a[9]).string() + '=' + a[0].mult(a[8]).sub(a[6].mult(a[0])).string();
        }
        qNum['div'] = 'finally, divide by `' + a[8].sub(a[6]).string() + '`';
    } else {
        if (a[8].coef[0].numerator) {
            if (a[8].coef[0].numerator > 0)
                qNum['addsub1'] = 'subtract `' + a[0].mult(a[8]).string() + '` from both sides:&#160;&#160;&#160;&#160;';
            else
                qNum['addsub1'] = 'add `' + a[0].mult(a[8]).mult(negOne).string() + '` to both sides:&#160;&#160;&#160;&#160;';
            qNum['result1'] = '`' + a[6].mult(a[0]).add(a[7]).sub(a[0].mult(a[8])).string() + '=' + a[9].string() + '`';
        }
        if (a[7].coef[0].numerator) {
            if (a[7].coef[0].numerator > 0)
                qNum['addsub2'] = 'subtract `' + a[7].string() + '` from both sides:&#160;&#160;&#160;&#160;';
            else
                qNum['addsub2'] = 'add `' + a[7].mult(negOne).string() + '` to both sides:&#160;&#160;&#160;&#160;';
            qNum['result2'] = a[6].mult(a[0]).sub(a[0].mult(a[8])).string() + '=' + a[9].sub(a[7]).string();
        }
        qNum['div'] = 'finally, divide by `' + a[6].sub(a[8]).string() + '`';
    }
    if (qNum['div'] == 'finally, divide by `1`')
        qNum['div'] = '';
    else
        qNum['result3'] = a[0].string() + '=' + a[7].sub(a[9]).coef[0].div(a[8].sub(a[6]).coef[0]).string();
    qNum['question'] = '<p>Solve the following equation:</p><p>[$][equ][$]</p>';
    qNum['answer'] = '<p>Multiply both sides by `[mult]`<br/>[factor]</p><p>[exp] [expand]</p><p>[addsub1][result1]</p><p>[addsub2]`[result2]`</p><p>[div]<br/>`[result3]`</p>';
    setup(32, qNum);
}makeVars32();