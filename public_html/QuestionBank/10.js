function makeVars10() {
    var qType = randomInt(0, 3), g = 0;
    var qNum = {':': '', c: '', z: '', "$": "`"};
    switch (qType) {
        case 0:
            do {
                qNum['a'] = randomInt(2, 20);
                qNum['b'] = randomInt(2, 20);
                g = gcd(qNum['a'], qNum['b']);
            } while (g == 1);
            qNum['x'] = qNum['a'] / g;
            qNum['y'] = qNum['b'] / g;
            break;
        case 1:
            qNum[':'] = ':';
            do {
                qNum['a'] = randomInt(2, 20);
                qNum['b'] = randomInt(2, 20);
                qNum['c'] = randomInt(2, 20);
                g = gcd(qNum['a'], qNum['b']);
                g = gcd(g, qNum['c']);
            } while (g == 1);
            qNum['x'] = qNum['a'] / g;
            qNum['y'] = qNum['b'] / g;
            qNum['z'] = qNum['c'] / g;
            break;
        case 2:
            var units = ['sec', 'min', 'h'];
            var type1 = randomInt(0, 2);
            var type2 = randomInt(0, 2);
            do {
                qNum['a'] = randomInt(1, 40);
                qNum['b'] = randomInt(1, 40);
                g = gcd(qNum['a'] * Math.pow(60, type1), qNum['b'] * Math.pow(60, type2));
            } while (g == 1);
            qNum['x'] = qNum['a'] * Math.pow(60, type1) / g;
            qNum['y'] = qNum['b'] * Math.pow(60, type2) / g;
            qNum['a'] += units[type1];
            qNum['b'] += units[type2];
            break;
        case 3:
            var units = ['mm', 'm', 'km'];
            var type1 = randomInt(0, 2);
            var type2 = randomInt(0, 2);
            do {
                qNum['a'] = randomInt(1, 100);
                qNum['b'] = randomInt(1, 100);
                g = gcd(qNum['a'] * Math.pow(1000, type1), qNum['b'] * Math.pow(1000, type2));
            } while (g == 1);
            qNum['x'] = qNum['a'] * Math.pow(1000, type1) / g;
            qNum['y'] = qNum['b'] * Math.pow(1000, type2) / g;
            qNum['a'] += units[type1];
            qNum['b'] += units[type2];
            break;
    }
    qNum['question'] = '<p>Express the following ratio in its simplest form:</p></p>[$][a]:[b][:][c][$]</p>';
    qNum['answer'] = '<p>[$][x]:[y][:][z][$]</p>';
    setup(10, qNum);
}makeVars10();