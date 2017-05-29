function makeVars51() {
    var setSize = randomInt(4, 12), setMin = randomInt(0, 100), setRange = randomInt(5, 50);
    var set = [], sum = 0;
    for (var i = 0; i < setSize; i++) {
        set[i] = randomInt(setMin, setMin + setRange - 1);
        sum += set[i];
    }
    var qNum = {'data': set.toString(), 'n': setSize, 'x': sum, 'mean': Math.round(sum * 100 / setSize) / 100};
    qNum['question'] = '<p>Find the mean of the following data set (2dp):</p><p>[data]</p>';
    qNum['answer'] = '<p>There are [n] scores. The sum of the scores is [x]</p><p>The mean is: `[x]/[n]=[mean]` (2dp)</p>';
    setup(51, qNum);
}makeVars51();