function makeVars11() {
    var types = ['cats', 'dogs', 'men', 'women', 'apples', 'oranges', 'pears', 'pens', 'pencils', 'lollies', 'coins', 'marbles', 'stones', 'eggs'];
    var first = randomInt(0, 1);
    var qNum = {a: randomInt(1, 10), b: randomInt(1, 10), z: '', "$": "`"};
    if (qNum['a'] == qNum['b'])
        qNum['b'] += 1;
    var g = gcd(qNum['a'], qNum['b']);
    qNum['a'] /= g;
    qNum['b'] /= g;
    qNum['thing1'] = types[randomInt(0, types.length - 1)];
    do {
        qNum['thing2'] = types[randomInt(0, types.length - 1)];
    } while (qNum['thing1'] == qNum['thing2']);
    var scale = randomInt(2, 15);
    if (first) {
        qNum['x'] = qNum['p'] = qNum['a'] * scale;
        qNum['y'] = qNum['q'] = qNum['b'] * scale;
        qNum['frac'] = qNum['b'] + '/' + qNum['a'];
        qNum['things1'] = qNum['thing1'];
        qNum['things2'] = qNum['thing2'];
    } else {
        qNum['y'] = qNum['p'] = qNum['b'] * scale;
        qNum['x'] = qNum['q'] = qNum['a'] * scale;
        qNum['frac'] = qNum['a'] + '/' + qNum['b'];
        qNum['things1'] = qNum['thing2'];
        qNum['things2'] = qNum['thing1'];
    }
    qNum['question'] = '<p>The ratio of [thing1] to [thing2] is [$][a]:[b][$]. If there are [p] [things1] then how many [things2] are there?</p>';
    qNum['answer'] = '<p>[$][a]:[b]=[x]:[y][$]</p>';
    setup(11, qNum);
}makeVars11();