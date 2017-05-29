function makeVars15() {
    var units = [['mm', 'm', 'km'], ['mg', 'g', 'kg'], ['ml', 'l'], ['s', 'min', 'h'], ['\\text{inch}', 'ft']];
    var scale = [1000, 1000, 1000, 60, 12];
    var uType1 = randomInt(0, units.length - 1);
    var uType2 = randomInt(0, units.length - 1);
    while (uType1 == uType2)
        uType2 = randomInt(0, units.length - 1);
    var unit1 = units[uType1];
    var unit2 = units[uType2];
    var u1, u2, u3, u4;
    do {
        u1 = randomInt(0, unit1.length - 1);
        u2 = randomInt(0, unit2.length - 1);
        u3 = randomInt(0, unit1.length - 1);
        u4 = randomInt(0, unit2.length - 1);
    } while (u1 == u3 && u2 == u4);
    var qNum = {
        r: new Fraction(randomInt(10, 100), 1),
        unit1: unit1[u1],
        unit2: unit2[u2],
        unit3: unit1[u3],
        unit4: unit2[u4],
        ifc1: 'To convert from [$][unit1][$] to [$][unit3][$], we [$][multdivp][$] by [p]</p></p>[$][r][$] [$][unit1][$]/[$][unit2]=[rp][$] [$][unit3][$]/[$][unit2][$]',
        ifc2: 'To convert from [$][unit2][$] to [$][unit4][$], we [$][multdivq][$] by [q]</p></p>[$][rp][$] [$][unit3][$]/[$][unit2]=[rq][$] [$][unit3][$]/[$][unit4][$]',
        "$": "`"
    };
    if (u1 > u3)
        qNum['multdivp'] = 'xx';
    else if (u1 < u3)
        qNum['multdivp'] = '-:';
    else
        qNum['ifc1'] = '';
    if (u2 < u4)
        qNum['multdivq'] = 'xx';
    else if (u2 > u4)
        qNum['multdivq'] = '-:';
    else
        qNum['ifc2'] = '';
    qNum['p'] = new Fraction(Math.pow(scale[uType1], u1 - u3), 1);
    qNum['q'] = new Fraction(Math.pow(scale[uType2], u4 - u2), 1);
    qNum['rp'] = qNum['r'].mult(qNum['p']).decimal();
    qNum['rq'] = qNum['r'].mult(qNum['p']).mult(qNum['q']).decimal();
    qNum['p'] = Math.pow(scale[uType1], Math.abs(u1 - u3));
    qNum['q'] = Math.pow(scale[uType2], Math.abs(u4 - u2));
    qNum['question'] = '<p>Convert the following rate:</p><p>[$][r][$] [$][unit1][$]/[$][unit2][$]</p><p>into</p><p>[$][unit3][$]/[$][unit4][$]</p>';
    qNum['answer'] = '<p>[?ifc1]</p>';
    setup(15, qNum);
}makeVars15();