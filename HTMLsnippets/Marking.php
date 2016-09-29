
<div id="markingArea" class="marking">
    <div>
        <fieldset class="markbox">
            <legend>Question</legend>
            <div id="markQuestion"></div>
        </fieldset>
        <fieldset class="markbox">
            <legend>Computed Answer</legend>
            <div id="markComputedAnswer"></div>
        </fieldset>
    </div>
    <div>
        <fieldset class="markbox">
            <legend>General Comments</legend>
            <div id="markComments" contenteditable="true"></div>
            <input id="saveCommentsButton" type="button" value="Save Comments" onclick="saveComments(this.dataset.id);">
            <div id="gradingDiv">
                <input id="gradeButton" type="button" value="Grade" onclick="saveGrade(this.dataset.rid,this.dataset.sid);">
                <label for="gradeScore">Score(%):</label>
                <input id="gradeScore" type="number" name="Score" min="0" max="100">
            </div>
        </fieldset>
        <fieldset class="markbox">
            <legend>Student's Answer</legend>
            <div id="markStudentAnswer"></div>
        </fieldset>
    </div>
</div>
