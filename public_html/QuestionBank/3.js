function makeVars3() {
    var qNum = {b1: Math.floor(Math.random() * 11) + 2,
        i1: Math.floor(Math.random() * 21) - 5, i2: Math.floor(Math.random() * 21) - 5,
        i3: Math.floor(Math.random() * 21) - 5, sym: Math.floor(Math.random() * 2),
        qType: Math.floor(Math.random() * 3),
        bo: '(',
        bc: ')',
        '^1': '^',
        '^2': '^',
        'Explain2': '',
        "$": "`"
    };
    var multiply = true;
    qNum['b2'] = qNum['b1'];
    switch (qNum['sym']) {
        case 0:
            qNum['sym'] = 'xx';
            qNum['i4'] = qNum['i1'] + qNum['i2'];
            qNum['Explain1'] = '[$]' + qNum['i1'] + '+ ' + qNum['i2'] + '=' + qNum['i4'] + '[$],<br/>';
            break;
        case 1:
            qNum['sym'] = '-:';
            multiply = false;
            qNum['i4'] = qNum['i1'] - qNum['i2'];
            qNum['Explain1'] = '[$] ' + qNum['i1'] + '-' + qNum['i2'] + '=' + qNum['i4'] + ' [$],<br/>';
            break;
        default:
            qNum['sym'] = 'oops!';
    }
    switch (qNum['qType']) {
        case 0:
            qNum['i3'] = qNum['^2'] = qNum['bo'] = qNum['bc'] = '';
            qNum['Explain1'] += ' so:';
            break;
        case 1:
            qNum['sym'] = qNum['i2'] = qNum['^1'] = qNum['b2'] = '';
            qNum['i4'] = qNum['i1'] * qNum['i3'];
            qNum['Explain1'] = '[$]' + qNum['i1'] + 'xx' + qNum['i3'] + '=' + qNum['i4'] + '[$],<br/> so';
            break;
        case 2:
            qNum['^2'] = '^';
            qNum['bo'] = '(';
            qNum['bc'] = ')';
            qNum['Explain2'] = '[$]' + qNum['i4'] + 'xx' + qNum['i3'] + '=';
            qNum['Explain1'] += ' and<br/>';
            qNum['i4'] *= qNum['i3'];
            qNum['Explain2'] += qNum['i4'] + '[$],<br/> so';
            qNum['Explain2'] = process(qNum['Explain2'], qNum);
            break;
        default:
            alert('oops qType=' + qNum['qType']);
    }
    if (qNum['i4'] < 0) {
        qNum['='] = '=1/([b1]^' + Math.abs(qNum['i4']) + ')';
        if (Math.pow(qNum['b1'], Math.abs(qNum['i4'])) < 10000)
            qNum['='] += '=1/' + Math.pow(qNum['b1'], Math.abs(qNum['i4']));
    } else {
        qNum['='] = Math.pow(qNum['b1'], qNum['i4']);
        if (qNum['='] > 999999 || qNum['='] < 1)
            qNum['='] = '';
        else
            qNum['='] = '=' + qNum['='];
    }
    qNum['='] = process(qNum['='], qNum);
    qNum['Explain1'] = process(qNum['Explain1'], qNum);
    qNum['question'] = '<p>Simplify the following expression as much as possible:</p><p> [$][bo][b1]^[i1][sym][b2][^1][i2][bc][^2][i3][$]</p><p> Show ALL working.</p>';
    qNum['answer'] = '<p>[Explain1][Explain2]</p><p>[$]=[b1]^[i4][=][$]</p>';
    setup(3, qNum);
}makeVars3();