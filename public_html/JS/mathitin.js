/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function AJAXrequest(type, URL, action, send, requestHeader) {
    var loadingBar = document.getElementById('loadingBar');
    if (loadingBar)
        loadingBar.style.display = 'block';
    var xhr = new XMLHttpRequest();
    xhr.open(type, URL);
    if (type = 'POST')
        xhr.setRequestHeader('Content-type', requestHeader || 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (action)
                action(xhr.responseText);
//            else
//                console.log(xhr.responseText);
            if (loadingBar)
                loadingBar.style.display = 'none';
        }
    }
    xhr.send(send);
}

function typeSet(event)
{
    var node = event.target;
    var string = node.value.replace(/\n/g, ' endamath<br />amath ');
    document.getElementById('pStudentAnswer').innerHTML = 'amath ' + string + ' endamath';
    AMprocessNode(document.getElementById('pStudentAnswer'));
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function buildInstructorMenu(list) {
    //list must be an array of type list[category][subcategory][name]=questionID
    var errorString = 'Question Fetch Error:';
    if (list.substring(0, errorString.length) == errorString)
        console.log(list);
    else {
        var menuArray = JSON.parse(list);

        function createDOMcollapseTable(target, array, idString) {
            var index = 0;
            for (var element in array) {
                var idStringNew = (idString) ? idString + '_' + index : idString + index;
                index++;
                var checkboxID = 'selectCheckbox_' + idStringNew;
                var div = document.createElement('div');
                target.appendChild(div);
                var label = document.createElement('label');
                label.innerHTML = element;
                label.htmlFor = checkboxID;
                div.appendChild(label);
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = checkboxID;
                checkbox.addEventListener('click', selectAllCheckbox, false);
                div.appendChild(checkbox);
                if (array[element] instanceof Object) {
                    var radio = document.createElement('input');
                    radio.type = 'checkbox';
                    radio.id = 'collapseCheckbox_' + idStringNew;
                    div.appendChild(radio);
                    var nextDiv = document.createElement('div');
                    div.appendChild(nextDiv);
                    var showHide = document.createElement('label');
                    showHide.htmlFor = radio.id;
                    div.appendChild(showHide);
                    createDOMcollapseTable(nextDiv, array[element], idStringNew);
                }
                else {
                    var button = document.createElement('button');
                    button.innerHTML = 'preview';
                    button.addEventListener('click', getQuestion, false);
                    button.dataset.id = array[element];
                    checkbox.dataset.question = array[element];
                    div.appendChild(button);
                }
            }

        }

        createDOMcollapseTable(document.getElementById('instructorConfig'), menuArray, '');
        document.getElementById('saveConfigButton').addEventListener('click', saveConfig, false);
//        var saveButton = document.createElement('input');
//        saveButton.type = 'button';
//        saveButton.value = 'Save';
//        saveButton.id = 'saveConfigButton';
//        saveButton.addEventListener('click', saveConfig, false);
//        document.getElementById('instructorConfig').appendChild(saveButton);
    }
}

function selectAllCheckbox() {
    var id = this.id;
    // select/deselect all child checkboxes
    var i = 0;
    var checkbox;
    while (checkbox = document.getElementById(id + '_' + i)) {
        if (checkbox.checked != this.checked)
            checkbox.click();
        i++;
    }

    //if selecting, select parent if all siblings are selected
    if (this.checked) {
        var select = true;
        i = 0;
        var siblingId = id.slice(0, id.lastIndexOf('_'));
        siblingId += '_' + i;
        while (select && (checkbox = document.getElementById(siblingId))) {
            select = checkbox.checked;
            i++;
            if (siblingId.lastIndexOf('_') > -1) {
                siblingId = siblingId.slice(0, siblingId.lastIndexOf('_'));
                siblingId += '_' + i;
            }
            else
                siblingId = '';
        }
        if (select) {
            var parentId = id.slice(0, id.lastIndexOf('_'));
            checkbox = document.getElementById(parentId);
            if (checkbox && checkbox.checked == false)
                checkbox.click();
        }
        //trigger 'show' button
        var showHideID = 'collapseCheckbox' + id.slice(id.indexOf('_'));
        if (checkbox = document.getElementById(showHideID))
            checkbox.checked = true;
    }
    else {//if deslecting then deselect all parents
        var parentId = id.slice(0, id.lastIndexOf('_'));
        while (checkbox = document.getElementById(parentId)) {
            checkbox.checked = false;
            if (parentId.lastIndexOf('_') > -1)
                parentId = parentId.slice(0, parentId.lastIndexOf('_'));
            else
                parentId = '';
        }
    }
}

function saveConfig() {
    var a = 0, b = 0, c = 0, result = [];
    var checkboxID = 'selectCheckbox_' + a + '_' + b + '_' + c;
    var checkbox = document.getElementById(checkboxID);
    while (checkbox) {
        if (checkbox.checked)
            result.push(checkbox.dataset.question);
        c++;
        checkboxID = 'selectCheckbox_' + a + '_' + b + '_' + c;
        checkbox = document.getElementById(checkboxID);
        if (!checkbox) {
            c = 0;
            b++;
            checkboxID = 'selectCheckbox_' + a + '_' + b + '_' + c;
            checkbox = document.getElementById(checkboxID);
            if (!checkbox) {
                b = 0;
                a++;
                checkboxID = 'selectCheckbox_' + a + '_' + b + '_' + c;
                checkbox = document.getElementById(checkboxID);
            }
        }
    }
    var configuration = {
        'can_regen': document.getElementById('canRedo').checked,
        'can_see_answer': document.getElementById('canSeeAnswer').checked,
        'can_submit': document.getElementById('canSubmit').checked
    };
    AJAXrequest('POST', 'questionFetcher.php', function (msg) {
        console.log(msg);
        AJAXrequest('POST', 'questionFetcher.php', buildMenu, 'method=resource&id=' + document.getElementById('workingArea').dataset.resource_id);
    }, 'id=' + document.getElementById('workingArea').dataset.resource_id + '&JSONdata=' + JSON.stringify(result) + '&CF=' + JSON.stringify(configuration));
}

function buildMenu(list) {
    var errorString = 'Question Fetch Error:';
    if (list.substring(0, errorString.length) == errorString)
        console.log(list);
    else {
        var menuArray = JSON.parse(list);
        if (menuArray['config']) {
            if (!menuArray['config']['can_regen']) {
                var regen = document.getElementById('newQuestionLabel');
                regen.parentNode.removeChild(regen);
            }
            if (!menuArray['config']['can_see_answer']) {
                var answer = document.getElementById('showAnswerLabel');
                answer.parentNode.removeChild(answer);
            }
            if (!menuArray['config']['can_submit']) {
                var submit = document.getElementById('saveWorkButton');
                submit.parentNode.removeChild(submit);
            }
        }
        if (document.getElementById('canRedo')) {
            document.getElementById('canRedo').checked = menuArray['config']['can_regen'];
            document.getElementById('canSeeAnswer').checked = menuArray['config']['can_see_answer'];
            document.getElementById('canSubmit').checked = menuArray['config']['can_submit'];
        }
        delete menuArray['config'];

        function createDOMList(type, target, array) {
            var list = document.createElement(type);
            target.appendChild(list);
            for (var element in array) {
                var node = document.createElement('li');
                var an = document.createElement('a');
                an.innerHTML = element;
                an.href = '#';
                node.appendChild(an);
                list.appendChild(node);
                if (array[element] instanceof Object)
                    createDOMList(type, node, array[element]);
                else {
                    an.addEventListener('click', getQuestion, false);
                    an.dataset.id = array[element];
                    var checkbox = document.querySelector("input[data-question='" + array[element] + "']");
                    if (checkbox && checkbox.checked == false)
                        checkbox.click();
                }
            }
        }

        var menu = document.getElementById('menuDiv');
        while (menu.hasChildNodes()) {
            menu.removeChild(menu.firstChild);
        }
        if (list == '[]') {
            var p = document.createElement('p');
            var sorryText = document.createTextNode("No questions have been set for this area yet. Please come back later.");
            p.appendChild(sorryText);
            menu.appendChild(p);
        } else {
            createDOMList('ul', menu, menuArray);
            menu.firstChild.id = 'menu';
        }
    }
}

function makeVars() {
    alert('You have not chosen a question!');
}

function getQuestion(event, id) {
    var title = this.innerHTML;
    if (title == 'preview')
        title = this.parentNode.firstChild.innerHTML;
    document.getElementById('hQuestionTitle').innerHTML = title;
    if (!id)
        id = this.dataset.id;
    var tab = document.getElementById('tab-3')
    if (tab)
        tab.checked = true;

    if (document.getElementById('plainQuestionText'))
        document.getElementById('plainQuestionText').dataset.id = id;
    var scrpt = document.createElement('script'),
            oldScrpt = document.getElementById('qCode');
    if (oldScrpt)
        oldScrpt.parentNode.removeChild(oldScrpt);
    scrpt.src = 'QuestionBank/' + id + '.js';
    scrpt.id = 'qCode';
    scrpt.onload = function () {
        document.getElementById('loadingBar').style.display = 'none';
    };
    document.body.appendChild(scrpt);
    document.getElementById('loadingBar').style.display = 'block';

function setup(qid, array) {
    if (document.getElementById('showAnswerLabel'))
        document.getElementById('showAnswerLabel').style.visibility = 'visible';
    document.getElementById('showAnswerButton').checked = false;
    document.getElementById('newQuestionButton').checked = false;
    document.getElementById('stateWorkingArea').checked = true;
    if (document.getElementById('stateFileBrowser'))
        document.getElementById('stateFileBrowser').checked = false;
    if (document.getElementById('newQuestionLabel')) {
        document.getElementById('newQuestionLabel').style.visibility = 'visible';
        document.getElementById('newQuestionLabel').addEventListener('click',window["makeVars"+qid], false);
    }
    
    var text = process('[?question]', array);
    document.getElementById('pQuestionText').innerHTML = text;
    if (document.getElementById('plainQuestionText'))
        document.getElementById('plainQuestionText').innerHTML = text;
    if (document.getElementById('markQuestion'))
        document.getElementById('markQuestion').innerHTML = text;

    text = process('[?answer]', array)
    document.getElementById('answer').innerHTML = text;
    if (document.getElementById('plainAnswerText'))
        document.getElementById('plainAnswerText').innerHTML = text;
    if (document.getElementById('markComputedAnswer'))
        document.getElementById('markComputedAnswer').innerHTML = text;
        
    if (array['working']) {
        document.getElementById('pStudentAnswer').innerHTML = array['working'];
        if (document.getElementById('markStudentAnswer'))
            document.getElementById('markStudentAnswer').innerHTML = array['working'];
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'workingArea']);
    if (document.getElementById('markingArea'))
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'markingArea']);
}

function saveWork(uid) {
    var name = prompt('Save your work as:');

    if (name !== null) {
        var data = {
            'save_name': name,
            'content': encodeURIComponent(document.getElementById('pStudentAnswer').innerHTML),
            'question_text': encodeURIComponent(document.getElementById('plainQuestionText').innerHTML),
            'answer_text': encodeURIComponent(document.getElementById('plainAnswerText').innerHTML),
            'question_id': document.getElementById('plainQuestionText').dataset.id,
            'user_id': uid,
            'resource_id': document.getElementById('workingArea').dataset.resource_id
        };

        if (document.getElementById('sid'))
            data['sourcedid'] = document.getElementById('sid').innerHTML;

        function saveDialog(response) {
            if (response == 'success') {
                document.getElementById('studentWorkTitle').innerHTML = data['save_name'];
                alert('Saved!');
            }
            else {
                alert('You must choose a different save name.');
                saveWork(uid);
            }

        }
        console.log(JSON.stringify(data));
        AJAXrequest('POST', 'saveData.php', saveDialog, 'data=' + JSON.stringify(data));
    }
}

function saveComments(qid) {
    if (confirm("Submit comments to Student?")) {
        var data = {
            'question_id': qid,
            'comment': document.getElementById('markComments').innerHTML
        };
        AJAXrequest('POST', 'saveData.php', response, 'data=' + JSON.stringify(data));

        function response(msg) {
            if (msg == 'success')
                alert('Saved!');
            else
                alert('Error: ' + msg);
        }
    }
}

function saveGrade(rid, sid) {
    var data = {
        'type': 'replace',
        'resourceID': rid,
        'sourceID': sid,
        'LISoutcome': document.getElementById('gradeScore').value / 100
    };

    AJAXrequest('POST', 'outcome.php', gradeResponse, 'data=' + JSON.stringify(data));

    function gradeResponse(response) {
        var xmlDoc;
        if (window.DOMParser)
        {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(response, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(response);
        }

        var success = xmlDoc.getElementsByTagName('imsx_codeMajor')[0].childNodes[0].nodeValue;
        if (success == 'success')
            alert('Grade saved!');
        else {
            alert('There was an error :(')
            console.log(success);
        }
    }
}

function loadWork(uid, qid) {
    if (qid)
        AJAXrequest('POST', 'loadData.php', loadQuestion, 'user_id=' + uid + '&id=' + qid);
    else
    {
        if (document.getElementById('stateFileBrowser').checked == false)
            AJAXrequest('POST', 'loadData.php', fileTable, 'user_id=' + uid);
    }

    function loadQuestion(data) {
        data = JSON.parse(data);
        var array = {
            "question": data['question_text'],
            "answer": data['answer_text'],
            "working": data['content']
        };
        setup(array);
        document.getElementById('hQuestionTitle').innerHTML = data['name'];
        var grade = document.getElementById('gradeButton');
        if (data['sourcedid']) {
            grade.dataset.rid = data['resource_id'];
            grade.dataset.sid = data['sourcedid'];
            document.getElementById('gradingDiv').style.display = 'inline-block';
        }
        else {
            delete(grade.dataset.rid);
            delete(grade.dataset.sid);
            document.getElementById('gradingDiv').style.display = 'none';
        }
        document.getElementById('newQuestionLabel').style.visibility = 'hidden';

    }

    function fileTable(data) {
        if (data.substr(0, 5) == 'error') {
            console.log(data);
        } else {
            data = JSON.parse(data);
            data.unshift({"save_name": "Save Name", "question_name": "Question"});
            var dialog = document.getElementById('fileBrowser');
            while (dialog.firstChild) {
                dialog.removeChild(dialog.firstChild);
            }
            dialog.appendChild(document.createTextNode("Choose, you must:"))
            var table = document.createElement('table');
            table.setAttribute('cellspacing', 0);
            dialog.appendChild(table);
            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');
            table.appendChild(thead);
            table.appendChild(tbody);
            for (var i = 0; i < data.length; i++) {
//            for (var name in data) {
                var tr = document.createElement('tr');
                var td1, td2;
                if (i == 0) {
                    td1 = document.createElement('th');
                    td2 = document.createElement('th');
                    thead.appendChild(tr);
                }
                else {
                    var id = data[i]['id'];
                    tr.dataset.uid = uid;
                    tr.dataset.qid = data[i]['id'];
                    tr.addEventListener('click', function () {
                        loadWork(this.dataset.uid, this.dataset.qid);
                    }, false);
                    td1 = document.createElement('td');
                    td2 = document.createElement('td');
                    tbody.appendChild(tr);
                }
                td1.appendChild(document.createTextNode(data[i]['save_name']));
                td2.appendChild(document.createTextNode(data[i]['question_name']));
                tr.appendChild(td1);
                tr.appendChild(td2);
            }
            var cancel = document.createElement('button');
            cancel.appendChild(document.createTextNode('Cancel'));
            cancel.addEventListener('click', function () {
                document.getElementById('stateFileBrowser').checked = false;
            }, false);
            dialog.appendChild(cancel);
            document.getElementById('stateFileBrowser').checked = true;
        }
    }
}

function timeAgo(tINms) {
    var now = new Date(), time = Math.floor((now - tINms) / 1000), timeUnit = 'seconds';
    if (time >= 60) {
        time = Math.floor(time / 60);
        timeUnit = 'minutes';
        if (time >= 60) {
            time = Math.floor(time / 60);
            timeUnit = 'hours';
            if (time >= 24) {
                time = Math.floor(time / 24);
                timeUnit = 'days'
                if (time >= 7 && time < 30) {
                    time = Math.floor(time / 7);
                    timeUnit = 'weeks';
                }
                else if (time >= 30) {
                    time = Math.floor(time / 30);
                    timeUnit = 'months';
                    if (time > 2)
                        time = -1;
                }
            }
        }
    }
    if (time > 0)
        return time + ' ' + timeUnit + ' ago';
    else
        return new Date(tINms);
}

function buildStudentWorkTable(data) {
    data = JSON.parse(data);
    var table = document.getElementById('studentWorkTableBody');
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            tr.dataset.uid = data[i]['user_id'];
            tr.dataset.id = data[i]['id'];
            tr.dataset.name = data[i]['fullname'];
            tr.dataset.save_name = data[i]['save_name'];
            tr.addEventListener('click', function () {
                loadWork(this.dataset.uid, this.dataset.id);
                document.getElementById('tab-4').checked = true;
                document.getElementById('studentWorkTitle').innerHTML = this.dataset.save_name;
                document.getElementById('studentFullName').innerHTML = this.dataset.name;
                document.getElementById('saveCommentsButton').dataset.id = this.dataset.id;
            }, false);
            var td1 = document.createElement('td');
            td1.innerHTML = data[i]['fullname'];
            var td2 = document.createElement('td');
            td2.innerHTML = data[i]['question_name'];
            var td3 = document.createElement('td');
            td3.innerHTML = timeAgo(Date.parse(data[i]['date']));
            var td4 = document.createElement('td');
            if (data[i]['needs_marking'])
                td4.innerHTML = 'Yes';
            else
                td4.innerHTML = 'No';
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr);
        }
    }
    else {
        table.innerHTML = '<tr><td colspan=4>no work submitted so far</td></tr>';
    }
}

function log(data) {
    console.log(data);
}

function process(originalString, variablesArray)
{
    var oldStr = originalString.match(/\[([^\[]+)\]/gi),
            showPlus = false, showOne = true, showZero = true,
            negate = false, reProcess = false;
    if (oldStr) {
        for (var i = oldStr.length - 1; i > -1; i--)
        {
            var newStr = oldStr[i].replace(/\[*\]*/g, "");
            if (newStr[0] === "?") {
                newStr = newStr.substring(1);
                reProcess = true;
            }
            if (newStr[0] === "+")
            {
                newStr = newStr.substring(1);
                showPlus = true;
            }
            if (newStr[0] === "-")
            {
                newStr = newStr.substring(1);
                negate = true;
            }
            if (newStr[0] === "!")
            {
                newStr = newStr.substring(1);
                showOne = false;
            }
            if (newStr[0] === "@")
            {
                newStr = newStr.substring(1);
                showZero = false;
            }
            if (typeof variablesArray[newStr] !== 'undefined') {
                if (variablesArray[newStr] instanceof Fraction)
                    newStr = variablesArray[newStr].string();
                else
                    newStr = variablesArray[newStr];
            }
            var temp = newStr;
            if (negate)
                if (typeof newStr == 'number')
                    newStr *= -1;
                else
                    newStr += '-';
            if (!showOne)
            {
                if (newStr === 1)
                    newStr = "";
                if (newStr === -1)
                    newStr = "-";
            }
            if (showPlus && ((typeof newStr == 'string' && newStr !== "-") || newStr > 0))
                newStr = "+" + newStr;
            if (!showZero && newStr === 0)
                newStr = "";
            negate = false;
            showZero = true;
            showOne = true;
            showPlus = false;
            if (reProcess)
                originalString = originalString.replace(oldStr[i], process(newStr, variablesArray));
            else
                originalString = originalString.replace(oldStr[i], newStr);
            reProcess = false;
        }
    }
    return originalString;
}
