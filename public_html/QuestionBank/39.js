function makeVars39() {
    var qNum = {'a': randomLowInt(2, 99),
        'b': randomLowInt(2, 99),
        'c': randomLowInt(2, 99),
        'l': randomInt(2, 12),
        'pm1': '+',
        'pm2': '',
        'md1': 'xx',
        'md2': '',
        'log': '',
        'number': '',
        "$": "`"
    };
    var abc = new Fraction(qNum['a'] * qNum['b'], 1);
    if (randomInt(0, 1)) {
        qNum['pm1'] = '-';
        qNum['md1'] = '-:';
        var abc = new Fraction(qNum['a'], qNum['b']);
    }
    if (randomInt(0, 2) == 0) {
        if (randomInt(0, 1)) {
            qNum['pm2'] = '-';
            qNum['md2'] = '-:';
            var c = new Fraction(qNum['c'], 1);
            abc = abc.div(c);
        } else {
            qNum['pm2'] = '+';
            qNum['md2'] = 'xx';
            var c = new Fraction(qNum['c'], 1);
            abc = abc.mult(c);
        }
        qNum['log'] = 'log_[l]([c])';
    } else
        qNum['c'] = '';
    while (qNum['a'] == 10)
        qNum['a'] = randomInt(2, 12);
    var x = Math.log(qNum['y']) / Math.log(qNum['a']);
    qNum['x'] = Math.round(x * 100000) / 100000 + '(5dp)';
    qNum['abc'] = abc.string();
    var number = abc.numerator / abc.denominator;
    var count = 0;
    while (number / qNum['l'] >= 1) {
        count++;
        if (number / qNum['l'] == 1)
            qNum['number'] = '=' + count;
        number /= qNum['l'];
    }
    qNum['question'] = '<p>Simplify the following:</p><p>[$]log_[l]([a])[pm1]log_[l]([b])[pm2][?log][$]</p>';
    qNum['answer'] = '<p>[$]=log_[l]([a][md1][b][md2][c])=log_[l]([abc])[number][$]</p>';
    setup(39, qNum);
}makeVars39();