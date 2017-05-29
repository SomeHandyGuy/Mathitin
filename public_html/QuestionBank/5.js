function makeVars5() {
    var number = randomLowInt(1, 99999999),
            exp = randomLowInt(1, 99) * nonZeroRand(-1, 1),
            sci = randomInt(0, 1), sNumber,
            digit = 0, zeros = '';
    while (number / Math.pow(10, digit) >= 10)
        digit++;
    sNumber = '`' + number / Math.pow(10, digit) + 'xx 10^' + exp + '`';
    if (exp > 0) {
        for (var i = 0; i < exp - digit; i++) {
            if (i % 3 == (exp - digit) % 3)
                zeros += ' ';
            zeros += '0';
        }
        if (zeros)
            number += zeros;
        else
            number /= Math.pow(10, digit - exp);
    } else {
        zeros = '0.';
        for (var i = exp + 1; i < 0; i++) {
            if (i % 3 == (exp + 1) % 3)
                zeros += ' ';
            zeros += '0';
        }
        number = zeros + number;
    }
    var qNum = {'asthis': sci ? 'in scientific notation' : 'as a normal number', 'number': sci ? number : sNumber, 'ans': sci ? sNumber : number, "$": "`"};
    qNum['question'] = '<p>Write [number] [asthis]</p>';
    qNum['answer'] = '<p>[ans]</p>';
    setup(5, qNum);
}makeVars5();