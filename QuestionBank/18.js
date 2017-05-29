function makeVars18() {
    var noSquareFactors = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
    var qNum = {"a": "", "xx": "", "so": "", "sbx": randomInt(2, 10), "by": randomArrayElement(noSquareFactors), "$": "`"};
    qNum['bx'] = qNum['sbx'] * qNum['sbx'];
    qNum['b'] = qNum['bx'] * qNum['by'];
    if (randomInt(0, 1)) {
        qNum['a'] = randomInt(2, 15);
        qNum['xx'] = 'xx';
        qNum['asbx'] = qNum['a'] * qNum['sbx'];
        qNum['so'] = '<p>so <br/> [$][a] sqrt([b])=[a][xx] [sbx] sqrt([by])=[asbx] sqrt([by])[$]</p>'
    }
    qNum['question'] = '<p>Simplify the following surd</p><p>[$][a] sqrt([b])[$]</p>';
    qNum['answer'] = '<p>[$]sqrt([b])=sqrt([bx]xx[by])=sqrt([bx])xx sqrt([by])=[sbx] sqrt([by])[$]</p>[?so]';
    setup(18, qNum);
}makeVars18();