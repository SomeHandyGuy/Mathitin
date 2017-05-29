function makeVars27() {
    var cfs = [randomLowInt(2, 12), randomLowInt(1, 12), randomLowInt(1, 12), randomLowInt(1, 12)];
    for (var i = 0; i < 4; i++)
        cfs[i] *= nonZeroRand(-1, 1);
    for (var i = 0; i < 2; i++) {
        var g = gcd(cfs[i * 2], cfs[i * 2 + 1]);
        if (g != 1) {
            cfs[i * 2] /= g;
            cfs[i * 2 + 1] /= g;
        }
    }
    if (Math.abs(cfs[0]) == 1)
        cfs[0] *= 5;
    if (cfs[0] * cfs[3] + cfs[1] * cfs[2] == 0) {
        do
            cfs[0] = randomInt(-9, 9);
        while (cfs[0] != cfs[2] && gcd(cfs[0], cfs[1]) != 1)
    }
    var qNum = {"p": cfs[0] * cfs[3], "q": cfs[1] * cfs[2], "a": cfs[0] * cfs[2], "b": cfs[0] * cfs[3] + cfs[1] * cfs[2], "c": cfs[1] * cfs[3], "d": cfs[0] * cfs[1] * cfs[2] * cfs[3], "a0": cfs[0], "a1": cfs[1], "a2": cfs[2], "a3": cfs[3], "$": "`"};
    qNum['question'] = '<p>Factorise the following:</p><p>[$][!a]x^2 [+!b]x [+c][$]</p>';
    qNum['answer'] = '<p>First, noting that [$][a]xx[c]=[d][$],</p><p>Find two numbers that add to give [$][b][$] and multiply to give [$][d][$]</p><p>[$][p][+q]=[b][$]</p><p>[$][p]xx[q]=[d][$]</p><p>Re-write question as "Factorise [$][!a]x^2 [+!p]x [+!q]x [+c][$]"</p><p>[$][!a0]([!a2]x [+a3]) [+!a1]([!a2]x [+a3])[$]</p><p>[$]([!a2]x [+a3])([!a0]x [+a1])[$]</p>';
    setup(27, qNum);
}makeVars27();