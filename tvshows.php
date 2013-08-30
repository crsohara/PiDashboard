<html>
<body>
<?php
$addr = $_POST['addr'];

echo "<div>";


	$addra = str_replace('%20', ' ', $addr);
	$file = scandir($addra);
	var_dump( is_dir($addr."/".$file[2]));
	if(is_dir($addr."/".$file[2])) {
		foreach ($file as &$value) {
			$url = str_replace(' ', '%20', $value);
			echo "<form id='".$url."' onsubmit='tvshows.php' method='post'>";
			echo "<a href='javascript:;' onclick=document.getElementById('".$url."').submit();>".$value."<br>";
			echo "<input type='hidden' name='addr' value='".$addr."/".$url."'>";
			echo "</form>";
		}
	}
	else
		foreach ($file as &$value) {
			$url = str_replace(' ', '%20', $value);
			echo "<a href='".$addr."/".$url."'>".$url."</a>";
		}

echo "</div>";

?>
</body>
</html>

