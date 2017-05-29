function makeVars44() {
    var m = new Fraction(nonZeroRand(-5, 5), nonZeroRand(5, -5));
    var qNum = {'x1': randomInt(-10, 10), 'y1': randomInt(-10, 10), 'p': randomArrayElement(['perpendicular', 'parallel']), "$": "`"};
    var a = randomInt(1, 9);
    var b = nonZeroRand(-9, 9);
    var c = randomInt(-12, 12);
    var l1 = new algebra();
    var x = new term();
    x.addSymbol('x', new Fraction(1, 1));
    var y = new term();
    y.addSymbol('y', new Fraction(1, 1));
    var m1, m2, yi;
    if (randomInt(0, 1)) {
        l1.coef[0] = new Fraction(a, 1);
        l1.terms[0] = x;
        l1.coef[1] = new Fraction(b, 1);
        l1.terms[1] = y;
        l1.coef[2] = new Fraction(c, 1);
        l1.terms[2] = new term();
        qNum['line1'] = l1.string() + '=0';
        m1 = new Fraction(a * -1, b);
        yi = c * -1 / b;
    } else {
        l1.coef[0] = new Fraction(b, a);
        l1.terms[0] = x;
        if (c != 0) {
            l1.coef[1] = new Fraction(c, 1);
            l1.terms[1] = new term();
        }
        qNum['line1'] = 'y=' + l1.string();
        m1 = new Fraction(b, a);
        yi = c;
    }
    qNum['m1'] = m1.string();
    var X = 0, Y = 0;
    if (qNum['p'] == 'perpendicular')
        m2 = new Fraction(m1.denominator * -1, m1.numerator);
    else
        m2 = m1;
    qNum['m2'] = m2.string();
    var l2 = new algebra();
    l2.coef[0] = m2;
    l2.terms[0] = x;
    l2.coef[1] = m2.mult(new Fraction(qNum['x1'] * -1, 1)).add(new Fraction(qNum['y1'], 1));
    l2.terms[1] = new term();
    qNum['line2'] = 'y=' + l2.string();
    var b1 = l2.coef[1].numerator / l2.coef[1].denominator;
    if (qNum['p'] == 'perpendicular') {
        var m1I = m1.numerator / m1.denominator;
        var m2I = m2.numerator / m2.denominator;
        X = (yi - b1) / (m2I - m1I);
        Y = (yi * m2I - b1 * m1I) / (m2I - m1I);
    }
    var ymin = Math.min(qNum['y1'], Y, b1, 0);
    var ymax = Math.max(qNum['y1'], Y, b1, 0);
    var xmin = Math.min(qNum['x1'], X, 0);
    var xmax = Math.max(qNum['x1'], X, 0);
    var wide = xmax - xmin;
    var high = ymax - ymin;
    var canavasX = 400;
    var canvasY = 200;
    var cellSize = 20;
    var xstep = Math.ceil((wide + 2) / canavasX * cellSize);
    var ystep = Math.ceil((high + 2) / canvasY * cellSize);
    var xspacing = Math.round(canavasX / (wide + 2 * xstep));
    var yspacing = Math.round(canvasY / (high + 2 * ystep));
    var spacing = Math.min(xspacing, yspacing);
    var hfit = Math.round(canavasX / (spacing));
    var vfit = Math.round((canvasY / (spacing)));
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
    answergraph.graphLine('line1', m1, yi);
    answergraph.stroke('line1', 'blue');
    answergraph.graphLine('line2', m2, b1);
    answergraph.dot('p1', qNum['x1'], qNum['y1']);
    qNum['diagramAnswerHere'] = answergraph.toString();
    qNum['question'] = '<p>Find the equation of the line that is [p] to the line [$][line1][$] and passes through the point [$]([x1],[y1])[$]</p>';
    qNum['answer'] = '<p>Line <span style="color: blue"> [$][line1][$]</span> has gradient [$][m1][$]. Since we want a line [p] to it, we are looking for a line with gradient [$][m2][$].</p><p>Using the point/gradient formula:<br/> [$]y- [y1]=[m2](x- [x1])[$]</p><p>The equation is [$][line2][$]</p><p>[graph]</p>[diagramAnswerHere]';
    setup(44, qNum);
}makeVars44();