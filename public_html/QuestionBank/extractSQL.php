<?php

require_once '..\..\DB\DB.php';

$database = new DB();
$database->select('csquestion');
$meta = [];
for ($i = 0; $i < count($database->result); $i++) {
    $id = $database->result[$i]['id'];
    $meta[$i] = ['id' => $id,
        'name' => $database->result[$i]['name'],
        'sub' => $database->result[$i]['sub_id']];
    $file = $id . '.js';
    $text = "";
    if (isset($database->result[$i]['question'])) {
        $text = "qNum['question']='" . $database->result[$i]['question'] . "'; qNum['answer']='" . $database->result[$i]['answer'] . "';";
    }
    $code = "function makeVars" . $id . "(){" . $database->result[$i]['code'] . "$text setup( $id ,qNum);} makeVars" . $id . "();";
    file_put_contents($file, $code);
}
file_put_contents('QuestionManifest.json', json_encode($meta));
