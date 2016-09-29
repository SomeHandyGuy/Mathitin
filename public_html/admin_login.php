<?php
include_once '../Login/db_connect.php';
include_once '../Login/functions.php';

sec_session_start();

// Require https
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Administrators Login</title>
        <link rel="stylesheet" href="styles/main.css" />
        <script type="text/JavaScript" src="JS/sha512.js"></script> 
        <script type="text/JavaScript" src="JS/forms.js"></script> 
    </head>
    <body>
        <?php
        if (isset($_GET['error'])) {
            echo '<p class="error">Error Logging In!</p>';
        }
        ?> 
        <form action="pass_to_login.php" method="post" name="login_form">                      
            Email: <input type="text" name="email" />
            Password: <input type="password" 
                             name="password" 
                             id="password"/>
            <input type="button" 
                   value="Login" 
                   onclick="formhash(this.form, this.form.password);" /> 
        </form>

        <?php
        echo '<p>Currently logged ' . $logged;
        if (login_check($mysqli) == true) {
            echo ' as ' . htmlentities($_SESSION['username']) . '.</p>';
            echo '<p>Do you want to change user? <a href="logout.php">Log out</a>.</p>';
            echo '<p>Do you want to register a new admin user? <a href="register.php">Register</a>.</p>';
        } else {
            echo '.</p>';
            echo "<p>If you don't have a login then you shouldn't be here >:( </p>";
        }
        ?>      
    </body>
</html>
