//-----------------
// // tables Object
//-----------------

function statTable(id, rows, cols, isStatTable, isEditable) {
    this.id = id;
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(cols);
    for (var i = 0; i < cols; i++) {
        this.data[i] = new Array(rows);
    }
    if (isStatTable) {
        this.class = 'frequencyTable';
        this.header = true;
    }
    else {
        this.class = 'plaintable';
        this.header = false;
    }
    if (isEditable)
        this.editable = true;
    else
        this.editable = false;
}

childSearch = function(id, tagName) {
    if (typeof id == 'string')
        id = document.getElementById(id);
    while (id.tagName != tagName && id.hasChildNodes())
        id = id.firstChild;
    return (id.tagName == tagName) ? id : false;
}

statTable.prototype.absorbTable = function(id) {
    if (typeof id == 'string')
        id = document.getElementById(id);
    id = childSearch(id, 'TABLE');
    if (id.hasAttribute('class'))
        this.class = id.className;
    if (id) {
        var row = childSearch(id, 'TR');
        if (row) {
            this.rows = 0;
            this.cols = 0;
            var col = row.firstChild;
            var r = 0, c = 0, data = [];
            data[0] = [];
            do {
                if (col && col.hasAttribute('rowspan') == false) {
                    data[r][c] = col.innerHTML;
                    col = col.nextSibling;
                    c++;
                }
                else {
                    row = row.nextSibling;
                    if (row && row.firstChild && row.firstChild.hasAttribute('colspan') == false) {
                        col = row.firstChild;
                        r++;
                        data[r] = [];
                    }
                    c = 0;
                }
            }
            while (row);
            this.rows = data.length;
            this.cols = data[0].length;
            this.data = [];
            for (var i = 0; i < this.cols; i++) {
                this.data[i] = [];
                for (var j = 0; j < this.rows; j++) {
                    this.data[i][j] = data[j][i];
                }
            }
            return true;
        }
    }
    return false;
}

statTable.prototype.addRow = function(howMany) {
    if (!howMany)
        howMany = 1;
    this.rows += howMany;
    for (var i = 0; i < this.cols; i++)
        if (howMany > 0)
            for (var h = 0; h < howMany; h++)
                this.data[i].push('');
        else
            this.data[i].splice(howMany, Math.abs(howMany));
}

statTable.prototype.addColumn = function(howMany) {
    if (!howMany)
        howMany = 1;
    this.cols += howMany;
    if (howMany > 0) {
        for (var h = 0; h < howMany; h++) {
            var blankCols = new Array(this.rows);
            for (var i = 0; i < blankCols.length; i++)
                blankCols[i] = '';
            this.data.push(blankCols);
        }
    }
    else
        this.data.splice(howMany, Math.abs(howMany));
}

statTable.prototype.addData = function(data) {
    for (var i = 0; i < this.cols; i++)
        for (var j = 0; j < this.rows; j++)
            this.data[i][j] = data[i][j];
}

statTable.prototype.toString = function() {
    var dv = document.createElement('div');
    dv.appendChild(this.toNode())
    return dv.innerHTML;
}

statTable.prototype.toNode = function() {
    var sTable = document.createElement('table');
    sTable.setAttribute('id', this.id);
    sTable.setAttribute('class', this.class);
    for (var r = 0; r < this.rows; r++) {
        var sRow = document.createElement('tr');
        for (var c = 0; c < this.cols; c++) {
            var sCol = (r == 0 && this.header) ? document.createElement('th') : document.createElement('td');
            sCol.innerHTML = this.data[c][r];
            if (this.editable)
                sCol.setAttribute('contenteditable', 'true');
            sRow.appendChild(sCol);
        }
        if (r == 0 && this.editable) {
            var bCol = document.createElement('td');
            bCol.setAttribute('rowspan', this.rows);
            var but = document.createElement('button');
            but.innerHTML = 'Add Column';
            but.setAttribute('id', 'colAddButton' + this.id);
            but.addEventListener('mouseup', function() {
                modifyTable(this.id, 1, true);
            }, false);
            var but2 = document.createElement('button');
            but2.innerHTML = 'Remove Column';
            but2.setAttribute('id', 'colRemButton' + this.id);
            but2.addEventListener('mouseup', function() {
                modifyTable(this.id, -1, true);
            }, false);
            bCol.appendChild(but);
            bCol.appendChild(but2);
            sRow.appendChild(bCol);
        }
        sTable.appendChild(sRow);
    }
    if (this.editable) {
        var bRow = document.createElement('tr');
        var bCol = document.createElement('td');
        bCol.setAttribute('colspan', this.cols);
        var but = document.createElement('button');
        but.innerHTML = 'Add Row';
        but.setAttribute('id', 'rowAddButton' + this.id);
        but.addEventListener('mouseup', function() {
            modifyTable(this.id, 1, false);
        }, false);
        var but2 = document.createElement('button');
        but2.innerHTML = 'Remove Row';
        but2.setAttribute('id', 'rowRemButton' + this.id);
        but2.addEventListener('mouseup', function() {
            modifyTable(this.id, -1, false);
        }, false);
        bRow.appendChild(bCol);
        bCol.appendChild(but);
        bCol.appendChild(but2);
        sTable.appendChild(bRow);
    }
    return sTable;
}

modifyTable = function(id, add, columnOnly) {
    var target = document.getElementById(id);
    while (target.tagName != 'TABLE')
        target = target.parentNode;
    var table = new statTable(target.id, 1, 1, true, true);
    table.absorbTable(target);
    if (columnOnly)
        table.addColumn(add);
    else
        table.addRow(add);
    target.parentNode.appendChild(table.toNode());
    target.parentNode.removeChild(target);
}

statTable.prototype.clear = function() {
    for (var i = 0; i < this.cols; i++)
        for (var j = 0; j < this.rows; j++)
            this.data[i][j] = '&zwnj;';
}

//-----------------
// Histgram Object
//-----------------

function histogram(id, sMin, sMax, sGrouping, frequencies, isEditable) {
    this.NS = "http://www.w3.org/2000/svg";
    this.id = id;
    this.xTitle = 'Score';
    this.yTitle = 'Frequency';
    this.histogram = true;
    this.cumulative = false;
    this.spacing = 20;
    this.fScale = 1;
    this.scores = new Array(Math.ceil((sMax - sMin + 1) / sGrouping) + 1);
    for (var i = 0; i < this.scores.length; i++)
        this.scores[i] = sMin + i * sGrouping - 1;
    if (document.getElementById(id)) {
        this.SVG = document.getElementById(id);
    }
    else {
        this.SVG = document.createElementNS(this.NS, 'svg');
        this.SVG.setAttribute('version', '1.1');
        this.SVG.setAttribute('id', id);
    }
    this.SVG.setAttribute('data-scores', this.scores.toString());
    if (isEditable) {
        this.editable = true;
        this.freq = [];
        for (var i = 0; i < this.scores.length; i++)
            this.freq[i] = 0;
    }
    else {
        this.editable = false;
        this.freq = frequencies;
        this.SVG.setAttribute('data-frequencies', this.freq.toString());
    }
    this.draw();
}

histogram.prototype.setPolygon = function(bool) {
    this.histogram = (bool) ? false : true;
}

histogram.prototype.setCumulative = function(bool) {
    this.cumulative = bool;
    if (bool)
        this.yTitle = 'Cumulative Frequency';
    else
        this.yTitle = 'Frequency';
}

histogram.prototype.draw = function() {
    while (this.SVG.hasChildNodes())
        this.SVG.removeChild(this.SVG.lastChild);
    var arrayMax = Math.min(this.scores.length - 1, this.freq.length);
    var fMax = (this.editable) ? 10 : 0;
    for (var i = 0; i < arrayMax; i++) {
        if (this.cumulative)
            fMax += this.freq[i];
        else
            fMax = (this.freq[i] > fMax) ? this.freq[i] : fMax;
    }
    var fSpace = Math.ceil(fMax / this.fScale);
    this.SVG.setAttribute('width', this.spacing * (arrayMax + 3));
    this.SVG.setAttribute('height', this.spacing * (fSpace + 2));
    var vAxis = document.createElementNS(this.NS, 'line');
    vAxis.setAttribute('stroke', 'black');
    vAxis.setAttribute('stroke-width', '2');
    vAxis.setAttribute('x1', this.spacing);
    vAxis.setAttribute('y1', this.spacing * (fSpace + 1));
    vAxis.setAttribute('x2', this.spacing * (arrayMax + 2));
    vAxis.setAttribute('y2', this.spacing * (fSpace + 1));
    this.SVG.appendChild(vAxis);
    var hAxis = document.createElementNS(this.NS, 'line');
    hAxis.setAttribute('stroke', 'black');
    hAxis.setAttribute('stroke-width', '2');
    hAxis.setAttribute('x1', this.spacing);
    hAxis.setAttribute('y1', this.spacing * (fSpace + 1));
    hAxis.setAttribute('x2', this.spacing);
    hAxis.setAttribute('y2', this.spacing);
    this.SVG.appendChild(hAxis);
    var vTitle = document.createElementNS(this.NS, 'text');
    vTitle.setAttribute('font-size', 10);
    vTitle.setAttribute('text-anchor', 'middle');
    vTitle.setAttribute('x', this.spacing * (arrayMax + 3) / 2);
    vTitle.setAttribute('y', this.spacing * (fSpace + 2));
    vTitle.textContent = this.xTitle;
    this.SVG.appendChild(vTitle);
    var hTitle = document.createElementNS(this.NS, 'text');
    hTitle.setAttribute('font-size', 10);
    hTitle.setAttribute('text-anchor', 'middle');
    hTitle.setAttribute('writing-mode', 'tb');
    hTitle.setAttribute('x', this.spacing / 3);
    hTitle.setAttribute('y', this.spacing * (fSpace + 2) / 2);
    hTitle.textContent = this.yTitle;
    this.SVG.appendChild(hTitle);
    var yVal = 0;
    for (var i = -1; i < arrayMax; i++) {
        var vline = document.createElementNS(this.NS, 'line');
        vline.setAttribute('stroke', 'rgb(150,150,150)');
        vline.setAttribute('stroke-width', '0.5');
        vline.setAttribute('x1', this.spacing * (i + 2.5));
        vline.setAttribute('y1', this.spacing * (fSpace + 1));
        vline.setAttribute('x2', this.spacing * (i + 2.5));
        vline.setAttribute('y2', this.spacing);
        this.SVG.appendChild(vline);
        var number = document.createElementNS(this.NS, 'text');
        number.setAttribute('font-size', 9);
        number.setAttribute('text-anchor', 'middle');
        number.setAttribute('x', this.spacing * (i + 2.5));
        number.setAttribute('y', this.spacing * (fSpace + 1) + 9);
        number.textContent = this.scores[i + 1];
        this.SVG.appendChild(number);
        if (i >= 0 && this.histogram) {
            if (this.cumulative)
                yVal += this.freq[i];
            else
                yVal = this.freq[i];
            var vBox = document.createElementNS(this.NS, 'rect');
            vBox.setAttribute('stroke', 'black');
            vBox.setAttribute('stroke-width', '1');
            vBox.setAttribute('fill', 'none');
            vBox.setAttribute('width', this.spacing);
            vBox.setAttribute('height', this.spacing * yVal / this.fScale);
            vBox.setAttribute('x', this.spacing * (i + 1.5));
            vBox.setAttribute('y', this.spacing * (fSpace - yVal / this.fScale + 1));
            this.SVG.appendChild(vBox);
        }
        else if (i >= 0 && !this.histogram) {
            var offset = (this.cumulative) ? this.spacing / 2 : 0;
            var poly = document.createElementNS(this.NS, 'line');
            poly.setAttribute('stroke', 'red');
            poly.setAttribute('stroke-width', '1');
            poly.setAttribute('x1', this.spacing * (i + 1) + offset);
            poly.setAttribute('y1', this.spacing * (fSpace - yVal / this.fScale + 1));
            poly.setAttribute('x2', this.spacing * (i + 2) + offset);
            if (this.cumulative)
                yVal += this.freq[i];
            else
                yVal = this.freq[i];
            poly.setAttribute('y2', this.spacing * (fSpace - yVal / this.fScale + 1));
            this.SVG.appendChild(poly);
        }
    }
    if (!this.histogram && !this.cumulative) {
        var poly = document.createElementNS(this.NS, 'line');
        poly.setAttribute('stroke', 'red');
        poly.setAttribute('stroke-width', '1');
        poly.setAttribute('x1', this.spacing * (arrayMax + 1));
        poly.setAttribute('y1', this.spacing * (fSpace - this.freq[this.freq.length - 1]/this.fScale + 1));
        poly.setAttribute('x2', this.spacing * (arrayMax + 2));
        poly.setAttribute('y2', this.spacing * (fSpace + 1));
        this.SVG.appendChild(poly);
    }
    for (var i = 0; i < fSpace; i++) {
        var hline = document.createElementNS(this.NS, 'line');
        hline.setAttribute('stroke', 'rgb(150,150,150)');
        hline.setAttribute('stroke-width', '0.5');
        hline.setAttribute('x1', this.spacing);
        hline.setAttribute('y1', this.spacing * (i + 1));
        hline.setAttribute('x2', this.spacing * (arrayMax + 2));
        hline.setAttribute('y2', this.spacing * (i + 1));
        this.SVG.insertBefore(hline, hTitle);
        var number = document.createElementNS(this.NS, 'text');
        number.setAttribute('font-size', 9);
        number.setAttribute('text-anchor', 'end');
        number.setAttribute('x', this.spacing - 1);
        number.setAttribute('y', this.spacing * (fSpace - i) + 4);
        number.textContent = (i + 1) * this.fScale;
        this.SVG.appendChild(number);
    }
}

histogram.prototype.toString = function() {
    var d = document.createElement('div');
    d.appendChild(this.SVG);
    return d.innerHTML;
}

//-----------------
// BoxPlot
//-----------------

boxPlot = function(min, q1, med, q3, max) {
    var box = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var niceScale = [1, 2, 5, 10, 20, 50, 100], p = 0;
    while (p < niceScale.length - 1 && (Math.ceil(max / niceScale[p]) - Math.floor(min / niceScale[p]) + 1) > 10)
        p++;
    if (p > 0 && (Math.ceil(max / niceScale[p]) - Math.floor(min / niceScale[p]) + 1) < 5)
        p--;
    var range = Math.ceil(max / niceScale[p]) - Math.floor(min / niceScale[p]) + 1;
    var scale = niceScale[p];
    box.setAttribute('width', (range + 2) * 20);
    box.setAttribute('height', 60);
    var axis = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    axis.setAttribute('stroke', 'black');
    axis.setAttribute('stroke-wdith', 2);
    axis.setAttribute('x1', 20);
    axis.setAttribute('x2', range * 20);
    axis.setAttribute('y1', 40);
    axis.setAttribute('y2', 40);
    box.appendChild(axis);
    for (var i = 0; i < range; i++) {
        var notch = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        notch.setAttribute('stroke', 'black');
        notch.setAttribute('stroke-wdith', 2);
        notch.setAttribute('x1', (i + 1) * 20);
        notch.setAttribute('x2', (i + 1) * 20);
        notch.setAttribute('y1', 35);
        notch.setAttribute('y2', 45);
        box.appendChild(notch);
        var num = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        num.setAttribute('font-size', 9);
        num.setAttribute('text-anchor', 'middle');
        num.setAttribute('x', (i + 1) * 20);
        num.setAttribute('y', 55);
        num.textContent = Math.floor(min / scale) * scale + i * scale;
        box.appendChild(num);
    }
    var lower = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    lower.setAttribute('stroke', 'black');
    lower.setAttribute('stroke-wdith', 1);
    lower.setAttribute('x1', ((min / scale) - Math.floor(min / scale) + 1) * 20);
    lower.setAttribute('x2', ((min / scale) - Math.floor(min / scale) + 1) * 20);
    lower.setAttribute('y1', 20);
    lower.setAttribute('y2', 10);
    box.appendChild(lower);
    var upper = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    upper.setAttribute('stroke', 'black');
    upper.setAttribute('stroke-wdith', 1);
    upper.setAttribute('x1', ((max / scale) - Math.floor(min / scale) + 1) * 20);
    upper.setAttribute('x2', ((max / scale) - Math.floor(min / scale) + 1) * 20);
    upper.setAttribute('y1', 20);
    upper.setAttribute('y2', 10);
    box.appendChild(upper);
    var lowerLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    lowerLine.setAttribute('stroke', 'black');
    lowerLine.setAttribute('stroke-wdith', 1);
    lowerLine.setAttribute('x1', ((min / scale) - Math.floor(min / scale) + 1) * 20);
    lowerLine.setAttribute('x2', ((q1 / scale) - Math.floor(min / scale) + 1) * 20);
    lowerLine.setAttribute('y1', 15);
    lowerLine.setAttribute('y2', 15);
    box.appendChild(lowerLine);
    var upperLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    upperLine.setAttribute('stroke', 'black');
    upperLine.setAttribute('stroke-wdith', 1);
    upperLine.setAttribute('x1', ((q3 / scale) - Math.floor(min / scale) + 1) * 20);
    upperLine.setAttribute('x2', ((max / scale) - Math.floor(min / scale) + 1) * 20);
    upperLine.setAttribute('y1', 15);
    upperLine.setAttribute('y2', 15);
    box.appendChild(upperLine);
    var lowerBox = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    lowerBox.setAttribute('stroke', 'black');
    lowerBox.setAttribute('stroke-wdith', 1);
    lowerBox.setAttribute('fill', 'none');
    lowerBox.setAttribute('x', ((q1 / scale) - Math.floor(min / scale) + 1) * 20);
    lowerBox.setAttribute('y', 5);
    lowerBox.setAttribute('width', Math.max(((med - q1) / scale) * 20, 1));
    lowerBox.setAttribute('height', 20);
    box.appendChild(lowerBox);
    var upperBox = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    upperBox.setAttribute('stroke', 'black');
    upperBox.setAttribute('stroke-wdith', 1);
    upperBox.setAttribute('fill', 'none');
    upperBox.setAttribute('x', ((med / scale) - Math.floor(min / scale) + 1) * 20);
    upperBox.setAttribute('y', 5);
    upperBox.setAttribute('width', Math.max(((q3 - med) / scale) * 20, 1));
    upperBox.setAttribute('height', 20);
    box.appendChild(upperBox);
    return box;
}
