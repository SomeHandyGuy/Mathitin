<?php

include_once '../DB/DB.php';

$keys = ['id', 'save_name', 'content', 'question_text', 'answer_text', 'question_id', 'user_id', 'resource_id'];
$data = [];
foreach ($keys as $key) {
    if (isset($_POST[$key]))
        $data[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING);
}

$database = new DB();
if (isset($data['id'])) {
    $database->select('cswork', 'content,question_text,answer_text,question_id,resource_id,sourcedid', $data);
    if ($database->num_rows == 1) {
        $result = $database->result[0];      //PHP copies array (not a reference :)
        $database->select('resource_link_questions', 'category,subcategory,name', ['id' => $result['question_id']]);
        $result = array_merge($result, $database->result[0]);
        exit(json_encode($result));
    }
    exit('error: question not found');
} else {
    $database->select('cswork', 'id,save_name,question_id,user_id,resource_id,date,needs_marking', $data);
    if ($database->num_rows > 0) {
        $result = $database->result;

        $count = count($result);
        for ($i = 0; $i < $count; $i++) {
            $database->select('csquestion', 'name AS question_name', ['id' => $result[$i]['question_id']]);
            unset($result[$i]['question_id']);
            $result[$i] = array_merge($result[$i], $database->result[0]);
            $database->select('csuser', 'fullname', ['id' => $result[$i]['user_id']]);
            $result[$i] = array_merge($result[$i], $database->result[0]);
            $database->select('csresource_link', 'name', ['id' => $result[$i]['resource_id']]);
            unset($result[$i]['resource_id']);
            $result[$i] = array_merge($result[$i], $database->result[0]);
        }
        exit(json_encode($result));
    }
    exit('[]');
}