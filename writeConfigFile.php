<?php

	$configData = json_decode(json_encode($_REQUEST['configuration']));
	
	//validate json
	if($configData == null) {
		// $configData is null because the json cannot be decoded, therefore json invalid
		header('HTTP/1.1 400');
		$result = array("status" => "0", "desc" => "Invalid json", "configdata" => $configData, "jsonconfigdata" => $json_configData);
		echo json_encode($result);
	}
	else {
		$saveResult = file_put_contents('config.txt', json_encode($_REQUEST['configuration']));
		if($saveResult) {
			header('HTTP/1.1 200 OK');
			$result = array("status" => "1", "desc" => "Config save successfully.");
			echo json_encode($result);
		}
		else {
			header('HTTP/1.1 500');
			$result = array("status" => "0", "desc" => "Could not write to file.");
			echo json_encode($result);
		}
	}
?>
