function makeVars54() {
    function shuffle(arr) { //NOTE: destroys original array!
        var shuffle = [], count = arr.length;
        for (var i = 0; i < count; i++) {
            var p = randomInt(0, arr.length - 1);
            shuffle.push(arr[p]);
            arr.splice(p, 1);
        }
        return shuffle;
    }

    var pronumerals = shuffle(['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']),
            choice = shuffle([1, 1, 1, 0, 0]),
            pow = shuffle([1, 0, 0]),
            ops = ['+', '-'],
            num = pronumerals.shift(),
            den = pronumerals.shift(),
            pre = '', post = '',
            noPower = true;

    function addPower(exp) {
        if (pow.shift())
            return exp + '^' + randomInt(2, 9);
        else
            return exp;
    }

    function addTerm(exp) {
        if (choice.shift()) {
            exp = '(' + exp + ops[randomInt(0, 1)] + pronumerals[3] + ')';
            exp = addPower(exp);
            if (choice.shift())
                exp = '(' + pronumerals.shift() + exp + ')';
        } else {
            choice.splice(choice.indexOf(0), 1);
            exp = addPower(exp);
        }
        return exp;
    }

    num = addTerm(num);
    den = addTerm(den);

    if (pow.shift()) {
        pre = '(';
        post = ')^' + randomInt(2, 9);
    }

    if (choice.shift()) {
        if (randomInt(0, 1))
            pre = pronumerals.shift() + ops[randomInt(0, 1)] + pre;
        else
            post += ' ' + ops[randomInt(0, 1)] + ' ' + pronumerals.shift();
    }

    var qNum = {
        'pre': pre,
        'post': post,
        'num': num,
        'den': den,
        '$': '`'
    };
    qNum['question'] = '<p>Copy the mathematical expression in the box below:</p><p style=\'border: 2px solid red; background:#ffffff; color:#000000;\'>[$][pre][num]/[den][post][$]</p>';
    qNum['answer'] = '<p>[pre][num]/[den][post]</p>';
    setup(54, qNum);
}makeVars54();