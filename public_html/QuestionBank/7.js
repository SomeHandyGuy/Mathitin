function makeVars7() {
    var qNum = {a: nonZeroRand(1, 50),
        b: randomInt(2, 10),
        c: nonZeroRand(1, 50),
        d: randomInt(2, 10),
        sym: randomOp(),
        ifaddsub: '[g] is the lowest common multiple of [b] and [d].</p><p>[$]([a]xx[ap])/([b]xx[ap]) [sym] ([c]xx[cp])/([d]xx[cp])= [ag]/[g] [sym] [cg]/[g]',
        ifcontext: '<p>First convert any Mixed fractions to improper.</p><p>',
        ifcon1: '[$][ab]=[iab][$]',
        ifcon2: '[$][cd]=[icd][$]',
        ifmult: '',
        ifdiv: '',
        ifsimplify: '',
        iraw: '',
        "$": "`"
    };
    var con1 = true;
    var con2 = true;
    if (qNum['c'] < 0 && (qNum['sym'] === '+' || qNum['sym'] === '-'))
        qNum['c'] *= -1;
    var f1 = new Fraction(qNum['a'], qNum['b']);
    var f2 = new Fraction(qNum['c'], qNum['d']);
    qNum['a'] = f1.numerator;
    qNum['b'] = f1.denominator;
    qNum['c'] = f2.numerator;
    qNum['d'] = f2.denominator;
    if (f1.improper == false || f1.whole) {
        con1 = false;
        qNum['ifcon1'] = '';
    }
    if (f2.improper == false || f2.whole) {
        con2 = false;
        qNum['ifcon2'] = '';
    }
    if (con1 == false && con2 == false)
        qNum['ifcontext'] = '';
    if (con1 && con2)
        qNum['ifcon2'] = ' and ' + qNum['ifcon2'];
    qNum['ab'] = f1.improperString();
    qNum['cd'] = f2.improperString();
    qNum['iab'] = f1.string();
    qNum['icd'] = f2.string();
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
            qNum['ifdiv'] = 'Invert and multiply.</p><p>[$][a]/[b]xx[d]/[c]=([a]xx[d])/([b]xx[c])';
            qNum['rawN'] = qNum['a'] * qNum['d'];
            qNum['rawD'] = qNum['b'] * qNum['c'];
            break;
    }
    if (f1.numerator !== qNum['rawN']) {
        var gd = gcd(Math.abs(qNum['rawN']), Math.abs(qNum['rawD']));
        qNum['ifsimplify'] = 'Then simplify: [$]([rawN]-:' + gd + ')/([rawD]-:' + gd + ')=' + f1.string();
        if (f1.improper)
            qNum['ifsimplify'] += '=' + f1.improperString() + '[$]';
        else
            qNum['ifsimplify'] += '[$]';
    } else if (f1.improper)
        qNum['iraw'] = '=' + f1.improperString();
    qNum['question'] = '<p>Evaluate the following expression as a single fraction in its simplest form:</p><p> [$][ab] [sym] [cd][$]</p><p> Show ALL working.</p><p>Do not use a calculator<br/>(except for basic operations [$]+,-,xx,-:[$])</p>';
    qNum['answer'] = '<p>[?ifaddsub][?ifmult][?ifdiv]=[rawN]/[rawD][?iraw][$]</p><p>[?ifsimplify]</p>';
    setup(7, qNum);
}makeVars7();