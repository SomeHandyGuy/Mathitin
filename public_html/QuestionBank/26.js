function makeVars26() {
    var p = nonZeroRand(-12, 12), q = nonZeroRand(-12, 12);
    while (p + q == 0)
        q = nonZeroRand(-12, 12);
    var qNum = {"p": p, "q": q, "b": p + q, "c": p * q, "questn": '[$]x^2 [+!b]x [+c][$]', "$": "`"};
    qNum['question'] = '<p>Factorise the following:</p><p>[?questn]</p>';
    qNum['answer'] = '<p>Find two numbers that add to give [$][b][$] and multiply to give [$][c][$]</p><p>[$][p][+q]=[b][$]</p><p>[$][p]xx[q]=[c][$]</p><p>Hence the solution is [$](x[+p])(x[+q])[$]</p>';
    setup(26, qNum);
}makeVars26();