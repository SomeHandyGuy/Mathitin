function makeVars23() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var al1 = new algebra(), al2 = new algebra();
    al1.coef[0] = new Fraction(randomInt(1, 9), 1);
    al2.coef[0] = new Fraction(nonZeroRand(-9, 9), 1);
    var syms = [randomLowInt(0, 2), randomLowInt(0, 2)];
    if (syms[0] == syms[1] && syms[1] == 0)
        syms[1] = 1;
    al1.terms[0] = new term();
    al2.terms[0] = new term();
    var i = 0, j = 0;
    while (i++ < syms[0]) {
        var ind = new Fraction(randomLowInt(1, 5), 1);
        al1.terms[0].addSymbol(randomArrayElement(pronumeral), ind);
    }
    while (j++ < syms[1]) {
        var ind = new Fraction(randomLowInt(1, 5), 1);
        al2.terms[0].addSymbol(randomArrayElement(pronumeral), ind);
    }
    var al3 = al1.mult(al1), al4 = al1.mult(al2), al5 = al2.mult(al2);
    var qNum = {"a": al1.string(), "b": al2.string(), "ab": al1.add(al2).string(), "aa": al3.string(), "axb": al4.string(), "2axb": al4.add(al4).string(), "bb": al5.string(), "aapab": al3.add(al4).string(), "abpbb": al4.add(al5).string(), "all": al3.add(al4).add(al4).add(al5).string(), "pm": '+', "$": "`"};
    if (al4.coef[0].negative)
        qNum['pm'] = '';
    qNum['question'] = '<p>Expand the brackets:</p><p>[$]([ab])^2[$]</p>';
    qNum['answer'] = '<div style="float: left"><p>[$]([ab])^2=([ab])([ab])[$]</p><p>now expand brackets for [$]([ab])([ab])[$]</p><p>[$][a]xx[a]=[aa][$]  and  [$][a]xx[b]=[axb][$]  and  [$][b]xx[b]=[bb][$]</p><p>So the answer is:</p><p>[$][aapab][pm][abpbb]=[all][$]</p></div><div style="border: thin solid; float: left; padding-left: 1em; margin-left: 1em;"><p><b>Alternatively</b> using the pattern of perfect squares:</p><p>[$](a+b)^2=a^2+2ab+b^2[$]</p><p>[$][a]xx[a]=[aa][$]  and  [$]2xx[a]xx[b]=[2axb][$]  and  [$][b]xx[b]=[bb][$]</p><p>So the answer is: [$][all][$]</p></div>';
    setup(23, qNum);
}makeVars23();