<?php

require_once '../DB/DB.php';

session_start();
if (isset($_SESSION['_basic_lti_context'])) {
    $interactiveMode = TRUE;
    $lti_context = $_SESSION['_basic_lti_context'];

    //DEBUG ONLY
//    ob_start();
//    var_dump($lti_context);
//    $dump = ob_get_clean();
//    file_put_contents('LTIvardump.txt', $dump);
    //check if context_id exists, if not then add. Then do same for resource_id and user_id
    $InstitutionID = $_SESSION['_basiclti_lti_row']['id'];
    $context = $lti_context['context_id'];
    $resource = $lti_context['resource_link_id'];
    $uid = $lti_context['user_id'];
    $username = $lti_context['lis_person_name_full'];
    $database = new DB();
    if ($database->count('cscontext', 'id', ['id' => $context]) == 0) {
        $database->insert('cscontext', ['id' => $context, 'institution' => $InstitutionID, 'name' => $lti_context['context_title']]);
    }
    if ($database->count('csresource_link', 'id', ['id' => $resource, 'context' => $context]) == 0) {
        $database->insert('csresource_link', ['id' => $resource, 'name' => $lti_context['resource_link_title'], 'context' => $context]);
    }
    if ($database->count('csuser', '*', ['id' => $uid]) == 0) {
        $database->insert('csuser', ['id' => $uid, 'fullname' => $username, 'email' => $lti_context['lis_person_contact_email_primary'], 'Institution_id' => $InstitutionID]);
    }
    if ($database->count('csuser_context', '*', ['user_id' => $uid, 'context_id' => $context]) == 0) {
        $database->insert('csuser_context', ['user_id' => $uid, 'context_id' => $context]);
    }

    //check for outcome_url and update if necessary
    if (isset($lti_context['lis_outcome_service_url'])) {
        $database->select('csinstitution', 'outcome_url', ['id' => $InstitutionID]);
        if ($database->num_rows == 1) {
            if ($database->result[0]['outcome_url'] != $lti_context['lis_outcome_service_url']) {
                $database->update('csinstitution', ['outcome_url' => $lti_context['lis_outcome_service_url']], ['id' => $InstitutionID]);
            }
        }
    }

    //check for sourceDID and embed in page
    $sourcedid = (isset($lti_context['lis_result_sourcedid'])) ? "<div id='sid' style='display:none'>{$lti_context['lis_result_sourcedid']}</div>" : '';

    $role = 'student';
    if (isset($lti_context['custom_demo'])) {
        $role = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_STRING);
    } else {
        $role_long = strtolower($lti_context['roles']);
        if (( strpos($role_long, "instructor") !== false || strpos($role_long, "administrator") !== false)) {
            $role = 'instructor';
        }
    }
} else if (isset($_REQUEST['mode']) && $_REQUEST['mode'] == 'simple') {
    $interactiveMode = FALSE;
    $resource = 'all';
    $role = 'student';
    $sourcedid='';
} else {
    header('Location: admin_login.php');
    exit();
}
if (isset($role) && $role == 'instructor') {
    include '../HTMLsnippets/InstructorView.php';
} else {
    include '../HTMLsnippets/StudentView.php';
}
?>