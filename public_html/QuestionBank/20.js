function makeVars20() {
    var a = new Fraction(randomInt(-9, 9), 1);
    var b = new Fraction(randomInt(-9, 9), 1);
    var c = new Fraction(randomInt(-9, 9), 1);
    var qNum = {"a": a.string(), "b": b.string(), "c": c.string(), "t": '', "expr": '', "aexpr1": '', "aexpr2": '', "ans": '', "$": "`"};
    switch (randomInt(0, 15)) {
        case 0:
            qNum['expr'] = 'ab+c';
            qNum['aexpr1'] = '[a]xx[b]+ [c]';
            qNum['aexpr2'] = '[t]+ [c]';
            qNum['t'] = a.mult(b).string();
            qNum['ans'] = a.mult(b).add(c).string();
            break;
        case 1:
            qNum['expr'] = 'ab-c';
            qNum['aexpr1'] = '[a]xx[b]- [c]';
            qNum['aexpr2'] = '[t]- [c]';
            qNum['t'] = a.mult(b).string();
            qNum['ans'] = a.mult(b).sub(c).string();
            break;
        case 2:
            qNum['expr'] = 'a+bc';
            qNum['aexpr1'] = '[a]+ [b]xx[c]';
            qNum['aexpr2'] = '[a]+ [t]';
            qNum['t'] = b.mult(c).string();
            qNum['ans'] = b.mult(c).add(a).string();
            break;
        case 3:
            qNum['expr'] = 'a-bc';
            qNum['aexpr1'] = '[a]- [b]xx[c]';
            qNum['aexpr2'] = '[a]- [t]';
            qNum['t'] = b.mult(c).string();
            var temp = b.mult(c);
            qNum['ans'] = a.sub(temp).string();
            break;
        case 4:
            qNum['expr'] = 'a/b+c';
            if (b.numerator == 0) {
                b = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['b'] = b.string();
            }
            qNum['aexpr1'] = '[a]-:[b]+ [c]';
            qNum['aexpr2'] = '[t]+ [c]';
            qNum['t'] = a.div(b).string();
            qNum['ans'] = a.div(b).add(c).string();
            break;
        case 5:
            qNum['expr'] = 'a/b-c';
            if (b.numerator == 0) {
                b = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['b'] = b.string();
            }
            qNum['aexpr1'] = '[a]-:[b]- [c]';
            qNum['aexpr2'] = '[t]- [c]';
            qNum['t'] = a.div(b).string();
            qNum['ans'] = a.div(b).sub(c).string();
            break;
        case 6:
            qNum['expr'] = 'a+b/c';
            if (c.numerator == 0) {
                c = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['c'] = c.string();
            }
            qNum['aexpr1'] = '[a]+ [b]-:[c]';
            qNum['aexpr2'] = '[a]+ [t]';
            qNum['t'] = b.div(c).string();
            qNum['ans'] = b.div(c).add(a).string();
            break;
        case 7:
            qNum['expr'] = 'a-b/c';
            if (c.numerator == 0) {
                c = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['c'] = c.string();
            }
            qNum['aexpr1'] = '[a]- [b]-:[c]';
            qNum['aexpr2'] = '[a]+ [t]';
            qNum['t'] = b.div(c).string();
            var temp = b.div(c);
            qNum['ans'] = a.sub(temp).string();
            break;
        case 8:
            qNum['expr'] = '(a+b)c';
            qNum['aexpr1'] = '([a]+ [b])xx[c]';
            qNum['aexpr2'] = '[t]xx[c]';
            qNum['t'] = a.add(b).string();
            qNum['ans'] = a.add(b).mult(c).string();
            break;
        case 9:
            qNum['expr'] = '(a-b)c';
            qNum['aexpr1'] = '([a]- [b])xx[c]';
            qNum['aexpr2'] = '[t]xx[c]';
            qNum['t'] = a.sub(b).string();
            qNum['ans'] = a.sub(b).mult(c).string();
            break;
        case 10:
            qNum['expr'] = 'a(b+c)';
            qNum['aexpr1'] = '[a]xx([b]+ [c])';
            qNum['aexpr2'] = '[a]xx[t]';
            qNum['t'] = b.add(c).string();
            qNum['ans'] = b.add(c).mult(a).string();
            break;
        case 11:
            qNum['expr'] = 'a(b-c)';
            qNum['aexpr1'] = '[a]xx([b]- [c])';
            qNum['aexpr2'] = '[a]xx[t]';
            qNum['t'] = b.sub(c).string();
            qNum['ans'] = b.sub(c).mult(a).string();
            break;
        case 12:
            qNum['expr'] = '(a+b)/c';
            if (c.numerator == 0) {
                c = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['c'] = c.string();
            }
            qNum['aexpr1'] = '([a]+ [b])-:[c]';
            qNum['aexpr2'] = '[t]-:[c]';
            qNum['t'] = a.add(b).string();
            qNum['ans'] = a.add(b).div(c).string();
            break;
        case 13:
            qNum['expr'] = '(a-b)/c';
            if (c.numerator == 0) {
                c = new Fraction(nonZeroRand(-9, 9), 1);
                qNum['c'] = c.string();
            }
            qNum['aexpr1'] = '([a]- [b])-:[c]';
            qNum['aexpr2'] = '[t]-:[c]';
            qNum['t'] = a.sub(b).string();
            qNum['ans'] = a.sub(b).div(c).string();
            break;
        case 14:
            qNum['expr'] = 'a/(b+c)';
            while (b.add(c).numerator == 0) {
                b = new Fraction(randomInt(-9, 9), 1);
                qNum['b'] = b.string();
            }
            qNum['aexpr1'] = '[a]-:([b]+ [c])';
            qNum['aexpr2'] = '[a]-:[t]';
            qNum['t'] = b.add(c).string();
            var temp = b.add(c);
            qNum['ans'] = a.div(temp).string();
            break;
        case 15:
            qNum['expr'] = 'a/(b-c)';
            while (b.sub(c).numerator == 0) {
                b = new Fraction(randomInt(-9, 9), 1);
                qNum['b'] = b.string();
            }
            qNum['aexpr1'] = '[a]-:([b]- [c])';
            qNum['aexpr2'] = '[a]-:[t]';
            qNum['t'] = b.sub(c).string();
            var temp = b.sub(c);
            qNum['ans'] = a.div(temp).string();
            break;
    }
    qNum['question'] = '<p>Evaluate the following expression:</p><p>[$][expr][$]</p><p>Given that:</p><p>[$]a=[a], b=[b], c=[c].[$]</p>';
    qNum['answer'] = '<p>[$]=[?aexpr1][$]</p><p>[$]=[?aexpr2][$]</p><p>[$]=[ans][$]</p>';
    setup(20, qNum);
}makeVars20();