function makeVars42() {
    var qNum = {'x1': 0, 'y1': randomInt(-5, 5), 'x2': randomInt(1, 5), 'y2': randomInt(-5, 5), "$": "`"};
    while (qNum['y1'] == qNum['y2'])
        qNum['y2'] = randomInt(-5, 5);
    var rise = qNum['y2'] - qNum['y1'];
    var run = qNum['x2'] - qNum['x1'];
    var g = gcd(Math.abs(rise), Math.abs(run));
    if (g != 1) {
        qNum['x2'] = run / g;
        qNum['y2'] = qNum['y1'] + rise / g;
    }
    var m = new Fraction(qNum['y2'] - qNum['y1'], qNum['x2'] - qNum['x1']);
    qNum['m'] = m.string();
    var questionGraph = new graphit('qG', -5, 5, -5, 5, 15);
    var answerGraph = new graphit('aG', -5, 5, -5, 5, 12);
    questionGraph.lineExtend('qline', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y2']);
    answerGraph.lineExtend('aline', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y2']);
    answerGraph.line('rise', qNum['x1'], qNum['y1'], qNum['x1'], qNum['y2']);
    answerGraph.stroke('rise', 'blue');
    answerGraph.line('run', qNum['x1'], qNum['y2'], qNum['x2'], qNum['y2']);
    answerGraph.stroke('run', 'blue');
    answerGraph.dot('intercept', qNum['x1'], qNum['y1']);
    answerGraph.fill('intercept', 'green');
    qNum['qGraph'] = questionGraph.toString();
    qNum['aGraph'] = answerGraph.toString();
    qNum['question'] = '<p>[qGraph]</p><p>What is the equation of the line graphed here?</p>';
    qNum['answer'] = '<p>[aGraph]</p><p>This line has a <span style="color: blue">gradient</span> of [$][m][$] and a <span style="color: green">y-intercept</span> of [$][y1][$].</p><p>Hence its equation is [$]y=[!m]x[+@y1][$]</p>';
    setup(42, qNum);
}makeVars42();