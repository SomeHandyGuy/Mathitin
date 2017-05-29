function makeVars17() {
    var qNum = {p: randomInt(1, 50), q: randomInt(10, 1000), crease: randomArrayElement(['increase', 'decrease']), "$": "`"};
    if (qNum['crease'] == 'increase') {
        qNum['lp'] = qNum['p'] + 100;
        qNum['dp'] = 1 + qNum['p'] / 100;
    } else {
        qNum['lp'] = 100 - qNum['p'];
        qNum['dp'] = 1 - qNum['p'] / 100;
    }
    qNum['a'] = qNum['q'] * qNum['lp'] / 100;
    qNum['question'] = '<p>[crease] [q] by [p]%</p>';
    qNum['answer'] = '<p>In other words: Find [lp]% of [q]</p><p><b>Using Decimals:</b></p><p>[$][q]xx[dp]=[a][$]</p>';
    setup(17, qNum);
}makeVars17();