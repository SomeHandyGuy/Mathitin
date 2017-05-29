function makeVars4() {
    var qNum = {n: Math.floor(Math.random() * 7) + 2,
        brn: Math.floor(Math.random() * 5) + 2,
        First: 'First find',
        ifpow: '<p>Now find [$][brn]^[m][$]</p><p>[$][brn]^[m]=[brnpm][$]</p>',
        rootn: 'root [n]',
        minus: Math.floor(Math.random() * 2),
        ifneg: '',
        "$": "`"
    };
    do {
        qNum['m'] = Math.floor(Math.random() * 1.5 * qNum['n']) + 1;
    } while (qNum['m'] == qNum['n']);
    var g = gcd(qNum['m'], qNum['n']);
    qNum['m'] /= g;
    qNum['n'] /= g;
    qNum['b'] = Math.pow(qNum['brn'], qNum['n']);
    qNum['brnpm'] = Math.pow(qNum['brn'], qNum['m']);
    if (qNum['n'] == 2)
        qNum['rootn'] = 'sqrt';
    if (qNum['m'] == 1) {
        qNum['First'] = 'Find';
        qNum['ifpow'] = qNum['dopow'] = '';
    }
    if (qNum['minus'])
        qNum['minus'] = '';
    else {
        qNum['minus'] = '-';
        qNum['ifneg'] = 'Since the power is negative, the answer is: [$]1/(' + qNum['brnpm'] + ')[$]';
    }
    qNum['question'] = '<p>Simplify the following expression as much as possible:</p><p> [$][b]^([minus][m]/[n])[$]</p><p> Show ALL working.</p>';
    qNum['answer'] = '<p>[First] [$][?rootn]([b])[$]</p><p>[$][?rootn]([b])=[brn][$] <br/>(because [$][brn]^[n]=[b][$])</p>[?ifpow]<p>[?ifneg]</p>';
    setup(4, qNum);
}makeVars4();