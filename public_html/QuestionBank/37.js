function makeVars37() {
    var qNum = {'a': randomInt(2, 12), "$": "`"};
    qNum['x'] = randomInt(0, Math.floor(4 * Math.log(10) / Math.log(qNum['a'])));
    qNum['y'] = Math.pow(qNum['a'], qNum['x']);
    if (randomInt(0, 3) == 0) {
        qNum['x'] *= -1;
        var y = new Fraction(1, qNum['y']);
        qNum['y'] = y.string();
    }
    qNum['question'] = '<p>What is the value of [$]log_[a]([y])[$] ?</p><p>Answer without using the LOG button on your calculator.</p>';
    qNum['answer'] = '<p>`log_[a]([y])=[x]`</p><p>because</p><p>`[a]^[x]=[y]`</p>';
    setup(37, qNum);
}makeVars37();