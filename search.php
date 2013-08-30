<html>
<body>
<?php
$searchfor = $_GET['keyword'];
echo $searchfor;
/*$file = 'users.txt';

$contents = file_get_contents($file);
$pattern = preg_quote($searchfor, '/');
$pattern = "/^.*$pattern.*\$/m";

if(preg_match_all($pattern, $contents, $matches)){
   echo "Found matches:<br />";
   echo implode("<br />", $matches[0]);
}
else{
   echo "No matches found";
fclose ($file); 
}
*/
?>
</body>
</html>
