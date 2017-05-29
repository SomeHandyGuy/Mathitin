function makeVars36() {
    var one = new Fraction(1, 1);
    var Cf = new Array(), CfSyms = ['x', 'y', ''], A = [nonZeroRand(-9, 9), nonZeroRand(-9, 9), 0, nonZeroRand(-9, 9), nonZeroRand(-9, 9), 0];
    var den = randomLowInt(1, 9);
    var ansX = nonZeroRand(-9, 9);
    var ansY = nonZeroRand(-9, 9);
    var xr = ansX % den;
    var yr = ansY % den;
    for (var i = 0; i < 2; i++) {
        var point = i * 3 + 1;
        var count = 0;
        while ((A[i * 3] * xr + A[i * 3 + 1] * yr) % den != 0) {
            count++;
            A[point] = nonZeroRand(-9, 9);
            if (count % 10 == 0)
                point = (point == i * 3) ? i * 3 + 1 : i * 3;
        }
    }
    A[2] = (A[0] * ansX + A[1] * ansY) / den;
    A[5] = (A[3] * ansX + A[4] * ansY) / den;
    for (var i = 0; i < 6; i++) {
        Cf[i] = new algebra();
        Cf[i].terms[0].addSymbol(CfSyms[i % 3], one);
        Cf[i].coef[0] = new Fraction(A[i], 1);
    }
    Cf[6] = Cf[0].add(Cf[1]);
    Cf[7] = Cf[3].add(Cf[4]);
    var a = Cf[0].coef[0].numerator;
    var b = Cf[1].coef[0].numerator;
    var c = Cf[2].coef[0].numerator;
    var d = Cf[3].coef[0].numerator;
    var e = Cf[4].coef[0].numerator;
    var f = Cf[5].coef[0].numerator;
    var LCM1 = lcm(a, d);
    var LCM2 = lcm(b, e);
    var ths, tht, itisX, itisEq1;
    if (Math.abs(LCM1) <= Math.abs(LCM2)) {
        ths = LCM1 / a;
        tht = LCM1 / d;
        Cf[8] = Cf[6].mult(ths);
        Cf[9] = Cf[7].mult(tht);
        itisX = false;
        if (Math.abs(b) <= Math.abs(e))
            itisEq1 = true;
        else
            itisEq1 = false;
    } else {
        ths = LCM2 / b;
        tht = LCM2 / e;
        Cf[8] = Cf[6].mult(ths);
        Cf[9] = Cf[7].mult(tht);
        itisX = true;
        if (Math.abs(a) <= Math.abs(d))
            itisEq1 = true;
        else
            itisEq1 = false;
    }
    Cf[10] = new algebra();
    Cf[10].coef[0] = one;
    Cf[10].coef[1] = new Fraction(-1, 1);
    Cf[10].terms[0].addSymbol(Cf[8], one);
    Cf[10].terms[1] = new term();
    Cf[10].terms[1].addSymbol(Cf[9], one);
    Cf[11] = new algebra();
    Cf[11].coef[0] = one;
    Cf[11].terms[0].addSymbol(Cf[8], one);
    Cf[11] = Cf[11].sub(Cf[3].mult(tht));
    Cf[11].coef[2] = Cf[4].mult(-tht).coef[0];
    Cf[11].terms[2] = new term();
    Cf[11].terms[2].addSymbol('y', one);
    var S1 = new algebra();
    S1.coef[0] = new Fraction(c * ths - f * tht, Cf[8].sub(Cf[9]).coef[0].numerator);
    Cf[12] = new algebra();
    if (itisEq1)
        Cf[12].copy(Cf[6]);
    else
        Cf[12].copy(Cf[7]);
    if (itisX)
        Cf[12].terms[0].symbol[0] = S1;
    else
        Cf[12].terms[1].symbol[0] = S1;
    Cf[13] = new algebra();
    var target = (itisX) ? '0' : '1';
    Cf[13].copy(Cf[12]);
    Cf[13].terms[target] = new term();
    Cf[13].coef[target] = Cf[13].coef[target].mult(S1.coef[0]);
    Cf[14] = Cf[13].sub(S1.mult(Cf[12].coef[target].numerator));
    var S = new Fraction((itisEq1) ? c : f, 1);
    S = S.sub(S1.coef[0].mult(Cf[12].coef[target]));
    var S2 = S.div(Cf[14].coef[0]);
    var qNum = {"axby": Cf[6].string(), "c": Cf[2].string(), "dxey": Cf[7].string(), "f": Cf[5].string(), "this": ths, "that": tht, "multEq1": '<p>Multiply equation (1) by [this] [?and]</p><p>[$]' + Cf[8].string() + '=' + (c * ths) + '[$]&nbsp;-&nbsp;-&nbsp;-&nbsp; (3)</p>', "and": 'and multiply equation (2) by [that]', "multEq2": '<p>[$]' + Cf[9].string() + '=' + (f * tht) + '[$]&nbsp;-&nbsp;-&nbsp;-&nbsp; (4)</p>', "one": '(3)', "two": '(4)', "working1": Cf[10].string() + '=' + (c * ths) + '-' + (f * tht), "working2": Cf[11].string() + '=' + (c * ths - f * tht), "working3": Cf[8].sub(Cf[9]).string() + '=' + (c * ths - f * tht), "solutions": '<p>Hence [$][z1]=[s1][$], now find value of [$][z2][$] using equation [eq]</p><p>[$][working4][$]</p><p>[$][working5][$]</p><p>[$][?working6][$]</p><p>[$][z2]=[s2][$]</p>', "z1": (itisX) ? 'x' : 'y', "z2": (itisX) ? 'y' : 'x', "s1": S1.string(), "eq": (itisEq1) ? '(1)' : '(2)', "working4": Cf[12].string() + '=' + ((itisEq1) ? c : f), "working5": Cf[13].string() + '=' + ((itisEq1) ? c : f), "working6": Cf[14].string() + '=' + ((itisEq1) ? c : f) + '[p]' + S1.mult(Cf[12].coef[target].numerator).mult(-1).string() + '=' + S.string(), "p": '+', "s2": S2.string(), "$": "`"};
    if (S1.mult(Cf[12].coef[target].numerator).coef[0].decimal() > 0)
        qNum['p'] = '';
    if (ths == 1) {
        qNum['one'] = '(1)';
        qNum['two'] = '(3)';
        qNum['multEq1'] = '<p>Multiply equation (2) by [that]</p><p>[$]' + Cf[9].string() + '=' + (f * tht) + '[$]&nbsp;-&nbsp;-&nbsp;-&nbsp; (3)</p>';
        qNum['multEq2'] = '';
    }
    if (tht == 1) {
        qNum['two'] = '(2)';
        qNum['and'] = '';
        qNum['multEq2'] = '';
    }
    if (ths == 1 && tht == 1) {
        qNum['multEq1'] = '';
    }
    if (S1.coef[0].numerator == 0)
        qNum['solutions'] = 'It is not possible to find a single solution to these equations.';
    qNum['question'] = '<p>Solve these simultaneous equations <u>using the elimination method</u>.</p><p>[$][axby]=[c][$] &nbsp;-&nbsp;-&nbsp;-&nbsp; (1)</p><p>[$][dxey]=[f][$] &nbsp;-&nbsp;-&nbsp;-&nbsp; (2)</p>';
    qNum['answer'] = '[?multEq1][?multEq2]<p>subtract equation [two] from equation [one]</p><p>[$][working1][$]</p><p>[$][working2][$]</p><p>[$][?working3][$]</p><p>Hence [$][z1]=[s1][$], now find value of [$][z2][$] using equation [eq]</p><p>[$][working4][$]</p><p>[$][working5][$]</p><p>[$][?working6][$]</p><p>[$][z2]=[s2][$]</p>';
    setup(36, qNum);
}makeVars36();