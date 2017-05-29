function makeVars14() {
    var objects = ['A car travels at a speed of', 'Water is flowing at a rate of', 'A tree grows at a rate of', 'The density of a substance is', 'Fruit at the super market costs'];
    var will1 = ['How long will it take to travel', 'How long will it take to fill', 'How long will it take to grow', 'What volume will be occupied by', 'What weight of fruit will cost'];
    var will2 = ['How far will it travel in', 'How many litres will flow in', 'How high will it grow in', 'What is the weight of', 'What is the cost of'];
    var u1 = ['km', 'L', 'mm', 'kg', '$'];
    var u2 = ['h', 's', 'day', 'm^3', 'kg'];
    var s1 = ['', '', '', '', ''];
    var s2 = ['', '', 's', '', ''];
    var r1 = [10, 2, 10, 1, 1];
    var r2 = [120, 20, 100, 5, 20];
    var qType = randomInt(0, objects.length - 1);
    var uType = randomInt(0, 1);
    var qNum = {r: randomInt(r1[qType], r2[qType]), p: randomInt(2, 100), object: objects[qType], unit1: u1[qType], unit2: u2[qType], n: '', "$": "`"};
    if (uType) {
        qNum['will'] = will1[qType];
        qNum['unit3'] = u1[qType];
        qNum['unit4'] = u2[qType];
        qNum['multdiv'] = '-:';
        qNum['q'] = Math.round(qNum['p'] / qNum['r'] * 100) / 100;
        qNum['s'] = s1[qType];
        qNum['ss'] = s2[qType];
    } else {
        qNum['will'] = will2[qType];
        qNum['unit3'] = u2[qType];
        qNum['unit4'] = u1[qType];
        qNum['multdiv'] = 'xx';
        qNum['q'] = Math.round(qNum['p'] * qNum['r'] * 100) / 100;
        qNum['s'] = s2[qType];
        qNum['ss'] = s1[qType];
    }
    if (qNum['q'] % 1 == 0)
        qNum['q'] += '.00';
    qNum['question'] = '<p>[object] [r] [$][unit1][$]/[$][unit2][$].[will] [p] [$][unit3][s][$]?</p><p>Give your answer as a decimal to 2 dp.</p>';
    qNum['answer'] = '<p>Since we are finding an amount of [$][unit3][s][$], we [$][multdiv][$] by the rate.</p><p>[$][p][multdiv][r]=[q][unit4][ss][$] (2dp)</p>';
    setup(14, qNum);
}makeVars14();