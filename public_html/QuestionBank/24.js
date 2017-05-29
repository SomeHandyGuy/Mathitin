function makeVars24() {
    var pronumeral = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    var nOne = new algebra();
    nOne.coef[0] = new Fraction(-1, 1);
    nOne.terms[0] = new term();
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
    var al3 = al2.mult(nOne), al4 = al1.mult(al3).add(al2.mult(al2));
    var qNum = {"a": al1.string(), "b": al2.string(), "apb": al1.add(al2).string(), "amb": al1.sub(al2).string(), "mb": al3.string(), "aa": al1.mult(al1).string(), "bb": al2.mult(al2).string(), "axmb": al1.mult(al3).string(), "axb": al1.mult(al2).string(), "aapab": al1.mult(al1).add(al1.mult(al2)).string(), "abpbb": al4.string(), "all": al1.mult(al1).sub(al2.mult(al2)).string(), "pm": '+', "$": "`"};
    if (al4.coef[0].negative)
        qNum['pm'] = '';
    qNum['question'] = '<p>Expand the brackets:</p><p>[$]([apb])([amb])[$]</p>';
    qNum['answer'] = '<div style="float: left"><p>[$][a]xx[a]=[aa][$]  and  [$][a]xx[mb]=[axmb][$]</p><p>[$][b]xx[a]=[axb][$]  and  [$][b]xx[b]=[bb][$]</p><p>So the answer is:</p><p>[$][aapab][pm][abpbb]=[all][$]</p></div><div style="border: thin solid; float: left; padding-left: 1em; margin-left: 1em;"><p><b>Alternatively</b> using the pattern of "difference of squares":</p><p>[$](a+b)(a-b)=a^2-b^2[$]</p><p>[$][a]xx[a]=[aa][$]  and  [$][b]xx[b]=[bb][$]</p><p>So the answer is: [$][all][$]</p></div>';
    setup(24, qNum);
}makeVars24();