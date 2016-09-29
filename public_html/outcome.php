<?php

require_once '../DB/DB.php';
require_once '../ims-blti/OAuth.php';

$data = json_decode($_POST['data'], TRUE);

$result = ($data['type'] == 'replace') ? "<result><resultScore><language>en</language><textString>{$data['LISoutcome']}</textString></resultScore></result>" : "";

$database = new DB();
$database->select('csresource_link', 'context', ['id' => $data['resourceID']]);
if ($database->num_rows == 1) {
    $context = $database->result[0]['context'];
    $database->select('cscontext', 'institution', ['id' => $context]);
    if ($database->num_rows == 1) {
        $InstitutionID = $database->result[0]['institution'];
        $database->select('csinstitution', 'oauth_consumer_key,secret,outcome_url', ['id' => $InstitutionID]);
        if ($database->num_rows == 1) {
            $key = $database->result[0]['oauth_consumer_key'];
            $secret = $database->result[0]['secret'];
            $url = $database->result[0]['outcome_url'];
//$database->select('csinstitution JOIN cscontext JOIN csresource_link', 'csinstitution.oauth_consumer_key, csinstitution.secret, csinstitution.outcome_url', ['csinstitution.id' => 'cscontext.institution', 'csresource_link.context' => 'cscontext.id', 'csresource_link.id' => $data['resourceID']]);

            $xml = "<?xml version = '1.0' encoding = 'UTF-8'?>
<imsx_POXEnvelopeRequest xmlns = 'http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0'>
  <imsx_POXHeader>
    <imsx_POXRequestHeaderInfo>
    <imsx_version>V1.0</imsx_version>
    <imsx_messageIdentifier>999999123</imsx_messageIdentifier>
    </imsx_POXRequestHeaderInfo>
  </imsx_POXHeader>
  <imsx_POXBody>
    <{$data['type']}ResultRequest>
      <resultRecord>
        <sourcedGUID>
          <sourcedId>{$data['sourceID']}</sourcedId>
        </sourcedGUID>
        $result
      </resultRecord>
    </{$data['type']}ResultRequest>
  </imsx_POXBody>
</imsx_POXEnvelopeRequest>";

//            echo $xml;

            echo sendOAuthBodyPOST('POST', $url, $key, $secret, 'xml', $xml);
        }
    }
}
exit();

function sendOAuthBodyPOST($method, $endpoint, $oauth_consumer_key, $oauth_consumer_secret, $content_type, $body) {
    $hash = base64_encode(sha1($body, TRUE));

    $parms = array('oauth_body_hash' => $hash);

    $test_token = '';
    $hmac_method = new OAuthSignatureMethod_HMAC_SHA1();
    $test_consumer = new OAuthConsumer($oauth_consumer_key, $oauth_consumer_secret, NULL);

    $acc_req = OAuthRequest::from_consumer_and_token($test_consumer, $test_token, $method, $endpoint, $parms);
    $acc_req->sign_request($hmac_method, $test_consumer, $test_token);

// Pass this back up "out of band" for debugging
    global $LastOAuthBodyBaseString;
    $LastOAuthBodyBaseString = $acc_req->get_signature_base_string();
// echo($LastOAuthBodyBaseString."\m");

    $header = $acc_req->to_header();
    $header = $header . "\r\nContent-type: " . $content_type . "\r\n";

    $params = array('http' => array(
            'method' => 'POST',
            'content' => $body,
            'header' => $header
    ));
    $ctx = stream_context_create($params);
    $fp = @fopen($endpoint, 'rb', false, $ctx);
    if (!$fp) {
        throw new Exception("Problem with $endpoint, $php_errormsg");
    }
    $response = @stream_get_contents($fp);
    if ($response === false) {
        throw new Exception("Problem reading data from $endpoint, $php_errormsg");
    }
    return $response;
}
