function makeVars1() {
    var qNum = {a: nonZeroRand(-10, 10),
        b: nonZeroRand(-10, 10),
        c: nonZeroRand(-10, 10),
        pm1: randomInt(0, 1),
        pm2: randomInt(0, 1),
        "$": "`"
    };
    if (qNum['pm1']) {
        qNum['pm1'] = '+';
        qNum['pb'] = qNum['b'];
    } else {
        qNum['pm1'] = '-';
        qNum['pb'] = -qNum['b'];
    }
    if (qNum['pm2']) {
        qNum['pm2'] = '+';
        qNum['pc'] = qNum['c'];
    } else {
        qNum['pm2'] = '-';
        qNum['pc'] = -qNum['c'];
    }
    qNum['apb'] = qNum['a'] + qNum['pb'];
    qNum['apbpc'] = qNum['a'] + qNum['pb'] + qNum['pc'];
    qNum['question'] = '<p>Evaluate the following expression:</p><p> [$][a][pm1] [+b][pm2] [+c]=[$]</p><p> Show ALL working.</p>';
    qNum['answer'] = '<p>[$][pm1] [+b]=[pb][$]</p><p>[$][pm2] [+c]=[pc][$]</p><p>So the expression becomes:</p><p>[$][a][+pb][+pc][$]</p><p>Then</p><p>[$][a][+pb]=[apb][$]</p><p>and so</p><p>[$][apb][+pc]=[apbpc][$]</p>';
    setup(1, qNum);
}
makeVars1();