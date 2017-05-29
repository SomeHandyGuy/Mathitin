function makeVars25() {
    var pronumeral = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var al = new Array(7);
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[1] == syms[2])
        syms[1]++;
    for (var i = 0; i < 3; i++) {
        al[i] = new algebra();
        if (i == 0)
            al[i].coef[0] = new Fraction(randomInt(2, 9), 1);
        else if (i == 2)
            al[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
        else
            al[i].coef[0] = new Fraction(randomInt(1, 9), 1);
        al[i].terms[0] = new term();
        for (var j = 0; j < syms[i]; j++) {
            var ind = new Fraction(randomLowInt(1, 5), 1);
            al[i].terms[0].addSymbol(randomArrayElement(pronumeral), ind);
        }
    }
    var g = gcd(al[1].coef[0].numerator, al[2].coef[0].numerator);
    if (g != 1 && g != -1) {
        al[1].coef[0] = al[1].coef[0].div(new Fraction(g, 1));
        al[2].coef[0] = al[2].coef[0].div(new Fraction(g, 1));
    }
    al[3] = al[1].add(al[2]);
    al[4] = al[0].mult(al[1]);
    al[5] = al[0].mult(al[2]);
    al[6] = al[4].add(al[5]);
    var qNum = {"a": al[0].string(), "b": al[1].string(), "c": al[2].string(), "bc": al[3].string(), "ab": al[4].string(), "ac": al[5].string(), "abpac": al[6].string(), "$": "`"};
    qNum['question'] = '<p>Factorise the following:</p><p>[$][abpac][$]</p>';
    qNum['answer'] = '<p>The common factor is [$][a][$]</p><p>[$][a]xx[b]=[ab][$]  and  [$][a]xx[c]=[ac][$]</p><p>So the answer is:</p><p>[$][a]([bc])[$]</p>';
    setup(25, qNum);
}makeVars25();