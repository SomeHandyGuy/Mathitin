<div>
    <fieldset>
        <legend>Student Settings</legend>
        <label for="canRedo">Student can regenerate Questions</label>
        <input type="checkbox" id="canRedo">
        <label for="canSeeAnswer">Student can view solution</label>
        <input type="checkbox" id="canSeeAnswer">
        <label for="canSubmit">Student can submit their answer to instructor</label>
        <input type="checkbox" id="canSubmit">
        <input id="saveConfigButton" type="button" value="Save">
    </fieldset>

    <div id="instructorConfig" class="collapseTable">
        <h3>Select the questions you would like to make available for this page.</h3>
    </div>
    <script type="text/javascript">
        AJAXrequest('POST', 'questionFetcher.php', buildInstructorMenu, 'method=menu');
        AJAXrequest('POST', 'loadData.php', buildStudentWorkTable, 'resource_id=<?php echo $resource; ?>');
    </script>
</div>
