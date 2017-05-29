function makeVars50() {
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
    var setSize = randomInt(4, 16), setMin = randomInt(0, 100), setRange = randomInt(5, 50);
    var set = [], sortSet = [], card1 = 'th', card2 = 'th', med1, med2, oneMedian = true;
    if (setSize % 2 == 0) {
        med1 = setSize / 2;
        med2 = med1 + 1;
        card1 = cardinalityString(med1);
        card2 = cardinalityString(med2);
        oneMedian = false;
    } else {
        med1 = (setSize + 1) / 2;
        card1 = cardinalityString(sortSet[med1]);
    }
    for (var i = 0; i < setSize; i++)
        set[i] = randomInt(setMin, setMin + setRange - 1);
    sortSet = set.slice().sort(function (a, b) {
        return a - b
    });
    var qNum = {'data': set.toString(), 'sort': sortSet.toString(), 'n': setSize, 'nth': (oneMedian) ? med1 + card1 + ' score' : med1 + card1 + ' & ' + med2 + card2 + ' scores', 'median': (oneMedian) ? sortSet[med1 - 1] : (sortSet[med1 - 1] + sortSet[med2 - 1]) / 2};
    qNum['question'] = '<p>Find the median of the following data set:</p><p>[data]</p>';
    qNum['answer'] = '<p>First sort the data set:</p><p>[sort]</p><p>There are [n] scores so find the [nth]</p><p>The median is: [median]</p>';
    setup(50, qNum);
}makeVars50();