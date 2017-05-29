function makeVars2() {
    var qNum = {a: new Fraction(nonZeroRand(-10, 10), 1),
        b: new Fraction(nonZeroRand(-10, 10), 1),
        c: new Fraction(nonZeroRand(-10, 10), 1),
        d: new Fraction(nonZeroRand(-10, 10), 1),
        sym1: randomOp(),
        sym2: randomOp(),
        sym3: randomOp(),
        quest: Math.floor(Math.random() * 6),
        bo1: '',
        bo2: '',
        bc1: '',
        bc2: '',
        "$": "`"
    };
    var nobrackets = true;
    function isMult(test) {
        if (test == 'xx' || test == '-:')
            return true;
        else
            return false;
    }
    function doMathOp(sym, a, b) {
        switch (sym) {
            case 'xx':
                return a.mult(b);
            case '-:':
                return a.div(b);
            case '+':
                return a.add(b);
            case '-':
                return a.sub(b);
        }
    }
    var doFirst = 0;
    switch (qNum['quest']) {
        case 0:
            qNum['quest'] = process('[a][sym1] [b][sym2] [c][sym3] [d]', qNum);
            if (isMult(qNum['sym1']) || (!isMult(qNum['sym1']) && !isMult(qNum['sym2']) && !isMult(qNum['sym3'])))
                doFirst = 1;
            else if (isMult(qNum['sym2']))
                doFirst = 2;
            else
                doFirst = 3;
            break;
        case 1:
            qNum['quest'] = process('([a][sym1] [b])[sym2]([c][sym3] [d])', qNum);
            doFirst = 1;
            nobrackets = false;
            qNum['bo2'] = '(';
            qNum['bc2'] = ')';
            break;
        case 2:
            qNum['quest'] = process('([a][sym1] [b])[sym2] [c][sym3] [d]', qNum);
            doFirst = 1;
            break;
        case 3:
            qNum['quest'] = process('[a][sym1] [b][sym2]([c][sym3] [d])', qNum);
            doFirst = 3;
            break;
        case 4:
            qNum['quest'] = process('([a][sym1] [b][sym2] [c])[sym3] [d]', qNum);
            nobrackets = false;
            qNum['bo1'] = '(';
            qNum['bc1'] = ')';
            if (isMult(qNum['sym1']) || (!isMult(qNum['sym1']) && !isMult(qNum['sym2'])))
                doFirst = 1;
            else
                doFirst = 2;
            break;
        case 5:
            qNum['quest'] = process('[a][sym1]([b][sym2] [c][sym3] [d])', qNum);
            nobrackets = false;
            qNum['bo2'] = '(';
            qNum['bc2'] = ')';
            if (isMult(qNum['sym2']) || (!isMult(qNum['sym2']) && !isMult(qNum['sym3'])))
                doFirst = 2;
            else
                doFirst = 3;
            break;
        default:
            qNum['quest'] = 'oops!';
    }
    switch (doFirst) {
        case 1:
            qNum['sym4'] = qNum['sym1'];
            qNum['e'] = qNum['a'];
            qNum['f'] = qNum['b'];
            qNum['h'] = qNum['g'] = doMathOp(qNum['sym1'], qNum['a'], qNum['b']);
            qNum['i'] = qNum['c'];
            qNum['j'] = qNum['d'];
            qNum['sym5'] = qNum['sym2'];
            qNum['sym6'] = qNum['sym3'];
            break;
        case 2:
            qNum['sym4'] = qNum['sym2'];
            qNum['e'] = qNum['b'];
            qNum['f'] = qNum['c'];
            qNum['i'] = qNum['g'] = doMathOp(qNum['sym2'], qNum['b'], qNum['c']);
            qNum['h'] = qNum['a'];
            qNum['j'] = qNum['d'];
            qNum['sym5'] = qNum['sym1'];
            qNum['sym6'] = qNum['sym3'];
            break;
        case 3:
            qNum['sym4'] = qNum['sym3'];
            qNum['e'] = qNum['c'];
            qNum['f'] = qNum['d'];
            qNum['j'] = qNum['g'] = doMathOp(qNum['sym3'], qNum['c'], qNum['d']);
            qNum['h'] = qNum['a'];
            qNum['i'] = qNum['b'];
            qNum['sym5'] = qNum['sym1'];
            qNum['sym6'] = qNum['sym2'];
            break;
        default:
            qNum['quest'] = 'oops!';
    }
    if (qNum['bo2'] || (nobrackets && isMult(qNum['sym6']) && !isMult(qNum['sym5']))) {
        qNum['k'] = qNum['i'];
        qNum['l'] = qNum['j'];
        qNum['sym7'] = qNum['sym6'];
        qNum['o'] = qNum['m'] = doMathOp(qNum['sym6'], qNum['i'], qNum['j']);
        qNum['n'] = qNum['h'];
        qNum['sym8'] = qNum['sym5'];
    } else {
        qNum['k'] = qNum['h'];
        qNum['l'] = qNum['i'];
        qNum['sym7'] = qNum['sym5'];
        qNum['n'] = qNum['m'] = doMathOp(qNum['sym5'], qNum['h'], qNum['i']);
        qNum['o'] = qNum['j'];
        qNum['sym8'] = qNum['sym6'];
    }
    if (qNum['sym8'] == 'xx')
        qNum['p'] = qNum['n'].mult(qNum['o']);
    else if (qNum['sym8'] == '-:')
        qNum['p'] = qNum['n'].div(qNum['o']);
    else if (qNum['sym8'] == '+')
        qNum['p'] = qNum['n'].add(qNum['o']);
    else
        qNum['p'] = qNum['n'].sub(qNum['o']);
    if (qNum['p'].string() != qNum['p'].improperString())
        qNum['p'] = qNum['p'].string() + '=' + qNum['p'].improperString();
    else
        qNum['p'] = qNum['p'].string();
    qNum['question'] = '<p>Evaluate the following expression:</p><p>[$][quest]=[$]</p><p> Show ALL working.</p>';
    qNum['answer'] = '<p>First do [$][e][sym4] [f]=[g][$]</p><p>Then we have [$][bo1][h][sym5] [bo2][i][bc1][sym6] [j][bc2][$]</p><p>Next do [$][k][sym7] [l]=[m][$]</p><p>and we have [$][n][sym8] [o]=[p][$]</p>';
    setup(2, qNum);
}
makeVars2();