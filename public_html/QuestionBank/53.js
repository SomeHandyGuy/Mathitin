function makeVars53() {
    var dataType = randomInt(0, 2), box, data = [], range = 0, iqr = 0, aTable;
    if (dataType) {
        var min = randomInt(0, 50), max = randomInt(min, min * 10), n = randomInt(5, 10);
        var dMin = 500, dMax = 0, med, q1, q3;
        for (var i = 0; i < n; i++) {
            data[i] = randomInt(min, max);
            if (dMax < data[i])
                dMax = data[i];
            if (data[i] < dMin)
                dMin = data[i];
        }
        range = dMax - dMin;
        sortData = data.slice().sort(function (a, b) {
            return a - b
        });
        if (n % 2 == 0) {
            med = (sortData[n / 2 - 1] + sortData[n / 2]) / 2;
            if (n % 4 == 0) {
                q1 = (sortData[n / 4 - 1] + sortData[n / 4]) / 2;
                q3 = (sortData[n / 4 * 3 - 1] + sortData[n / 4 * 3]) / 2;
            } else {
                q1 = sortData[Math.ceil(n / 4) - 1];
                q3 = sortData[Math.ceil(n / 4 * 3) - 1];
            }
        } else {
            med = sortData[(n + 1) / 2 - 1];
            if ((n - 1) % 4 == 0) {
                q1 = (sortData[(n - 1) / 4 - 1] + sortData[(n - 1) / 4]) / 2;
                q3 = (sortData[(n - 1) / 4 * 3] + sortData[(n - 1) / 4 * 3 + 1]) / 2;
            } else {
                q1 = sortData[Math.ceil(n / 4) - 1];
                q3 = sortData[Math.ceil(n / 4 * 3) - 1];
            }
        }
        iqr = q3 - q1;
        box = boxPlot(dMin, q1, med, q3, dMax);
    } else {
        var min = randomInt(1, 150), n = 0, cf = [0], scores = ['Score'], freq = ['Frequency'];
        range = randomInt(4, 9);
        data = new statTable('data', range + 2, 2, true);
        aTable = new statTable('answer', range + 2, 3, true);
        for (var i = 1; i <= range + 1; i++) {
            scores[i] = min + i;
            freq[i] = randomLowInt(1, 50);
            n += freq[i];
            cf[i] = cf[i - 1] + freq[i];
        }
        cf[0] = 'c.f.';
        data.addData([scores, freq]);
        aTable.addData([scores, freq, cf]);
        var q1 = -1, m = -1, q3 = -1, i = 1;
        while (q3 == -1) {
            if (q1 == -1 && cf[i] >= n / 4)
                q1 = i;
            if (m == -1 && cf[i] >= n / 2)
                m = i;
            if (q3 == -1 && cf[i] >= 3 * n / 4)
                q3 = i;
            i++;
        }
        iqr = scores[q3] - scores[q1];
        box = boxPlot(scores[1], scores[q1], scores[m], scores[q3], scores[range + 1]);
    }
    var d = document.createElement('div');
    d.appendChild(box);
    var qNum = {'data': data.toString(), 'range': range, 'IQR': iqr, 'reorder': (dataType) ? '<p>sorting data first:' + sortData.toString() + '</p>' : '', 'box': d.innerHTML, 'answerTable': (dataType) ? '' : '</br>(using cumulative frequencies)' + aTable.toString()};
    qNum['question'] = '<p>Draw a box and whiskers plot for the following data</p><p>[data]</p><p>State the range and interquartile range.</p>';
    qNum['answer'] = '<p>[reorder][box][answerTable]</p><p>Range = [range], interquartile range = [IQR]</p>';
    setup(53, qNum);
}makeVars53();