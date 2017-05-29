function makeVars19() {
    var qNum = {simplify: '[$]', answer1: '', answer2: '', "$": "`"};
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var noTerms = randomInt(2, 6);
    var noTypes = randomInt(1, noTerms - 1);
    var types = new Array(noTypes);
    var termType = new Array(noTerms);
    var coef = new Array(noTerms);
    var countTypes = new Array(noTypes);
    var totalTypes = new Array(noTypes);
    var answerStrings = new Array(noTypes);
    for (var i = 0; i < noTypes; i++) {
        countTypes[i] = 0;
        totalTypes[i] = 0;
        answerStrings[i] = '';
        var noPr = randomInt(1, 3);
        var l1 = randomInt(0, pronumeral.length - 1);
        var l2 = randomInt(l1, pronumeral.length - 1);
        var l3 = randomInt(l2, pronumeral.length - 1);
        types[i] = pronumeral[l1];
        if (noPr == 3 && l1 == l2 && l2 == l3)
            types[i] += '^3';
        else if (noPr > 1 && l1 == l2) {
            types[i] += '^2';
            types[i] += ' ' + pronumeral[l3];
        } else if (noPr > 1) {
            types[i] += ' ' + pronumeral[l2];
            if (noPr == 3 && l2 == l3)
                types[i] += '^2';
            else if (noPr == 3)
                types[i] += ' ' + pronumeral[l3];
        }
        if (i > 0 && types[i] == types[i - 1])
            i--;
        else if (i > 1 && types[i] == types[i - 2])
            i--;
        else if (i > 2 && types[i] == types[i - 3])
            i--;
        else if (i > 3 && types[i] == types[i - 4])
            i--;
    }
    for (var i = 0; i < noTerms; i++) {
        coef[i] = randomInt(1, 9);
        var c = coef[i];
        if (coef[i] == 1)
            c = '';
        if (randomInt(0, 1)) {
            if (i)
                c = '+' + c;
        } else {
            c = '-' + c;
            coef[i] *= -1;
        }
        var thisType = randomInt(0, types.length - 1);
        termType[i] = thisType;
        qNum['simplify'] += ' ' + c + types[thisType];
    }
    qNum['simplify'] += '[$]';
    for (var i = 0; i < noTerms; i++) {
        countTypes[termType[i]] += 1;
        totalTypes[termType[i]] += coef[i];
        if (answerStrings[termType[i]] == '' || coef[i] < 0)
            answerStrings[termType[i]] += coef[i];
        else
            answerStrings[termType[i]] += '+ ' + coef[i];
    }
    for (var i = 0; i < noTypes; i++) {
        if (countTypes[i] > 1) {
            var t = totalTypes[i];
            if (t == 1)
                t = '';
            else if (t == -1)
                t = '-';
            qNum['answer1'] += 'There are ' + countTypes[i] + ' of the [$]' + types[i] + '[$] terms.<br/> Since [$]' + answerStrings[i] + '=' + totalTypes[i] + '[$], these terms become [$]' + t + types[i];
            if (totalTypes[i] == 0) {
                qNum['answer1'] += '=0';
            }
            qNum['answer1'] += '[$].</p>';
        }
    }
    qNum['answer1'] += '</p>So the answer is:<br/>[$]';
    for (var i = 0; i < noTypes; i++) {
        var t = totalTypes[i];
        if (t == 1)
            t = '';
        else if (t == -1)
            t = '-';
        if (totalTypes[i] > 0 && qNum['answer2'] != '')
            qNum['answer2'] += '+' + t + types[i];
        else if (totalTypes[i] != 0)
            qNum['answer2'] += t + types[i];
    }
    if (qNum['answer2'] == '')
        qNum['answer2'] = '0';
    qNum['answer2'] += '[$]';
    qNum['question'] = '<p>Simplify the following expression:</p><p>[?simplify]</p>';
    qNum['answer'] = '<p>[?answer1][?answer2]</p>';
    setup(19, qNum);
}makeVars19();