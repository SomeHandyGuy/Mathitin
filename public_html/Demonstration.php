<?php
/*
 * User only ends up here if "Demonstration Mode" is set.
 * 
 * Ask the user what role they would like to be
 */
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Mathitin (Demonstration mode)</title>
        <link href="CSS/demo.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div>
            <h1>Welcome</h1>
            <p>This is currently running in Demonstration mode, which means you can choose your role before you proceed.</p>
            <p> You can view how this module operates as a <a href="#radioStudent">Student</a> or an <a href="#radioInstructor">Instructor</a>.</p>
            <div class=demoBox>
                <form action="mathitin.php" method="post" name="choose_role">
                    <fieldset>
                        <legend>Demonstration Mode</legend>
                        <p>What role would you like to have?</p>
                        <p><label for="radioStudent">Student</label><input id="radioStudent" type="radio" name="role" value="student" checked></p>
                        <p><label for="radioInstructor">Instructor</label><input id="radioInstructor" type="radio" name="role" value="instructor"></p>
                        <input type="submit" value="OK">                        
                    </fieldset>
                </form>
            </div>
        </div>
    </body>
</html>

