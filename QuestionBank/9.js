function makeVars9() {
    var number = randomDigitInt(),
            exp = randomLowInt(1, 10, 3),
            index = Math.pow(10, exp),
            integer = Math.floor(number / index),
            rational, alt = '',
            altUnsimplified,
            altRational = new Fraction(1, 1);
    if (integer) {
        rational = number % (integer * index);
        if (rational) {
            alt = '<p>or<br/>[$][altanswer][$]</p>';
            altRational = new Fraction(rational, index);
            altUnsimplified = integer + ' ' + rational + '/' + index;
        }
    } else {
        rational = '';
        for (var i = 0; i < exp - number.toString().length; i++)
            rational += '0';
        rational += number;
    }
    var answer = new Fraction(parseInt(rational), index).add(integer);
    var unsimplified = number + '/' + index;
    var qNum = {"number": integer + '.' + rational, "ans": unsimplified, "or": alt, "altanswer": altUnsimplified, "$": "`"};
    if (unsimplified != answer.string())
        qNum['ans'] += '=' + answer.string();
    if (altUnsimplified != answer.improperString())
        qNum['altanswer'] += '=' + answer.improperString();
    qNum['question'] = '<p>Write [number] as a fraction or mixed number</p>';
    qNum['answer'] = '<p>[$][ans][$]</p>[?or]';
    setup(9, qNum);
}makeVars9();