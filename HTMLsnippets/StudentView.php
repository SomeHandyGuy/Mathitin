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
        <link rel="shortcut icon" href="favicon.ico"/>
        <script src="JS/ASCIIMathML.js" type="text/javascript"></script>
        <script src="JS/MathUtil.js" type="text/javascript"></script>
        <script src="JS/Fraction.js" type="text/javascript"></script>
        <script src="JS/Algebra.js" type="text/javascript"></script>
        <script src="JS/Graphit.js" type="text/javascript"></script>
        <script src="JS/statTable.js" type="text/javascript"></script>
        <script src="JS/mathitin.js" type="text/javascript"></script>
        <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML"></script>
    </head>
    <body onload="AJAXrequest('POST', 'questionFetcher.php', buildMenu, 'method=resource&id=<?php echo $resource; ?>');">
        <div id='loadingBar' class="bar"><span></span></div>

        <?php include 'Student.php';?>

    </body>
</html>