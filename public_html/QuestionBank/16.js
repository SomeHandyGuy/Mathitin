function makeVars16() {
    var qNum = {p: randomInt(1, 99), q: randomInt(10, 1000), "$": "`"};
    qNum['dp'] = qNum['p'] / 100;
    qNum['a'] = qNum['q'] * qNum['p'] / 100;
    qNum['question'] = '<p>Find [p]% of [q]</p>';
    qNum['answer'] = '<p><b>Using Decimals:</b></p><p>[$][q]xx[dp]=[a][$]</p>';
    setup(16, qNum);
}makeVars16();