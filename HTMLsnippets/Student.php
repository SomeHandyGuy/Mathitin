<?php
if ($interactiveMode) {
    $saveWork = ($role == 'instructor') ? "disabled" : "onclick='saveWork(\"$uid\");'";
    $loadWork = ($role == 'instructor') ? "disabled" : "onclick='loadWork(\"$uid\");'";
}
?>

<script type="application/json" id="storedVars"></script>

<div class="studentArea">
    <nav>
        <div class="menu">
            <label for="newQuestionButton">New Question</label>
            <?php if ($interactiveMode) { ?>
                <label <?php echo $loadWork ?> >Load Question</label>
                <label onclick="if (confirm('Exit now?'))
                                window.location = '<?php echo $lti_context['launch_presentation_return_url']; ?>';">Exit</label>
                   <?php } else { ?>
                <div></div>
            <?php } ?>
        </div>
        <input class="toggle" type="checkbox" id="newQuestionButton">
        <div id="menuDiv" class="toggle"></div>
    </nav>
    <input class="toggle" type="checkbox" id="stateWorkingArea">
    <div id="workingArea" class="toggle" data-resource_id="<?php echo $resource; ?>">
        <div class="tabletScreen">
            <div class="backlight"><div id="question">
                    <h1 id="hQuestionTitle">Question Title</h1>
                    <p id="pQuestionText">Question text...</p>
                </div>
                <label id="showAnswerLabel" for="showAnswerButton" class="niceLookingButton" style="visibility: hidden">Show Me The Answer</label>
                <label id="newQuestionLabel" class="niceLookingButton orange" style="visibility: hidden">New Question</label>
                <input class="toggle" type="checkbox" id="showAnswerButton">
                <div id="answer" class="toggle"></div>
            </div>
        </div>
        <input class="toggle" type="checkbox" id="stateLinePaper" checked>
        <div id="studentAnswer" class="paper toggle" >
            <div class="answerHeading">
                <h1 id="studentWorkTitle">My Answer</h1>
                <?php if ($interactiveMode) { ?>
                    <em>by <span id="studentFullName"><?php echo $username ?></span></em>
                <?php } ?>
            </div>
            <p id="pStudentAnswer"></p>
            <textarea id="typingArea" class="typeArea" placeholder="type your answer here" onkeyup="typeSet(event);"></textarea>
            <?php if ($interactiveMode) { ?>
                <input id="saveWorkButton" type="button" class = "niceLookingButton" <?php echo $saveWork ?> value='Save Question'>
                <div id="markerComment" class="markbox"></div>
            <?php } ?>
        </div>
    </div>
</div>
<input class="toggle" type="checkbox" id="stateFileBrowser">
<div id="fileBrowser" class="fileBox toggle">
    Select question to load:
</div>

<?php if($interactiveMode) { ?>
<div style="display: none">
    <div id="plainQuestionText"></div>
    <div id="plainAnswerText"></div>
    <?php echo $sourcedid ?>
</div>
<?php } ?>
