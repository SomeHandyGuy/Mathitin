function makeVars12() {
    var first = randomInt(0, 1);
    var qNum = {a: randomInt(1, 10), b: randomInt(1, 10), z: '', "$": "`"};
    if (qNum['a'] == qNum['b'])
        qNum['b'] += 1;
    var g = gcd(qNum['a'], qNum['b']);
    qNum['a'] /= g;
    qNum['b'] /= g;
    qNum['c'] = randomInt(5, 30);
    qNum['a+b'] = qNum['a'] + qNum['b'];
    qNum['p'] = qNum['a+b'] * qNum['c'];
    qNum['ac'] = qNum['a'] * qNum['c'];
    qNum['bc'] = qNum['b'] * qNum['c'];
    qNum['question'] = '<p>Divide [p] into the ratio [$][a]:[b][$]</p>';
    qNum['answer'] = '<p>[$][a]+[b]=[a+b][$]</p><br/></p>[$][p]-:[a+b]=[c][$]</p></p>[$][a]xx[c]=[ac][$] and [$][b]xx[c]=[bc][$]</p></p><b>OR</b></p></p>[$][p]xx[a]/[a+b]=[ac][$] and [$][p]xx[b]/[a+b]=[bc][$]</p><br/></p>Answer: [ac] and [bc]</p>';
    setup(12, qNum);
}makeVars12();