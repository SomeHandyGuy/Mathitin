
<?php
require_once('../ims-blti/blti.php');
//require_once '../Login/db_connect.php';
//require_once '../Login/functions.php';
require_once '../Login/psl-config.php';

if (!isset($_POST['lti_message_type'])) {
    //someone has typed www.othematics.com into browser. Not an LTI request.
    header('Location: welcome.html');
}

$MY_CONNECTION = mysql_connect(HOST, USER, PASSWORD);
mysql_select_db(DATABASE);

session_start();

$lti = new BLTI(array('table' => 'csinstitution'), TRUE, FALSE);
if ($lti->valid) {
    $demo = filter_input(INPUT_POST, 'custom_demo', FILTER_SANITIZE_STRING);

    $returnPage = filter_input(INPUT_POST, 'launch_presentation_return_url', FILTER_SANITIZE_URL);

    if ($demo == 'true')
        header('Location: Demonstration.php');
    else {
        header('Location: mathitin.php');
    }
} else { //LTI request is invalid, post error message.
    ?>  
    <!DOCTYPE html>
    <html>
        <head>
            <title>LTI Configuration Error</title>
        </head>
        <body>
            <div>
                <h1>Configuration Error</h1>
                <p>This module is incorrectly configured. Please contact your System Administrator and tell them the following:</p>
                <p>
    <?php echo $lti->message ?>
                </p>
            </div>
        </body>
    </html>
<?php } ?>