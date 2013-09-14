<?php
	$cpustats = exec('commands/getcpu.sh');

	$netstats = exec('commands/netspeed.sh eth0');

	$stats="$cpustats:$netstats";
	echo $stats;
?>
