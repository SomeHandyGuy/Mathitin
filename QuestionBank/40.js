function makeVars40() {
    var qNum = {'x1': randomInt(-10, 15), 'y1': randomInt(-10, 15), 'x2': randomInt(-10, 15), 'y2': randomInt(-10, 15), "$": "`"};
    var m = new Fraction(qNum['y2'] - qNum['y1'], qNum['x2'] - qNum['x1']);
    qNum['m'] = m.string();
    qNum['question'] = '<p>What is the gradient of the line passing through the points [$]([x1],[y1])[$] and [$]([x2],[y2])[$]?</p>';
    qNum['answer'] = '<p>Using the gradient formula:</p><p>[$]m=(y_2-y_1)/(x_2-x_1)[$]</p><p>We have:</p><p>[$]m=([y2]- [y1])/([x2]- [x1])=[m][$]</p>';
    setup(40, qNum);
}makeVars40();