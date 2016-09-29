<?php

/*
 * multipurpose untility for fetching information from Questions DB
 */

require_once '../DB/DB.php';

$error = 'Question Fetch Error: ';

if (isset($_REQUEST['method'])) {
    $method = $_REQUEST['method'];
    if ($method == 'code') {
        if (isset($_POST['id'])) {
            $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
            $database = new DB();
            $database->select('csquestion', 'code', ['id' => $id]);
            if (count($database->result) == 1) {
                echo $database->result[0]['code'];
            } else {
                echo $error . 'bad question id';
            }
        } else {
            echo $error . 'no question id';
        }
    } else if ($method == 'menu') {
        $database = new DB();
        $database->select('resource_link_questions', 'category, subcategory, name, id');
        $menuArray = [];
        $size = count($database->result);
        for ($i = 0; $i < $size; $i++) {
            $menuArray[$database->result[$i]['category']][$database->result[$i]['subcategory']][$database->result[$i]['name']] = $database->result[$i]['id'];
        }
        echo json_encode($menuArray, JSON_NUMERIC_CHECK);
    } else if ($method == 'resource') {
        if (isset($_POST['id'])) {
            $rid = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
            $database = new DB();
            if ($rid == 'all') {
                $database->select('resource_link_questions', 'category, subcategory, name, id');
            } else {
                $database->select('question_for_resource', 'category, subcategory, name, id', ['resource_id' => $rid]);
            }
            $menuArray = [];
            $size = count($database->result);
            for ($i = 0; $i < $size; $i++) {
                $menuArray[$database->result[$i]['category']][$database->result[$i]['subcategory']][$database->result[$i]['name']] = $database->result[$i]['id'];
            }
            if ($rid != 'all') {
                $database->select('csresource_link', 'can_regen,can_see_answer,can_submit', ['id' => $rid]);
                $menuArray['config'] = $database->result[0];
            }
            echo json_encode($menuArray, JSON_NUMERIC_CHECK);
        } else {
            echo $error . 'no resource link id';
        }
    } else {
        echo $error . 'incorrect method. Method = ' . $method;
    }
} else if (isset($_POST['JSONdata'])) {
    if (isset($_POST['id'])) {
        $rid = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
        $data = json_decode($_POST['JSONdata']);
        $config = json_decode($_POST['CF']);

        $database = new DB();
        $database->delete('csresource_question', ['resource_id' => $rid]);
        foreach ($data as $value) {
            $database->insert('csresource_question', ['resource_id' => $rid, 'question_id' => $value]);
        }
        $database->update('csresource_link', ['can_regen' => $config->can_regen, 'can_see_answer' => $config->can_see_answer, 'can_submit' => $config->can_submit], ['id' => $rid]);
    }
} else {
    echo $error . 'no method or data';
}
