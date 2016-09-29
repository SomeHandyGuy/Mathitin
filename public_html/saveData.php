<?php

include_once '../DB/DB.php';

$data = json_decode($_REQUEST['data'], TRUE);

$database = new DB();
if (isset($data['comment'])) {
    $database->insert('cswork_comments', $data);
} else {
    if ($database->count('cswork', '*', ['save_name' => $data['save_name'], 'user_id' => $data['user_id']]) > 0) {
        exit('name already exists');
    }
    $database->insert('cswork', $data);
}

exit('success');
