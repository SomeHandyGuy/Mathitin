function makeVars41() {
    var qNum = {'x1': randomInt(-5, 5), 'y1': randomInt(-5, 5), 'x2': randomInt(-5, 5), 'y2': randomInt(-5, 5), 'ifneg': '', "$": "`"};
    while (qNum['x1'] == qNum['x2'])
        qNum['x2'] = randomInt(-6, 6);
    while (qNum['y1'] == qNum['y2'])
        qNum['y2'] = randomInt(-6, 6);
    qNum['rise'] = Math.abs(qNum['y2'] - qNum['y1']);
    qNum['run'] = Math.abs(qNum['x2'] - qNum['x1']);
    var m = new Fraction(qNum['y2'] - qNum['y1'], qNum['x2'] - qNum['x1']);
    qNum['m'] = m.string();
    if (m.numerator < 0)
        qNum['ifneg'] = '<br/>Since the line goes downhill, it has a negative gradient';
    var qGraph = new graphit('qG', -6, 6, -6, 6, 20);
    var aGraph = new graphit('aG', -6, 6, -6, 6, 20);
    qGraph.lineExtend('qLine', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y2']);
    aGraph.lineExtend('aLine', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y2']);
    aGraph.line('rise', qNum['x2'], qNum['y1'], qNum['x2'], qNum['y2']);
    aGraph.line('run', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y1']);
    aGraph.stroke('rise', 'blue');
    aGraph.stroke('run', 'blue');
    qNum['qgraph'] = qGraph.toString();
    qNum['agraph'] = aGraph.toString();
    qNum['question'] = '<p>What is the gradient of the line graphed here?</p><p>[qgraph]</p>';
    qNum['answer'] = '[agraph]<p>Using the fact that the line passes through [$]([x1],[y1])[$] and [$]([x2],[y2])[$] we can determine that the rise is [rise] and the run is [run].[ifneg] <br />Hence the gradient is [$][m][$].</p>';
    setup(41, qNum);
}makeVars41();