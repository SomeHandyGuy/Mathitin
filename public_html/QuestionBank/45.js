function makeVars45() {
    var m = new Fraction(nonZeroRand(-5, 5), nonZeroRand(5, -5));
    var qNum = {'x1': randomInt(-10, 10),
        'y1': randomInt(-10, 10),
        'x2': randomInt(-10, 10),
        'y2': randomInt(-10, 10),
        "$": "`"
    };
    if (qNum['x1'] == qNum['x2'])
        qNum['x2']++;
    if (qNum['y1'] == qNum['y2'])
        qNum['y2']++;
    var m = new Fraction(qNum['y2'] - qNum['y1'], qNum['x2'] - qNum['x1']);
    qNum['m'] = m.string();
    var xmin = Math.min(Math.min(qNum['x1'], qNum['x2']), 0);
    var xmax = Math.max(Math.max(qNum['x1'], qNum['x2']), 0);
    var ymin = Math.min(Math.min(qNum['y1'], qNum['y2']), 0);
    var ymax = Math.max(Math.max(qNum['y1'], qNum['y2']), 0);
    var wide = xmax - xmin;
    var high = ymax - ymin;
    var xstep = Math.ceil((wide + 2) / 8);
    var ystep = Math.ceil((high + 2) / 6.5);
    var xspacing = Math.round(160 / (wide + 2 * xstep));
    var yspacing = Math.round(130 / (high + 2 * ystep));
    var spacing = Math.min(xspacing, yspacing);
    var hfit = Math.round(160 / (spacing));
    var vfit = Math.round((130 / (spacing)));
    var diff = Math.floor(Math.max(hfit - 2 * xstep - wide, 0) / 2);
    xmin -= diff;
    xmax += diff;
    diff = Math.floor(Math.max(vfit - 2 * ystep - high, 0) / 2);
    ymin -= diff;
    ymax += diff;
    var answergraph = new graphit('theanswer', xmin, xmax, ymin, ymax, Math.min(xspacing, yspacing));
    answergraph.xstep = Math.ceil(20 / answergraph.spacing);
    answergraph.ystep = Math.ceil(20 / answergraph.spacing);
    if (answergraph.xstep > 1 || answergraph.ystep > 1)
        answergraph.drawGrid();
    answergraph.lineExtend('answer', qNum['x1'], qNum['y1'], qNum['x2'], qNum['y2']);
    answergraph.dot('p1', qNum['x1'], qNum['y1']);
    answergraph.dot('p2', qNum['x2'], qNum['y2']);
    qNum['graph'] = answergraph.toString();
    var x1 = new Fraction(qNum['x1'], 1);
    var y1 = new Fraction(qNum['y1'], 1);
    var nOne = new Fraction(-1, 1);
    var x = new term();
    x.addSymbol('x', new Fraction(1, 1));
    var y = new term();
    y.addSymbol('y', new Fraction(1, 1));
    var mx1 = new algebra();
    mx1.coef[0] = m;
    mx1.terms[0] = x;
    mx1.coef[1] = x1.mult(nOne).mult(m);
    mx1.terms[1] = new term();
    qNum['mx1'] = mx1.string();
    var yy1 = new algebra();
    yy1.coef[0] = new Fraction(1, 1);
    yy1.terms[0] = y;
    yy1.coef[1] = y1.mult(nOne);
    yy1.terms[1] = new term();
    qNum['yy1'] = yy1.string();
    yy1.coef.splice(0, 1);
    yy1.terms.splice(0, 1);
    var mxb = mx1.sub(yy1);
    qNum['mxb'] = mxb.string();
    qNum['question'] = '<p>What is the equation of the line passing through the points [$]([x1],[y1])[$] and [$]([x2],[y2])[$]?</p>';
    qNum['answer'] = '<p>Using the two-point formula: [$](y-y_1)/(x-x_1)=(y_2-y_1)/(x_2-x_1)[$]</p><p>[$](y- [y1])/(x- [x1])=([y2]-[y1])/([x2]- [x1])=[m][$]<br/>[$][yy1]=[m](x- [x1])=[mx1][$]<br/>[$]y=[mx1][+y1][$]</p><p>[$]y=[mxb][$]</p><p>[graph]</p>';
    setup(45, qNum);
}makeVars45();