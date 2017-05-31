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
