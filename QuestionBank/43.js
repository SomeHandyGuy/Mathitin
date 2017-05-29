function makeVars43() {
    var qGraph = new graphit('qGraph', -5, 5, -5, 5, 30);
    var aGraph = new graphit('aGraph', -5, 5, -5, 5, 15);
    var m = new Fraction(nonZeroRand(-5, 5), randomInt(1, 5));
    var qNum = {'b': randomInt(-5, 5), 'm': m.string(), "$": "`"};
    aGraph.lineExtend('line', 0, qNum['b'], m.denominator, qNum['b'] + m.numerator);
    qGraph.text('instructions', -3, -1.5, 'Click and Drag to draw a line');
    qGraph.stroke('instructions', 'grey');
    qNum['qGraph'] = qGraph.toString();
    qNum['aGraph'] = aGraph.toString();
    qGraph.ClickIt = function (X, Y) {
        this.mouseDownX = X;
        this.mouseDownY = Y;
        this.hide('instructions');
        this.dot('dot1', X, Y);
        this.show('dot1');
        this.clicked = true;
    };
    qGraph.DragIt = function (X, Y) {
        if (this.clicked) {
            if (X != this.mouseDownX || Y != this.mouseDownY) {
                this.moved = true;
                this.dot('dot2', X, Y);
                this.lineExtend('line2', this.mouseDownX, this.mouseDownY, X, Y);
            }
        }
    };
    qGraph.SetIt = function (X, Y) {
        this.clicked = false;
        if (this.moved) {
            this.mouseMoveX = this.mouseDownX;
            this.mouseMoveY = this.mouseDownY;
        } else {
            if (this.mouseMoveX)
                this.dot('dot1', this.mouseMoveX, this.mouseMoveY);
            else {
                this.hide('dot1');
                this.show('instructions');
            }
        }
        this.moved = false;
    };
    qNum['answerType'] = qGraph.SVG;
    qNum['question'] = '<p>What would the graph of the line:</p><p>[$]y=[!m]x[+@b][$]</p><p>look like?</p>';
    qNum['answer'] = '[aGraph]';
    setup(43, qNum);
}makeVars43();