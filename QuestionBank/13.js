function makeVars13() {
    var lengths = ['mm', 'cm', 'm', 'km'];
    var weights = ['mg', 'g', 'kg'];
    var times = ['sec', 'min', 'h', 'days', 'weeks', 'months', 'years'];
    var qNum = {a: randomInt(2, 100), b: randomInt(2, 100), "$": "`"};
    var unitType1 = randomInt(0, 2);
    var unitType2;
    do {
        unitType2 = randomInt(0, 2);
    } while (unitType1 == unitType2);
    switch (unitType1) {
        case 0:
            qNum['unit1'] = randomArrayElement(lengths);
            break;
        case 1:
            qNum['unit1'] = randomArrayElement(weights);
            break;
        case 2:
            qNum['unit1'] = randomArrayElement(times);
            break;
    }
    switch (unitType2) {
        case 0:
            qNum['unit2'] = randomArrayElement(lengths);
            break;
        case 1:
            qNum['unit2'] = randomArrayElement(weights);
            break;
        case 2:
            qNum['unit2'] = randomArrayElement(times);
            break;
    }
    qNum['a/b'] = Math.round(qNum['a'] / qNum['b'] * 100) / 100;
    qNum['question'] = '<p>What rate is [a][unit1] every [b][unit2]? <br />(give answer to 2dp)</p>';
    qNum['answer'] = '<p>[$][a]-:[b]=[a/b][$] (2dp)</p><p>so it is [a/b] [unit1]/[unit2]</p>';
    setup(13, qNum);
}makeVars13();