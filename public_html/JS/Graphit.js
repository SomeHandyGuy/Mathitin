
function graphit(id, xmin, xmax, ymin, ymax, spacing) {
    this.NS = "http://www.w3.org/2000/svg";
    this.spacing = spacing;
    this.proportionalSpacing = true;
    this.xspacing = spacing;
    this.yspacing = spacing;
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.id = id;
    this.autoSkip = 10;
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    this.mouseMoveX = 0;
    this.mouseMoveY = 0;
    this.clicked = false;
    this.moved = false;
    this.xstep = 1;
    this.ystep = 1;
    if (document.getElementById(id))
        this.SVG = document.getElementById(id);
    else
        this.SVG = document.createElementNS(this.NS, 'svg');
    this.SVG.setAttribute('version', '1.1');
    this.SVG.setAttribute('id', id);
    this.clickable = true;
    this.drawGrid();
    /*    var def=document.createElementNS(this.NS,'defs');
     this.SVG.appendChild(def);
     var arrowHead=document.createElementNS(this.NS,'marker');
     def.appendChild(arrowHead);
     arrowHead.setAttribute('orient','auto');
     arrowHead.setAttribute('markerHeight',3);
     arrowHead.setAttribute('markerWidth',4);
     arrowHead.setAttribute('markerUnits','strokeWidth');
     arrowHead.setAttribute('refY',5);
     arrowHead.setAttribute('refX',0);
     arrowHead.setAttribute('viewBox',"0 0 10 10");
     arrowHead.setAttribute('id','Triangle');
     var arrowPath=document.createElementNS(this.NS,'path');
     arrowHead.appendChild(arrowPath);
     arrowPath.setAttribute('d','M 0 0 L 10 5 L 0 10 z');*/
}

graphit.prototype.ClickItaBitMore = function (x, y) {
//    alert('c');
}
graphit.prototype.DragIt = function (x, y) {
//    alert('d');
}
graphit.prototype.SetIt = function (x, y) {
//    alert('s');
}


graphit.prototype.drawGrid = function () {
    while (this.SVG.hasChildNodes())
        this.SVG.removeChild(this.SVG.lastChild);
    var xspacing = this.xspacing;
    var yspacing = this.yspacing;
    if (this.proportionalSpacing) {
        xspacing = this.spacing;
        yspacing = this.spacing;
    }
    var xstart = Math.round(this.xmin / this.xstep) * this.xstep;
    var xfinish = Math.round(this.xmax / this.xstep) * this.xstep;
    this.xmin = xstart;
    this.xmax = xfinish;
    var ystart = Math.round(this.ymin / this.ystep) * this.ystep;
    var yfinish = Math.round(this.ymax / this.ystep) * this.ystep;
    this.ymin = ystart;
    this.ymax = yfinish;
    var width = (xfinish - xstart + 2 * this.xstep) * xspacing;
    var height = (yfinish - ystart + 2 * this.ystep) * yspacing;
    this.SVG.setAttribute('width', width);
    this.SVG.setAttribute('height', height);
    var oldpos;

    for (var i = ystart; i <= yfinish; i += this.ystep) {
        var hline = document.createElementNS(this.NS, 'line');
        var vpos = this.localY(i);
        if (oldpos - vpos >= this.autoSkip || i == ystart || i == 0) {
            oldpos = vpos;
            hline.setAttribute('x1', 0);
            hline.setAttribute('y1', vpos);
            hline.setAttribute('x2', width);
            hline.setAttribute('y2', vpos);
            if (i == 0) {
                hline.setAttribute('stroke', 'red');
                hline.setAttribute('stroke-width', '2');
                //    hline.setAttribute('marker-end','url(#Triangle)');
                //   hline.setAttribute('marker-start','url(#Triangle)');
            } else {
                hline.setAttribute('stroke', 'rgb(150,150,150)');
                hline.setAttribute('stroke-width', '1');
                var hlineNumber = document.createElementNS(this.NS, 'text');
                hlineNumber.setAttribute('x', this.localX(0) - 3);
                hlineNumber.setAttribute('y', vpos + 4);
                hlineNumber.setAttribute('font-size', 9);
                hlineNumber.setAttribute('text-anchor', 'end');
                hlineNumber.textContent = i;
                this.SVG.appendChild(hlineNumber);
            }
            this.SVG.appendChild(hline);
        }
    }

    for (var i = xstart; i <= xfinish; i += this.xstep) {
        var vline = document.createElementNS(this.NS, 'line');
        var hpos = this.localX(i);
        if (hpos - oldpos >= this.autoSkip || i == xstart || i == 0) {
            oldpos = hpos;
            vline.setAttribute('y1', 0);
            vline.setAttribute('x1', hpos);
            vline.setAttribute('y2', height);
            vline.setAttribute('x2', hpos);
            this.SVG.appendChild(vline);
            if (i == 0) {
                vline.setAttribute('stroke', 'red');
                vline.setAttribute('stroke-width', '2');
                vline.setAttribute('id', 'vaxis' + this.id);
                //          vline.setAttribute('marker-end','url(#'+this.id+'ArrowHead)');
                //        vline.setAttribute('marker-start','url(#'+this.id+'ArrowHead)');
            } else {
                vline.setAttribute('stroke', 'rgb(150,150,150)');
                vline.setAttribute('stroke-width', '1');
                var vlineNumber = document.createElementNS(this.NS, 'text');
                vlineNumber.setAttribute('y', this.localY(0) + 9);
                vlineNumber.setAttribute('x', hpos - 1);
                vlineNumber.setAttribute('font-size', 9);
                vlineNumber.setAttribute('text-anchor', 'end');
                vlineNumber.textContent = i;
                this.SVG.appendChild(vlineNumber);
            }
        }
    }
    if (this.clickable) {
        for (var x = xstart; x <= xfinish; x += this.xstep) {
            for (var y = xstart; y <= yfinish; y += this.ystep) {
                var block = document.createElementNS(this.NS, 'rect')
                block.setAttribute('x', this.localX(x) - xspacing / 2);
                block.setAttribute('y', this.localY(y) - yspacing / 2);
                block.setAttribute('width', xspacing);
                block.setAttribute('height', yspacing);
                block.setAttribute('opacity', '0');
                block.setAttribute('id', x + 'b' + y);
                var ref = block;

                function makeXYlocal(targetBlock, overGraph, event, x, y) {
                    //sometimes javascript REALLY infuriates me!!
                    targetBlock.addEventListener(event, function () {
                        overGraph.blockClick(event, x, y);
                    }, false);
                }
                makeXYlocal(block, this, 'mousedown', x, y);
                makeXYlocal(block, this, 'mousemove', x, y);
                makeXYlocal(block, this, 'mouseup', x, y);
                makeXYlocal(block, this, 'touchstart', x, y);
                makeXYlocal(block, this, 'touchmove', x, y);
                makeXYlocal(block, this, 'touchend', x, y);
                this.SVG.appendChild(block);
            }
        }
    }
}

graphit.prototype.localX = function (x) {
    if (this.proportionalSpacing)
        return this.spacing * (x - this.xmin + this.xstep);
    else
        return this.xspacing * (x - this.xmin + this.xstep);
}

graphit.prototype.localY = function (y) {
    if (this.proportionalSpacing)
        return this.spacing * (this.ymax + this.ystep - y);
    else
        return this.yspacing * (this.ymax + this.ystep - y);
}

graphit.prototype.blockClick = function (event, x, y)
{
    switch (event) {
        case('touchstart'):
        case('mousedown'):
            this.ClickIt(x, y);
            break;
        case('touchmove'):
        case('mousemove'):
            this.DragIt(x, y);
            break;
        case('touchend'):
        case('mouseup'):
            this.SetIt(x, y);
            break;
    }
}


graphit.prototype.embed = function (id) {
    document.getElementById(id).appendChild(this.SVG);
}

graphit.prototype.toString = function () {
    var tmp = document.createElement('div');
    tmp.appendChild(this.SVG);
    return tmp.innerHTML;
}

graphit.prototype.getElementById = function (id) {
    var search = this.SVG.firstChild;
    while (search.id != id && search.nextSibling)
        search = search.nextSibling;
    if (search.id == id)
        return search;
    else
        return null;
}

graphit.prototype.insertElement = function (el) {
    var grid = this.SVG.getElementsByTagName("line");
    if (grid[grid.length - 1].nextSibling)
        this.SVG.insertBefore(el, grid[grid.length - 1].nextSibling);
    else
        this.SVG.appendChild(el);
}

graphit.prototype.line = function (id, x1, y1, x2, y2) {
    var line = document.getElementById(id);
    if (line == null) {
        line = document.createElementNS(this.NS, 'line');
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('id', id);
        this.insertElement(line);
    }
    line.setAttribute('x1', this.localX(x1));
    line.setAttribute('y1', this.localY(y1));
    line.setAttribute('x2', this.localX(x2));
    line.setAttribute('y2', this.localY(y2));
}

/*
 graphit.prototype.arrow=function(id){
 document.getElementById(id).setAttribute('marker-end','url(#'+this.id+'ArrowHead)');
 }

 graphit.prototype.arrowDouble=function(id){
 document.getElementById(id).setAttribute('marker-end','url(#'+this.id+'ArrowHead)');
 document.getElementById(id).setAttribute('marker-start','url(#'+this.id+'ArrowHead)');
 }
 */

graphit.prototype.lineExtend = function (id, x1, y1, x2, y2) {
    var m = (y2 - y1) / (x2 - x1);
    var X1, Y1, X2, Y2;
    if (Math.abs(m) > 1) {
        Y1 = this.ymin - this.ystep;
        Y2 = this.ymax + this.ystep;
        X1 = (Y1 - y1) / m + x1;
        X2 = (Y2 - y1) / m + x1;
    } else {
        X1 = this.xmin - this.xstep;
        X2 = this.xmax + this.xstep;
        Y1 = m * (X1 - x1) + y1;
        Y2 = m * (X2 - x1) + y1;
    }
    this.line(id, X1, Y1, X2, Y2);
}

graphit.prototype.graphLine = function (id, gradient, intercept) {
    if (typeof gradient == 'number')
        this.lineExtend(id, 0, intercept, 1, intercept + gradient);
    else if (gradient instanceof Fraction)
        this.lineExtend(id, 0, intercept, gradient.denominator, intercept + gradient.numerator);
}

graphit.prototype.dot = function (id, x1, y1) {
    var dot = document.getElementById(id);
    if (dot == null) {
        dot = document.createElementNS(this.NS, 'circle');
        dot.setAttribute('fill', 'black');
        dot.setAttribute('r', 4);
        dot.setAttribute('id', id);
        this.insertElement(dot);
    }
    dot.setAttribute('cx', this.localX(x1));
    dot.setAttribute('cy', this.localY(y1));
}

graphit.prototype.parabolaVI = function (id, vX, vY, iY) {
    if (vY != iY && vX != 0) {
        var A = (iY - vY) / (vX * vX);
        var B = -2 * (iY - vY) / vX;
        this.parabolaFormula(id, A, B, iY);
    }
}

graphit.prototype.parabolaFormula = function (id, a, b, c) {
    if (a != 0) {
        var X1, Y1, CX, CY, X2;
        if (a > 0)
            Y1 = this.ymax + this.ystep;
        else
            Y1 = this.ymin - this.ystep;
        var d = b * b - 4 * a * (c - Y1);
        if (d >= 0) {
            X1 = (-b + Math.sqrt(d)) / (2 * a);
            X2 = (-b - Math.sqrt(d)) / (2 * a);
            CX = (X1 + X2) / 2;
            CY = 2 * (c - b * b / 4 / a) - Y1;
            var parabola = document.getElementById(id);
            if (parabola == null) {
                parabola = document.createElementNS(this.NS, 'path');
                parabola.setAttribute('stroke', 'black');
                parabola.setAttribute('stroke-width', '2');
                parabola.setAttribute('fill', 'none');
                parabola.setAttribute('id', id);
                this.insertElement(parabola);
            }
            parabola.setAttribute('d', 'M ' + this.localX(X1) + ' ' + this.localY(Y1) + ' Q ' + this.localX(CX) + ' ' + this.localY(CY) + ' ' + this.localX(X2) + ' ' + this.localY(Y1));
        }
    }
}

graphit.prototype.text = function (id, x1, y1, txt) {
    var text = document.getElementById(id);
    if (text == null) {
        text = document.createElementNS(this.NS, 'text');
        text.setAttribute('id', id);
        this.insertElement(text);
    }
    text.setAttribute('x', this.localX(x1));
    text.setAttribute('y', this.localY(y1));
    text.textContent = txt;
}

graphit.prototype.stroke = function (id, stroke) {
    this.getElementById(id).setAttribute('stroke', stroke);
}

graphit.prototype.fill = function (id, fill) {
    this.getElementById(id).setAttribute('fill', fill);
}

graphit.prototype.hide = function (id) {
    this.getElementById(id).setAttribute('visibility', 'hidden');
}

graphit.prototype.show = function (id) {
    this.getElementById(id).setAttribute('visibility', 'visible');
}

graphit.prototype.off = function (id) {
    this.getElementById(id).setAttribute('display', 'none');
}

graphit.prototype.on = function (id) {
    this.getElementById(id).setAttribute('display', 'inline');
}