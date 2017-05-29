function makeVars6() {
    var qNum = {a: nonZeroRand(-12, 15),
        b: randomInt(2, 20),
        c: nonZeroRand(-12, 15),
        d: randomInt(2, 20),
        sym: randomOp(),
        ifaddsub: 'First find a common denominator</p><p>[g] is the lowest common multiple of [b] and [d].</p><p>[$]([a]xx[ap])/([b]xx[ap]) [sym] ([c]xx[cp])/([d]xx[cp])= [ag]/[g] [sym] [cg]/[g]',
        ifmult: '',
        ifdiv: '',
        ifsimplify: '',
        "$": "`"
    };
    if (qNum['c'] < 0 && (qNum['sym'] === '+' || qNum['sym'] === '-'))
        qNum['c'] *= -1;
    var f1 = new Fraction(qNum['a'], qNum['b']);
    var f2 = new Fraction(qNum['c'], qNum['d']);
    qNum['a'] = f1.numerator;
    qNum['b'] = f1.denominator;
    qNum['c'] = f2.numerator;
    qNum['d'] = f2.denominator;
    qNum['ab'] = f1.string();
    qNum['cd'] = f2.string();
    qNum['g'] = lcm(qNum['b'], qNum['d']);
    qNum['ap'] = qNum['g'] / qNum['b'];
    qNum['cp'] = qNum['g'] / qNum['d'];
    qNum['ag'] = qNum['a'] * qNum['ap'];
    qNum['cg'] = qNum['c'] * qNum['cp'];
    switch (qNum['sym']) {
        case '+':
            f1 = f1.add(f2);
            qNum['rawN'] = qNum['ag'] + qNum['cg'];
            qNum['rawD'] = qNum['g'];
            if (qNum['b'] === qNum['d'])
                qNum['ifaddsub'] = 'The denominators are the same, so add their numerators.</p><p>[$][a]/[b] [sym] [c]/[d]';
            break;
        case '-':
            f1 = f1.sub(f2);
            qNum['rawN'] = qNum['ag'] - qNum['cg'];
            qNum['rawD'] = qNum['g'];
            if (qNum['b'] === qNum['d'])
                qNum['ifaddsub'] = 'The denominators are the same, so subtract their numerators.</p><p>[$][a]/[b] [sym] [c]/[d]';
            break;
        case 'xx':
            f1 = f1.mult(f2);
            qNum['ifaddsub'] = '';
            qNum['ifmult'] = 'Multiply the numerators then the denominators.</p><p>[$]([a]xx[c])/([b]xx[d])';
            qNum['rawN'] = qNum['a'] * qNum['c'];
            qNum['rawD'] = qNum['b'] * qNum['d'];
            break;
        case '-:':
            f1 = f1.div(f2);
            qNum['ifaddsub'] = '';
            qNum['ifdiv'] = 'First, invert the second fraction,<br/> then multiply the numerators then the denominators.</p><p>[$][a]/[b]xx[d]/[c]=([a]xx[d])/([b]xx[c])';
            qNum['rawN'] = qNum['a'] * qNum['d'];
            qNum['rawD'] = qNum['b'] * qNum['c'];
            break;
    }
    if (f1.numerator !== qNum['rawN']) {
        var gd = gcd(Math.abs(qNum['rawN']), Math.abs(qNum['rawD']));
        qNum['ifsimplify'] = 'Then simplify:</p><p>[$]([rawN]-:' + gd + ')/([rawD]-:' + gd + ')=' + f1.string() + '[$]';
    }
    qNum['question'] = '<p>Evaluate the following expression as a single fraction in its simplest form:</p><p> [$][ab] [sym] [cd][$]</p><p> Show ALL working.</p><p>Do not use a calculator<br/>(except for basic operations [$]+,-,xx,-:[$])</p>';
    qNum['answer'] = '<p>[?ifaddsub][?ifmult][?ifdiv]=[rawN]/[rawD][$]</p><p>[?ifsimplify]</p>';
    setup(6, qNum);
}makeVars6();