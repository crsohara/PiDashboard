<?php

	switch($_SERVER['QUERY_STRING']) {
		case 'getCpuRamNetData':
			//$cpustats = exec('commands/getcpu.sh');
			//$cpustats = file_get_contents('commands/test.dat');
			$cpustats = file_get_contents('/run/shm/pidash.dat');
			echo $cpustats;
			break;
			
		case 'getCpuRamNetStaticData':
			$staticData = exec('commands/getcpufreq.sh');
			echo $staticData;
			break;
			
		case 'getUptime':
			echo exec('commands/getuptime.sh');
			break;
			
		case 'getStuff':
			echo exec('commands/getStats.sh');
			break;

		case 'getCpuDetails':
			echo exec('commands/getcpufreq.sh cpu_details');
			break;
	}

?>
