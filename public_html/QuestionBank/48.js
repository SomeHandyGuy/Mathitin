function makeVars48() {
    var min = randomInt(1, 150),
            scores = ['Score'],
            freq = ['Frequency'],
            range = randomInt(5, 9),
            niceScale = [1, 2, 5, 10, 20, 50, 100],
            p = 0,
            fMax = 0,
            sum = 0;
    var isCumulative = randomInt(0, 1),
            isPolygon = randomInt(0, 1);
    var data = new statTable('data', range + 1, 2, true);
    for (var i = 1; i <= range; i++) {
        scores[i] = min + i;
        freq[i] = randomLowInt(1, 50);
        sum += freq[i];
        if (fMax < freq[i])
            fMax = freq[i];
    }
    data.addData([scores, freq]);
    var h = new histogram('chart', scores[1], scores[range], 1, freq.slice(1));
    if (isPolygon)
        h.setPolygon(true);
    if (isCumulative) {
        h.setCumulative(true);
        while (p < niceScale.length - 1 && sum / niceScale[p] > 15)
            p++;
    } else {
        while (p < niceScale.length - 1 && fMax / niceScale[p] > 15)
            p++;
    }
    h.fScale = niceScale[p];
    h.draw();
    var qNum = {'cumulative': (isCumulative) ? '<u>cumulative</u> ' : '', 'histogram': (isPolygon) ? 'polygon' : 'histogram', 'data': data.toString(), 'chart': h.toString()};
    qNum['question'] = '<p>Draw a [cumulative] frequency <b>[histogram]</b> for the following data:</p><p>[data]</p>';
    qNum['answer'] = '<p>[chart]</p>';
    setup(48, qNum);
}makeVars48();