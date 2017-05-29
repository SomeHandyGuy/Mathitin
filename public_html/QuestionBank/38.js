function makeVars38() {
    var qNum = {'a': randomInt(2, 12), 'y': randomLowInt(2, 1000), "$": "`"};
    while (qNum['a'] == 10)
        qNum['a'] = randomInt(2, 12);
    var x = Math.log(qNum['y']) / Math.log(qNum['a']);
    qNum['x'] = Math.round(x * 100000) / 100000 + '(5dp)';
    qNum['question'] = '<p>Use the <span style="border: 1px solid;">LOG</span> or <span style="border: 1px solid;">ln</span> buttons on you calculator to evaluate:</p><p>[$]log_[a]([y])[$]</p><p>correct to 5dp.</p>';
    qNum['answer'] = '<p>Using the change of base rule:</p><p>[$]log_[a]([y])=(log_(10)([y]))/(log_(10)([a]))[$] <span style="float: right;"> or&#160;&#160;[$](ln([y]))/(ln([a]))[$]</span></p><p>[$]=[x][$]</p><p>On the calculator, type:</p><p><span style="border: 1px solid;">LOG</span>[y]<span style="border: 1px solid;">`-:`</span> <span style="border: 1px solid;">LOG</span> [a] <span style="border: 1px solid;">=</span> <span style="float: right">or&#160;&#160;&#160;&#160;<span style="border: 1px solid;">ln</span>[y]<span style="border: 1px solid;">`-:`</span> <span style="border: 1px solid;">ln</span> [a] <span style="border: 1px solid;">=</span></span></p>';
    setup(38, qNum);
}makeVars38();