function makeVars8() {
    var start = randomInt(0, 8);
    var stop = randomInt(start + 1, 9);
    var digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var anDigits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var qNum = {pre: randomInt(1, stop - start), type: randomInt(0, 1), number: '', ans: '', "$": "`"};
    var j = 1;
    if (qNum['type']) {
        j = start - 4;
        stop = randomInt(Math.max(start, 6), 9);
        qNum['pre'] = randomInt(Math.max(start - 4, 1), stop - 5);
    }
    var stopper = start + qNum['pre'];
    if (qNum['type'])
        stopper = 5 + qNum['pre'];
    for (var i = start; i <= stop; i++) {
        if (i === start)
            if (start === 0)
                digits[i] = randomInt(1, 8);
            else
                digits[i] = randomInt(1, 9);
        else
            digits[i] = randomInt(0, 9);
        anDigits[i] = digits[i];
    }
    if (digits[stopper] > 4) {
        anDigits[stopper - 1] += 1;
        var n = stopper - 1;
        while (anDigits[n] === 10) {
            anDigits[n] = 0;
            n -= 1;
            anDigits[n] += 1;
        }
    }
    for (var i = stopper; i < 10; i++)
        anDigits[i] = 0;
    if (start > 4) {
        stopper = start;
        if (qNum['type'])
            stopper = 5 + qNum['pre'];
        qNum['number'] = qNum['ans'] = '0.';
        for (var i = 5; i < start; i++) {
            qNum['number'] += '0';
            if (i < stopper)
                qNum['ans'] += '0';
        }
    }
    for (var i = start; i <= stop; i++, j++) {
        if (i === 5 && i != start) {
            qNum['number'] += '.';
            if (j <= qNum['pre'])
                qNum['ans'] += '.';
        }
        qNum['number'] += digits[i];
        if (j <= qNum['pre'])
            qNum['ans'] += anDigits[i];
        else if (qNum['type'] === 0 && i < 5)
            qNum['ans'] += '0';
    }
    if (stop < 4) {
        stopper = 5;
        if (qNum['type'])
            stopper = 5 + qNum['pre'];
        for (var i = stop + 1; i < stopper; i++) {
            if (i == 5)
                qNum['ans'] += '.';
            if (i < 5)
                qNum['number'] += '0';
            qNum['ans'] += '0';
        }
    }
    if (qNum['type']) {
        qNum['rnd'] = '(' + qNum['pre'] + 'dp)';
        qNum['pre'] += ' decimal places.';
    } else {
        qNum['rnd'] = '(' + qNum['pre'] + 'sf)';
        qNum['pre'] += ' significant figures.';
    }
    qNum['question'] = '<p>Round [$][number][$] to [pre]</p>';
    qNum['answer'] = '<p>[$]=[ans][$] [rnd]</p>';
    setup(8, qNum);
}makeVars8();