/*jslint browser: true*/
/*global  google,$,jQuery,console*/
$(function () {
	"use strict";

	var flag = 0,
		kb = 1024,
		mb = Math.pow(1024, 2),
		tenMb = mb*10,
		gb = Math.pow(1024, 3);
		
	$('.menu-btn').click(function() {
		//$('.dropdownmenu').toggleClass('hideElement');
	});

	function toggleNightBtnText() {
		if($('.night-mode-btn').text() === 'Night Mode') {
			$('.night-mode-btn').text('Day Mode');
			$('.night-mode-btn').attr('title', '...Fighter of the Nightmode(ah-ah-ah)');
		}
		else {
			$('.night-mode-btn').text('Night Mode');
			$('.night-mode-btn').attr('title', '');
		}
	}

	$('.night-mode-btn').click(function() {
		$('body').toggleClass('night-mode');
		$('.dropdownmenu').toggleClass('night-mode');
		toggleNightBtnText();
	});


	$('.show-details-btn').click(function() {
		if(flag % 2 === 0){
			$('.barBackground').removeClass('animin');
			$('.barBackground').addClass('anim');
			$('.details').addClass('test');
		}
		else {
			$('.barBackground').removeClass('anim');
			$('.barBackground').addClass('animin');
			$('.details').removeClass('test');
		}
		flag++;
	});

	function updateProgressCpu(cpuUse, temp) {
		$('.cpuStatusBars .barFill').eq(0).css('width', cpuUse + '%');
		$('.cpuStatusBars .barText').eq(0).html(~~cpuUse);

		$('.cpuStatusBars .barFill').eq(1).css('width', temp + '%');
		$('.cpuStatusBars .barText').eq(1).html(~~temp);
	}

	function updateProgressRam(numText) {
		$('.ramStatusBars .barFill').eq(0).css('width', numText + '%');
		$('.ramStatusBars .barText').eq(0).html(~~numText);
	}

	function updateProgressNet(upSpeed, downSpeed) {
		var percent,
		units='';

		if(upSpeed < kb) {
			units = 'B/s';
			percent = (upSpeed/kb) * 100;
		}
		else if(upSpeed < mb && upSpeed > 0) {
			units = 'KB/s';
			percent = (upSpeed/mb) * 100;
			upSpeed = (upSpeed/kb).toFixed(1);
		}
		else if(upSpeed < gb && upSpeed > 0) {
			units = 'MB/s';
			percent = (upSpeed/tenMb) * 100;
			upSpeed = (upSpeed/mb).toFixed(1);
		}
		$('.netStatusBars .barText').eq(0).text(upSpeed);
		$('.netSpeedUpUnits').text(units);
		$('.netStatusBars .barFill').eq(0).css('width', ~~percent + '%');
		

		if(downSpeed < kb) {
			units = 'B/s';
			percent = (downSpeed/kb) * 100;
		}
		else if(downSpeed < mb && downSpeed > 0) {
			units = 'KB/s';
			percent = (downSpeed/mb) * 100;
			downSpeed = (downSpeed/kb).toFixed(1);
		}
		else if(downSpeed < gb && downSpeed > 0) {
			units = 'MB/s';
			percent = (downSpeed/tenMb) * 100;
			downSpeed = (downSpeed/mb).toFixed(1);
		}
		$('.netStatusBars .barText').eq(1).text(downSpeed);
		$('.netSpeedDownUnits').text(units);
		$('.netStatusBars .barFill').eq(1).css('width', ~~percent + '%');		
	}

	function updateCpuRamNetData(json) {
		$('#currentMhz').text(json.cpu.current_frequency);
		$('#usedRam').text(json.ram.used);
		$('#freeRam').text(json.ram.free);
		$('#totalRam').text(~~(json.ram.total/1024));
	}


	// ============================= Initial set up =============================	

	var updateInterval,
	dataUpdateLoop,
	
	// hold config file 
	config = [];
	
	// update the config object
	function updateConfig(key, value) {
		config[key] = value;
	}
	
	// ==================== get/show cpu/ram/net data =======================================
	function getStaticData() {
		$.ajax({
			url: 'getData.php?getCpuDetails',
			type: 'get',
			dataType: 'json',
			async: true,
			success: function(json) {

				$('#maxMhz').text(json.cpu.freq.max_frequency);
				$('#minMhz').text(json.cpu.freq.min_frequency);
				$('#currentMhz').text(json.cpu.freq.current_frequency);
				$('#currentGovernor').text(json.cpu.governor);
				$('#localAddress').text(json.net.ipv4_lan);
				$('#wanAddress').text(json.net.ipv4_wan);
				$('#hostname').text(json.net.hostname);
			}
		});
	}

	// cpu/ram/net ajax call
	function getUpdateData() {
		if(!$('#Chckbox').is(":checked")) {
			$.ajax({
				url: 'getData.php?getCpuRamNetData',
				type: 'get',
				dataType: 'json',
				async: true,
				success: function(json) {
					updateCpuRamNetData(json);
					updateProgressCpu(json.cpu.percent_used, json.cpu.temperature);
					updateProgressRam((json.ram.used/(json.ram.total/1024))*100);
					updateProgressNet(json.net.upload, json.net.download);
				} 
			});
		}
	}

	// =================== get more stats from server (stats button) ========================================

	// get stats async ajax call
	/*function getStatsFromServer() {

		$.ajax({
			url: 'getData.php?getStuff',//'stats.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				printstats(data);
			}
		 });
	}*/

	// ======================= update interval =======================================

	// show currently configured interval saved in config file
	/*function displaySavedInterval() {
		var interval = config['update-interval'];
		$('#update-interval').find('option[value="' + interval + '"]').attr("selected",true);
	}*/
	
	// update config object interval time in case it is to be saved
	$('#update-interval').change(function() {
		updateConfig('update-interval', $(this).val());
		clearInterval(dataUpdateLoop);
		updateInterval = (config['update-interval']*1000);
		dataUpdateLoop = setInterval(getUpdateData, updateInterval);
	});
	
	// ==================== current time & uptime ======================================

	// get and print system uptime
	/*function getuptime() {
		$.ajax({
			url: 'getData.php?getUptime',
			type: 'get',
			dataType: 'json',
			async: true,
			timeout: 10000,
			success: function(json) {
				// show uptime
			},
			error: function(x, t, m) {
		        if(t==="timeout") {
		            console.log("got timeout");
		        } else {
		            console.log(x + ' ' + t + ' ' + m);
		        }
		    }
		});
	}
	// get system uptime every 30 seconds
	setInterval(getuptime, 30000 );*/

	function begin() {
		//getuptime();
		getStaticData();
		getUpdateData();
		dataUpdateLoop = setInterval(getUpdateData, 3000);
	}
	begin();
});