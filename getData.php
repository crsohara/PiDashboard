<?php

	switch($_SERVER['QUERY_STRING']) {
		case 'getCpuRamNetData':
			$cpustats = exec('commands/getcpu.sh');
			echo $cpustats;
			//echo file_get_contents("commands/cpu_ram_net.data");
			break;
			
		case 'getCpuRamNetDetails':
			
			break;
			
		case 'getUptime':
			echo exec('commands/getuptime.sh');
			break;
			
		case 'getStuff':
			echo exec('commands/getStats.sh');
			break;
	}

?>
