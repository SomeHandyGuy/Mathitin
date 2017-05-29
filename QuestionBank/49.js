function makeVars49() {
    var setSize = randomInt(5, 15), setMin = randomInt(0, 100), setRange = randomInt(5, 10);
    var set = [], freq = [], fMax = 0, fMaxVal = [];
    for (var i = 0; i < setRange; i++)
        freq[setMin + i] = 0;
    for (var i = 0; i < setSize; i++) {
        set[i] = randomInt(setMin, setMin + setRange - 1);
        freq[set[i]]++;
        if (fMax < freq[set[i]])
            fMax++;
    }
    for (var i = 0; i < setRange; i++)
        if (freq[setMin + i] == fMax)
            fMaxVal.push(setMin + i);
    var qNum = {'data': set.toString(), 's': (fMaxVal.length > 1) ? 's are' : ' is', 'mode': fMaxVal.toString()};
    qNum['question'] = '<p>Find the mode of the following data set:</p><p>[data]</p>';
    qNum['answer'] = '<p>The mode[s]: [mode]</p>';
    setup(49, qNum);
}makeVars49();