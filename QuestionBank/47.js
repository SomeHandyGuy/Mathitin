function makeVars47() {
    var r = randomInt(2, 5), c = randomInt(5, 10), range = randomInt(4, 8), min = randomLowInt(0, 120);
    var freq = new statTable('freqTable', range + 3, 4, true);
    freq.data[0][0] = 'Score';
    freq.data[1][0] = 'Frequency';
    freq.data[2][0] = 'Cumulative</br>Frequency';
    freq.data[3][0] = 'Relative</br>Frequency';
    freq.data[0][range + 2] = 'TOTAL';
    freq.data[1][range + 2] = r * c;
    freq.data[2][range + 2] = '';
    freq.data[3][range + 2] = '100%';
    for (var i = 0; i <= range; i++) {
        freq.data[0][i + 1] = min + i;
        freq.data[1][i + 1] = 0;
    }
    var table = new statTable('dataTable', r, c);
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            var d = randomInt(min, min + range);
            table.data[i][j] = d;
            freq.data[1][d - min + 1]++;
        }
    }
    for (var i = 0; i <= range; i++) {
        if (i == 0)
            freq.data[2][i + 1] = freq.data[1][i + 1];
        else
            freq.data[2][i + 1] = freq.data[1][i + 1] + freq.data[2][i];
        freq.data[3][i + 1] = Math.round(freq.data[1][i + 1] / (r * c) * 100) + '%';
    }
    var working = new statTable('workingTable', 2, 2, true, true);
    working.clear();
    var qNum = {'data': table.toString(), 'table': freq.toString(), 'answerType': working.toNode()};
    qNum['question'] = '<p>Organise the following data into a frequency distribution table:</p><p>[data]</p><p>Put the following columns in your table: frequency, cumulative frequency and relative frequency(%)</p>';
    qNum['answer'] = '<p>[table]</p>';
    setup(47, qNum);
}makeVars47();