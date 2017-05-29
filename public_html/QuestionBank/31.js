function makeVars31() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = new term();
    var one = new Fraction(1, 1);
    var negOneF = new Fraction(-1, 1);
    var negOne = new algebra();
    negOne.coef[0] = negOneF;
    negOne.terms[0] = new term();
    x.addSymbol(randomArrayElement(pronumeral), one);
    var a = new Array();
    for (var i = 0; i < 11; i++) {
        a[i] = new algebra();
        if (i == 0) {
            a[i].terms[0] = x;
            a[i].coef[0] = one;
        } else {
            a[i].terms[0] = new term();
            if (i == 3 || i == 6)
                a[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
            else if (i == 1 || i == 4)
                a[i].coef[0] = new Fraction(randomInt(2, 9), 1);
            else if (i == 2 || i == 5)
                a[i].coef[0] = new Fraction(randomInt(1, 9), 1);
            else
                a[i].coef[0] = new Fraction(1, 1);
        }
    }
    var qNum = {'exp': 'Expand brackets: &#160;&#160;&#160;&#160;', 'expand': '', 'result3': '', "$": "`"};
    var expand = true;
    switch (randomLowInt(0, 3)) {
        case 0:
            qNum['equ'] = a[0].mult(a[2]).add(a[3]).string() + '=' + a[0].mult(a[5]).add(a[6]).string();
            a[7] = a[2];
            a[8] = a[3];
            a[9] = a[5];
            a[10] = a[6];
            qNum['exp'] = '';
            expand = false;
            break;
        case 1:
            qNum['equ'] = a[1].string() + '(' + a[0].mult(a[2]).add(a[3]).string() + ')=' + a[0].mult(a[5]).add(a[6]).string();
            a[7] = a[1].mult(a[2]);
            a[8] = a[1].mult(a[3]);
            a[9] = a[5];
            a[10] = a[6];
            break;
        case 2:
            qNum['equ'] = a[0].mult(a[2]).add(a[3]).string() + '=' + a[4].string() + '(' + a[0].mult(a[5]).add(a[6]).string() + ')';
            a[7] = a[2];
            a[8] = a[3];
            a[9] = a[4].mult(a[5]);
            a[10] = a[4].mult(a[6]);
            break;
        case 3:
            qNum['equ'] = a[1].string() + '(' + a[0].mult(a[2]).add(a[3]).string() + ')=' + a[4].string() + '(' + a[0].mult(a[5]).add(a[6]).string() + ')';
            a[7] = a[1].mult(a[2]);
            a[8] = a[1].mult(a[3]);
            a[9] = a[4].mult(a[5]);
            a[10] = a[4].mult(a[6]);
            break;
    }
    if (expand)
        qNum['expand'] = '`' + a[7].mult(a[0]).add(a[8]).string() + '=' + a[0].mult(a[9]).add(a[10]).string() + '`';
    if (a[7].coef[0].numerator < a[9].coef[0].numerator && a[9].coef[0].numerator > 0) {
        if (a[7].coef[0].numerator > 0)
            qNum['addsub1'] = 'subtracting `' + a[0].mult(a[7]).string() + '` from';
        else
            qNum['addsub1'] = 'adding `' + a[0].mult(a[7]).mult(negOne).string() + '` to';
        qNum['result1'] = a[8].string() + '=' + a[0].mult(a[9]).add(a[10]).sub(a[7].mult(a[0])).string();
        if (a[10].coef[0].numerator > 0)
            qNum['addsub2'] = 'subtract `' + a[10].string() + '` from';
        else
            qNum['addsub2'] = 'add `' + a[10].mult(negOne).string() + '` to';
        qNum['result2'] = a[8].sub(a[10]).string() + '=' + a[0].mult(a[9]).sub(a[7].mult(a[0])).string();
        qNum['div'] = 'finally, divide by `' + a[9].sub(a[7]).string() + '`.';
    } else {
        if (a[9].coef[0].numerator > 0)
            qNum['addsub1'] = 'subtracting `' + a[0].mult(a[9]).string() + '` from';
        else
            qNum['addsub1'] = 'adding `' + a[0].mult(a[9]).mult(negOne).string() + '` to';
        qNum['result1'] = a[7].mult(a[0]).add(a[8]).sub(a[0].mult(a[9])).string() + '=' + a[10].string();
        if (a[8].coef[0].numerator > 0)
            qNum['addsub2'] = 'subtract `' + a[8].string() + '` from';
        else
            qNum['addsub2'] = 'add `' + a[8].mult(negOne).string() + '` to';
        qNum['result2'] = a[7].mult(a[0]).sub(a[0].mult(a[9])).string() + '=' + a[10].sub(a[8]).string();
        qNum['div'] = 'finally, divide by `' + a[7].sub(a[9]).string() + '`.';
    }
    if (qNum['div'] == 'finally, divide by `1`.')
        qNum['div'] = '';
    else
        qNum['result3'] = a[0].string() + '=' + a[8].sub(a[10]).coef[0].div(a[9].sub(a[7]).coef[0]).string();
    qNum['question'] = '<p>Solve the following equation:</p><p>[$][equ][$]</p>';
    qNum['answer'] = '<p>[exp] [expand]</p><p>gather like terms by [addsub1] both sides:<br>`[result1]`</p><p>now [addsub2] both sides <br>`[result2]`</p><p>[div]<br>`[result3]`</p>';
    setup(31, qNum);
}makeVars31();