function makeVars22() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var al = new Array(11);
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2), randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[0] == syms[1])
        syms[1]++;
    if (syms[2] == syms[3])
        syms[3]++;
    for (var i = 0; i < 4; i++) {
        al[i] = new algebra();
        if (i == 1 || i == 3)
            al[i].coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
        else
            al[i].coef[0] = new Fraction(randomInt(1, 9), 1);
        al[i].terms[0] = new term();
        for (var j = 0; j < syms[i]; j++) {
            var ind = new Fraction(randomLowInt(1, 5), 1);
            al[i].terms[0].addSymbol(randomArrayElement(pronumeral), ind);
        }
    }
    al[4] = al[0].mult(al[2]);
    al[5] = al[0].mult(al[3]);
    al[6] = al[1].mult(al[2]);
    al[7] = al[1].mult(al[3]);
    al[8] = al[4].add(al[5]).add(al[6]).add(al[7]);
    al[9] = al[0].add(al[1]);
    al[10] = al[2].add(al[3]);
    var qNum = {"a": al[0].string(), "b": al[1].string(), "c": al[2].string(), "d": al[3].string(), "ac": al[4].string(), "ad": al[5].string(), "bc": al[6].string(), "bd": al[7].string(), "all": al[8].string(), "ab": al[9].string(), "cd": al[10].string(), "$": "`"};
    qNum['question'] = '<p>Expand the brackets:</p><p>[$]([ab])([cd])[$]</p>';
    qNum['answer'] = '<p>[$][a]xx[c]=[ac][$]  and  [$][a]xx[d]=[ad][$]</p><p>[$][b]xx[c]=[bc][$]  and  [$][b]xx[d]=[bd][$]</p><p>So the answer is:</p><p>[$][all][$]</p>';
    setup(22, qNum);
}makeVars22();