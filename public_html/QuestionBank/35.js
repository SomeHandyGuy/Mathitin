function makeVars35() {
    do {
        var coefficients = [nonZeroRand(-9, 9), nonZeroRand(-9, 9), 0, nonZeroRand(-9, 9), nonZeroRand(-9, 9), 0];
        var den = randomLowInt(1, 9);
        var ansX = nonZeroRand(-9, 9);
        var ansY = nonZeroRand(-9, 9);
        var xr = ansX % den;
        var yr = ansY % den;
        for (var i = 0; i < 2; i++) {
            var point = i * 3 + 1;
            var count = 0;
            while ((coefficients[i * 3] * xr + coefficients[i * 3 + 1] * yr) % den != 0) {
                count++;
                coefficients[point] = nonZeroRand(-9, 9);
                if (count % 10 == 0)
                    point = (point == i * 3) ? i * 3 + 1 : i * 3;
            }
        }
        coefficients[2] = (coefficients[0] * ansX + coefficients[1] * ansY) / den;
        coefficients[5] = (coefficients[3] * ansX + coefficients[4] * ansY) / den;
    } while (coefficients[0] * coefficients[4] - coefficients[1] * coefficients[3] == 0);
    var a, b, c, d, e, f, target = -1, z;
    if (Math.abs(coefficients[0]) == 1)
        target = 0;
    else if (Math.abs(coefficients[1]) == 1)
        target = 1;
    else if (Math.abs(coefficients[3]) == 1)
        target = 3;
    else if (Math.abs(coefficients[4]) == 1)
        target = 4;
    else
        target = randomArrayElement([0, 1, 3, 4]);
    switch (target) {
        case 0:
            a = coefficients[0];
            b = coefficients[1];
            c = coefficients[2];
            d = coefficients[3];
            e = coefficients[4];
            f = coefficients[5];
            z = 'x';
            break;
        case 1:
            a = coefficients[1];
            b = coefficients[0];
            c = coefficients[2];
            d = coefficients[4];
            e = coefficients[3];
            f = coefficients[5];
            z = 'y';
            break;
        case 3:
            a = coefficients[3];
            b = coefficients[4];
            c = coefficients[5];
            d = coefficients[0];
            e = coefficients[1];
            f = coefficients[2];
            z = 'x';
            break;
        case 4:
            a = coefficients[4];
            b = coefficients[3];
            c = coefficients[5];
            d = coefficients[1];
            e = coefficients[0];
            f = coefficients[2];
            z = 'y';
            break;
    }
    var z2 = (z == 'x') ? 'y' : 'x';
    var one = new Fraction(1, 1);
    var A = new algebra();
    A.coef[0] = new Fraction(a, 1);
    var B = new algebra();
    B.coef[0] = new Fraction(b, 1);
    B.terms[0].addSymbol(z2, one);
    var C = new algebra();
    C.coef[0] = new Fraction(c, 1);
    var D = new algebra();
    D.coef[0] = new Fraction(d, 1);
    var E = new algebra();
    E.coef[0] = new Fraction(e, 1);
    E.terms[0].addSymbol(z2, one);
    var F = new algebra();
    F.coef[0] = new Fraction(f, 1);
    var w = new Array();
    if (Math.abs(a) == 1)
        w[0] = C.sub(B).mult(a);
    else
        w[0] = C.sub(B).div(A);
    w[2] = new algebra();
    if (target == 0 || target == 3) {
        w[1] = D.mult(w[0]).add(E);
        w[2].coef[0] = new Fraction(d, 1);
        w[2].terms[0].addSymbol(C.sub(B), one);
        w[2] = w[2].add(E.mult(A));
        w[3] = D.mult(C.sub(B));
        w[3].terms[2] = new term();
        w[3].coef[2] = w[2].coef[1];
        w[3].terms[2] = w[2].terms[1];
        w[4] = D.mult(C.sub(B)).add(E.mult(A));
    } else {
        w[1] = E.add(D.mult(w[0]));
        w[2] = E.mult(A);
        w[2].coef[1] = new Fraction(d, 1);
        w[2].terms[1] = new term();
        w[2].terms[1].addSymbol(C.sub(B), one);
        w[3] = E.mult(A).add(D.mult(C));
        w[3].terms[2] = new term();
        w[3].coef[2] = D.mult(B).mult(-1).coef[0];
        w[3].terms[2] = D.mult(B).mult(-1).terms[0];
        w[4] = E.mult(A).add(D.mult(C.sub(B)));
    }
    w[5] = w[4].sub(D.mult(C));
    var s2 = new Fraction(f * a - d * c, a * e - b * d);
    var S1 = new algebra(), S2 = new algebra;
    S1.coef[0] = s2.mult(B.coef[0]);
    S2.coef[0] = s2;
    w[6] = C.sub(S1).coef[0].div(A.coef[0]);
    w[7] = C.sub(B);
    w[7].terms[1] = new term();
    w[7].terms[1].addSymbol(S2, one);
    if (Math.abs(a) == 1)
        w[7] = w[7].mult(a);
    else
        w[7] = w[7].div(A);
    var qNum = {"a": coefficients[0], "b": coefficients[1], "c": coefficients[2], "d": coefficients[3], "e": coefficients[4], "f": coefficients[5], "fa": c * a, "z": z, "z2": z2, "s1": w[6].string(), "s2": s2.string(), "e1": '(1)', "e2": '(2)', "sub": w[0].string(), "working1": '<p>[$]' + w[1].string() + '=' + f + '[$]</p>', "working2": '<p>[$]' + w[2].string() + '=' + (f * a) + '[$]</p>', "working3": w[3].string() + '=' + (f * a), "working4": w[4].string() + '=' + (f * a), "working5": w[5].string() + '=' + (f * a - d * c), "working6": w[7].string() + '=[s1]', "$": "`"};
    if (target == 3 || target == 4) {
        qNum['e1'] = '(2)';
        qNum['e2'] = '(1)';
    }
    if (Math.abs(a) == 1) {
        qNum['working1'] = qNum['working2'];
        qNum['working2'] = '';
    }
    qNum['question'] = '<p>Solve these simultaneous equations <u>using the substitution method</u>.</p><p>[$][!a][x][+!b][y]=[c][$] &nbsp;-&nbsp;-&nbsp;-&nbsp; (1)</p><p>[$][!d][x][+!e][y]=[f][$] &nbsp;-&nbsp;-&nbsp;-&nbsp; (2)</p>';
    qNum['answer'] = '<p>Make [$][z][$] the subject of equation [e1]:</p><p>[$][z]=[sub][$] &nbsp;-&nbsp;-&nbsp;-&nbsp; (3)</p><p>Now substitute this into equation [e2]:</p>[?working1]<p>Now solve to get value of [$][z2][$]</p>[?working2]<p>[$][?working3][$]</p><p>[$][working4][$]</p><p>[$][working5][$]</p><p>[$][z2]=[s2][$]</p><p>Now substitute [$][z2]=[s2][$] into (3) to get the value of [$][z][$]</p><p>[$][z]=[sub]=[?working6][$]</p>';
    setup(35, qNum);
}makeVars35();