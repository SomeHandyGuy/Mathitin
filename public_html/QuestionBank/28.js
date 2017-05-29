function makeVars28() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var alg = new Array();
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[0] == syms[1] && syms[1] == 0)
        syms[1] = 1;
    for (var i = 0; i < 2; i++) {
        alg[i] = new algebra();
        if (i)
            alg[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
        else
            alg[i].coef[0] = new Fraction(nonZeroRand(1, 9), 1);
        alg[i].terms[0] = new term();
        for (var j = 0; j < syms[i]; j++)
            alg[i].terms[0].addSymbol(randomArrayElement(pronumeral), new Fraction(randomLowInt(1, 2)));
    }
    alg[2] = alg[0].mult(alg[0]);
    alg[3] = alg[1].mult(alg[1]);
    alg[4] = alg[0].mult(alg[1]);
    var notSquare = true;
    if (randomInt(0, 1)) {
        alg[4].coef[0] = new Fraction(randomInt(-99, 99), 1);
    } else {
        alg[4] = alg[4].add(alg[4]);
        notSquare = false;
    }
    alg[5] = alg[2].add(alg[4]).add(alg[3]);
    var qNum = {"a": alg[0].string(), "b": alg[1].string(), "mb": alg[1].mult(-1).string(), "aa": alg[2].string(), "bb": alg[3].string(), "nab": alg[4].string(), "apb": alg[0].add(alg[1]).string(), "exp": alg[5].string(), "ifsquare": '<p>Therefore [$][exp]=([apb])^2[$]</p>', "is": 'is', "$": "`"};
    if (notSquare) {
        qNum['ifsquare'] = '';
        qNum['is'] = 'is not';
    }
    qNum['question'] = '<p>Determine if [$][exp][$] is a perfect square.</p><p>If it is a perfect square, then factorise it (do not factorise it otherwise).</p>';
    qNum['answer'] = '<p>[$][aa][$] is the square of [$][a][$]</p><p>[$][bb][$] is the square of [$][b][$]  or  [$][mb][$]</p><p>[$][nab][$] [is] equal to [$]2xx[a]xx[b][$], hence [$][exp][$] [is] a perfect square.</p>[?ifsquare]';
    setup(28, qNum);
}makeVars28();