function makeVars52() {
    cardinalityString = function (int) {
        if (int % 10 == 1)
            return 'st';
        else if (int % 10 == 2)
            return 'nd';
        else if (int % 10 == 3)
            return 'rd';
        else
            return 'th';
    };
    var setMin = randomInt(0, 100), setRange = randomInt(5, 9);
    var scores = [], freq = [], cf = [], fx = [], sum = 0, n = 0, fMax = 0, mode = [], median;
    for (var i = 0; i < setRange; i++) {
        scores[i] = setMin + i;
        freq[i] = randomLowInt(1, 120);
        if (fMax < freq[i]) {
            fMax = freq[i];
            mode = [scores[i]];
        } else if (fMax == freq[i])
            mode.push(scores[i]);
        n += freq[i];
        if (i)
            cf[i] = cf[i - 1] + freq[i];
        else
            cf[i] = freq[i];
        fx[i] = scores[i] * freq[i];
        sum += fx[i];
    }
    var med = Math.ceil((n + 1) / 2), i = 0;
    while (cf[i] < med)
        i++;
    if (n % 2 == 0 && i > 0 && cf[i - 1] == med - 1)
        median = (scores[i] + scores[i - 1]) / 2;
    else
        median = scores[i];
    scores.unshift('Score');
    scores.push('Total:');
    freq.unshift('Frequency');
    freq.push(n);
    cf.unshift('c.f.');
    cf.push('');
    fx.unshift('fx');
    fx.push(sum);
    var data = new statTable('data', setRange + 1, 2, true);
    data.addData([scores, freq]);
    var answer = new statTable('answer', setRange + 2, 4, true);
    answer.addData([scores, freq, cf, fx]);
    var working = new statTable('working', 2, 2, true, true);
    working.clear();
    var qNum = {'data': data.toString(), 'table': answer.toString(), 'n': n, 'sum': sum, 'mode': mode.toString(), 'f': fMax, 'median': median, 'med': (n % 2 == 0) ? (med - 1) + ' &amp; ' + med : med, 'cf': cf[i + 1], 'mean': Math.round(sum * 100 / n) / 100};
    qNum['answerType'] = working.toNode();
    qNum['question'] = '<p>Find the mode, median and mean of the following data set:</p><p>[data]</p>';
    qNum['answer'] = '<p>[table]</p><p>The highest frequency is [f], so the mode is: [mode]</p><p>There are [n] scores, so look for [med] in cf column. The median is [median] (cf=[cf])</p><p>mean`=[sum]/[n]=[mean]` (2dp)</p>';
    setup(52, qNum);
}makeVars52();