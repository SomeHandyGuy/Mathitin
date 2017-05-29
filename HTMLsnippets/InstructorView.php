<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Mathitin</title>
        <link href="CSS/Mathitin.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/menu.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/statTableCSS.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/ShowMe.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/fileBox.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/loader.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/collapseTable.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/Marking.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="favicon.ico"/>
        <script src="JS/ASCIIMathML.js" type="text/javascript"></script>
        <script src="JS/MathUtil.js" type="text/javascript"></script>
        <script src="JS/Fraction.js" type="text/javascript"></script>
        <script src="JS/Algebra.js" type="text/javascript"></script>
        <script src="JS/Graphit.js" type="text/javascript"></script>
        <script src="JS/statTable.js" type="text/javascript"></script>
        <script src="JS/mathitin.js" type="text/javascript"></script>
        <script src="JS/QuestionEditor.js" type="text/javascript"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>
    </head>
    <body onload="AJAXrequest('POST', 'questionFetcher.php', buildMenu, 'method=resource&id=<?php echo $resource; ?>');">
        <div id='loadingBar' class="bar"><span></span></div>
        <div id="instructorNavTabs">
            <div class="tab">
                <input type="radio" id="tab-1" name="navTabs1" checked>
                <label for="tab-1">Configuration</label>

                <?php include 'Configuration.php'; ?>

            </div>
            <div class="tab">
                <input type="radio" id="tab-2" name="navTabs1">
                <label for="tab-2">View Student Work</label>
                <div id="viewStudentWork" class="fileBox">
                    <h3>Work submitted by students so far...</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Question</th>
                                <th>Date Submitted</th>
                                <th>Needs Marking</th>
                            </tr>
                        </thead>
                        <tbody id="studentWorkTableBody"></tbody>
                    </table>
                </div>
            </div>
            <div class="tab">
                <input type="radio" id="tab-3" name="navTabs1">
                <label for="tab-3">Student Preview</label>

                <?php include 'Student.php'; ?>

            </div>
            <div class="tab">
                <input type="radio" id="tab-4" name="navTabs1">
                <label for="tab-4">Mark</label>

                <?php include 'Marking.php'; ?>

            </div>
            <div class="tab">
                <input type="radio" id="tab-5" name="navTabs1">
                <label for="tab-5">Question Editor</label>

                <?php include 'QuestionEditor.php'; ?>

            </div>
        </div>        
    </body>
</html>
