function makeVars29() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var alg = new Array();
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[0] == syms[1] && syms[1] == 0)
        syms[1] = 1;
    for (var i = 0; i < 2; i++) {
        alg[i] = new algebra();
        alg[i].coef[0] = new Fraction(nonZeroRand(1, 9), 1);
        alg[i].terms[0] = new term();
        for (var j = 0; j < syms[i]; j++)
            alg[i].terms[0].addSymbol(randomArrayElement(pronumeral), new Fraction(randomLowInt(1, 2)));
    }
    alg[2] = alg[0].mult(alg[0]);
    alg[3] = alg[1].mult(alg[1]);
    var qNum = {"a": alg[0].string(), "b": alg[1].string(), "aa": alg[2].string(), "bb": alg[3].string(), "apb": alg[0].add(alg[1]).string(), "amb": alg[0].sub(alg[1]).string(), "exp": alg[2].sub(alg[3]).string(), "$": "`"};
    qNum['question'] = '<p>Factorise the following expression</p><p>[$][exp][$]</p>';
    qNum['answer'] = '<p>[$][aa][$] is the square of [$][a][$]</p><p>[$][bb][$] is the square of [$][b][$]</p><p>Hence [$][exp]=([apb])([amb])[$]</p>';
    setup(29, qNum);
}makeVars29();