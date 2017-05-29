function makeVars46() {
    var m = new Fraction(nonZeroRand(-5, 5), nonZeroRand(5, -5));
    var qNum = {'x1': randomInt(-10, 20), 'y1': randomInt(-10, 20), 'm': m.string(), "$": "`"};
    var xi = qNum['x1'] - qNum['y1'] * m.denominator / m.numerator;
    var yi = qNum['y1'] - m.numerator * qNum['x1'] / m.denominator;
    var xmin = Math.floor(Math.min(xi, 0));
    var xmax = Math.ceil(Math.max(xi, 0));
    var ymin = Math.floor(Math.min(yi, 0));
    var ymax = Math.ceil(Math.max(yi, 0));
    if (xi == 0 && yi == 0) {
        xmin = 0;
        xmax = m.denominator * 2;
        ymin = 0;
        if (m.negative)
            ymax = m.numerator * -2;
        else
            ymax = m.numerator * 2;
    }
    var wide = xmax - xmin;
    var high = ymax - ymin;
    var xstep = Math.ceil((wide + 2) / 12);
    var ystep = Math.ceil((high + 2) / 6.5);
    var xspacing = Math.round(240 / (wide + 2 * xstep));
    var yspacing = Math.round(130 / (high + 2 * ystep));
    var spacing = Math.min(xspacing, yspacing);
    var hfit = Math.round(260 / (spacing));
    var vfit = Math.round((120 / (spacing)));
    var diff = 0;
    if (xmin == 0)
        diff = Math.floor(Math.max(hfit - 2 * xstep - xmax, 0) / 2);
    else
        diff = Math.floor(Math.max(hfit - 2 * xstep + xmin, 0) / 2);
    xmin -= diff;
    xmax += diff;
    if (ymin == 0)
        diff = Math.floor(Math.max(vfit - 2 * ystep - ymax, 0) / 2);
    else
        diff = Math.floor(Math.max(vfit - 2 * ystep + ymin, 0) / 2);
    ymin -= diff;
    ymax += diff;
    var answergraph = new graphit('theanswer', xmin, xmax, ymin, ymax, Math.min(xspacing, yspacing));
    answergraph.xstep = Math.ceil(20 / answergraph.spacing);
    answergraph.ystep = Math.ceil(20 / answergraph.spacing);
    if (answergraph.xstep > 1 || answergraph.ystep > 1)
        answergraph.drawGrid();
    if (xi == 0 && yi == 0)
        answergraph.graphLine('answer', m, yi);
    else
        answergraph.lineExtend('answer', 0, yi, xi, 0);
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
    qNum['question'] = '<p>What is the equation of the line passing through the point [$]([x1],[y1])[$] with a gradient of [$][m][$]?</p>';
    qNum['answer'] = '<p>Using the point-gradient formula: [$]y-y_1=m(x-x_1)[$]</p><p>[$]y- [y1]=[m](x- [x1])[$]<br/>[$][yy1]=[mx1][$]<br/>[$]y=[mx1][+y1][$]</p><p>[$]y=[mxb][$]</p><p>[graph]</p>';
    setup(46, qNum);
}makeVars46();