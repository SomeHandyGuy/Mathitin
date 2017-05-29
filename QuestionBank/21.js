function makeVars21() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var al = new Array(6);
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[1] == syms[2])
        syms[1]++;
    for (var i = 0; i < 3; i++) {
        al[i] = new algebra();
        al[i].coef[0] = new Fraction(randomInt(1, 9), 1);
        al[i].terms[0] = new term();
        for (var j = 0; j < syms[i]; j++) {
            var ind = new Fraction(randomLowInt(1, 5), 1);
            al[i].terms[0].addSymbol(randomArrayElement(pronumeral), ind);
        }
    }
    al[3] = al[1].add(al[2]);
    al[4] = al[0].mult(al[1]);
    al[5] = al[0].mult(al[2]);
    var qNum = {"a": al[0].string(),
        "b": al[1].string(),
        "c": al[2].string(),
        "+": randomArrayElement(['+', '-']),
        "bc": al[3].string(),
        "ab": al[4].string(),
        "ac": al[5].string(),
        "abpac": al[4].add(al[5]).string(),
        "$": "`"
    };
    if (qNum['+'] == '-') {
        qNum['bc'] = al[1].sub(al[2]).string();
        qNum['abpac'] = al[4].sub(al[5]).string();
    }
    qNum['question'] = '<p>Expand the brackets:</p><p>[$][a]([bc])[$]</p>';
    qNum['answer'] = '<p>[$][a]xx[b]=[ab][$]</p><p>[$][a]xx[c]=[ac][$]</p><p>So the answer is:</p><p>[$][abpac][$]</p>';
    setup(21, qNum);
}makeVars21();