/*jslint browser: true*/
/*global  google,$,jQuery,console*/
$(document).ready(function () {
	// ============================= Initial set up =============================
	
	"use strict";
	
	// weather related variables.
	var weatherApiUrl = 'http://api.wunderground.com/api/3ac2dad33e6ae0c6/conditions',
	weatherDataType = '.json',
	
	// time
	currentTimeString,
	
	// data update interval
	updateInterval,
	dataUpdateLoop,
	
	// hold config file 
	config = [],
	
	//  History chart variables
	cpuTitles = ["", "% / \u00B0c", ""],
	netTitles = ["Net Speed", "kbp/s", ""],
	ramTitles = ["","Mb",""],

	cpuChart = new google.visualization.AreaChart(document.getElementById('cpu-vis')),
	ramChart = new google.visualization.AreaChart(document.getElementById('ram-vis')),
	netChart = new google.visualization.AreaChart(document.getElementById('net-vis')),

	chartSize = [500, 200],
	colours = ["green","#E30B5C","orange","blue", "red"],
	newcpudata = ['',0,0],
	newnetdata = ['',0,0],
	newramdata = ['',0],

	cpuarray = [ ['Time', 'CPU', 'Temp'], ['', 0, 0] ],
	ramarray = [ ['', 'Used'], ['', 1] ],
	netarray = [ ['Time', 'Up', 'Down'], ['', 0, 0] ],
	updateHistoryLength = 20,
	boxWidth = 220;
	
	
	// initial set up of pie charts
	$(function () {
		$('.chart').easyPieChart({
			 barColor: function(percent) {
				percent /= 100;
				return "rgb(" + Math.round(255 * percent) + ", " + Math.round(255 * (1-percent)) + ", 0)";
			},
			lineWidth: 10,
			size: 80,
			animate: 1000,
			scaleColor: false,
			trackColor: '#E0E4CC',
			lineCap: 'square',
			onStep: function(value) {
				this.$el.find('span').text(~~value); // ~~ = bitwise Math.floor
			}
		});
	});
	
	// update the config object
	function updateConfig(key, value) {
		config[key] = value;
	}
	
	
	// =============== History charts ===============================================================================
		
	function drawCpuHistoryChart() {
		var data = google.visualization.arrayToDataTable(cpuarray);
	  
		// Craw the cpu history chart.
		cpuChart.draw(data, {
		  isStacked: false,
		  width: chartSize[0],
		  height: chartSize[1],
		  vAxis: {
			title: cpuTitles[1],
			viewWindowMode: 'explicit',
			viewWindow: {
					max:120,
					min:1
				  }},
		  hAxis: { title: cpuTitles[2] },
		  colors: [ colours[0], colours[1] ]
		});
	}
	
	function drawRamHistoryChart() {
		var data = google.visualization.arrayToDataTable(ramarray);
	  
		// Draw the ram history chart.
		ramChart.draw(data, {
		  title : ramTitles[0],
		  isStacked: false,
		  width: chartSize[0],
		  height: chartSize[1],
		  vAxis: {title: ramTitles[1],
		  viewWindowMode: 'explicit',
			viewWindow: {
					max:512,
					min:1
				  }},
		  hAxis: {title: ramTitles[2]},
		  colors: [colours[4]]
		});
	}

	function drawNetHistoryChart() {
		var data = google.visualization.arrayToDataTable(netarray);
	  
		// Draw the network history chart.
		netChart.draw(data, {
		  title : netTitles[0],
		  isStacked: false,
		  width: chartSize[0],
		  height: chartSize[1],
		  vAxis: {title: netTitles[1]},
		  hAxis: {title: netTitles[2]},
		  colors: [colours[2], colours[3]]
		});
	}

	
	// ==================== get/show cpu/ram/net data =======================================

	// cpu/ram/net ajax call
	function getUpdateData() {
		var vars;
		if(!$('#Chckbox').is(":checked")) {
			$.ajax({
				url: 'getData.php?getCpuRamNetData',//'getcpu.php',
				type: 'get',
				dataType: 'html',
				async: true,
				success: function(data) {
					vars = data.split(':');
					$("#cpuid").data('easyPieChart').update(vars[0]);
					$("#cputemp").data('easyPieChart').update(vars[1]);
					$("#freemem").data('easyPieChart').update(vars[2]);
					$("#upspeed").data('easyPieChart').update(vars[3]);
					$("#downspeed").data('easyPieChart').update(vars[4]);
					$("#cur-cpu-freq").text(vars[5]);
					$("#ramused").text(vars[6]);
					$("#ramfree").text(vars[7]);
					$("#upspeedtxt").text(vars[3]);
					$("#downspeedtxt").text(vars[4]);
					
					
					// keep the cpu data for the past 20 updates
					// but only print to graph when it is visible
					newcpudata[0] = currentTimeString;
					newcpudata[1] = Math.round(vars[0]);
					newcpudata[2] = Math.round(vars[1]);

					if(cpuarray.length === updateHistoryLength) {
						cpuarray.splice(1, 1);
					}

					cpuarray.push(newcpudata.slice(0));
					drawCpuHistoryChart();
					
					newramdata[0] = currentTimeString;
					newramdata[1] = Math.round(vars[2]);
					
					if(ramarray.length === updateHistoryLength) {
						ramarray.splice(1,1);
					}
					
					ramarray.push(newramdata.slice(0));
					drawRamHistoryChart();

					newnetdata[0] = currentTimeString;
					newnetdata[1] = Math.round(vars[3]);
					newnetdata[2] = Math.round(vars[4]);
					
					if(netarray.length === updateHistoryLength) {
						netarray.splice(1, 1);
					}

					netarray.push(newnetdata.slice(0));
					drawNetHistoryChart();
				} 
			});
		}
	}
	
	// ================ show/hide history charts ==============================================================================
	
	// show history charts when expand arrows are clicked
	$('#show-cpu-hist').add('#show-ram-hist').add('#show-net-hist').click(function() {
		if($(this).parent().width() < 300) {
			$(this).parent().width(boxWidth + 500 + 'px');
			$(this).children(":first").css({backgroundPosition: '-430px -72px'});
			drawCpuHistoryChart();	
			drawRamHistoryChart();
			drawNetHistoryChart();
		}
		else {
			$(this).parent().width(boxWidth + 'px');
			$(this).children(":first").css({backgroundPosition: '-454px -72px'});
		}
	});
	

	// =================== get more stats from server (stats button) ========================================
	
	// print stats to page
	function printstats(data){
		$("#status").attr("style", "display:block;").html(data);
		
		$(function() {
			$('.chart').easyPieChart({
				barColor: function(percent) {
					percent /= 100;
					return "rgb(" + Math.round(255 * (1-percent)) + ", " + Math.round(255 * percent) + ", 0)";
				},
				trackColor: false,
				animate: 1000,
				scaleColor: false,
				lineCap: 'square'
			});
		});
	}
	
	// get stats async ajax call
	function getStatsFromServer() {

		$.ajax({
			url: 'getData.php?getStuff',//'stats.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				printstats(data);
			}
		 });
	}
	
	// add listener to stats button
	// if stats are already displayed hide them, otherwise get stats from server and display.
	$(function () {
		$('#show-status-btn').click(function () {
			if ($("#status").attr("style") === "display:block;") {
				$("#status").attr("style", "display:none;");
			}
			else {
				getStatsFromServer();
			}
		});
	});
	
	
	// ==================== weather =======================================
	
	// display the new weather data and icon
	function updateWeatherContent(weather_data) {
		$('#imgweather').attr('src', 'images/tick_weather_icons/' + weather_data.current_observation.icon + '.png');
		$('#weatherlabel').text(weather_data.current_observation.temp_c + "\u00B0c " + weather_data.current_observation.weather);
		$('#weatherloc').text(weather_data.current_observation.display_location.full);
		$('#weatherupdatetime').text(currentTimeString);
	}
	
	// query wunderground api for weather data
	function getWeatherData(location) {
		var url = weatherApiUrl + location + weatherDataType;
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(parsed_json) {
				updateWeatherContent(parsed_json);
			}
		});
	}
	
	// used to display weather and check show weather checkbox based on show-weather flag in conf file. used on page load.
	function showWeatherOnLoad(){
		if( config.weather['show-weather'] === '1' || $('#show-weather-check').is(':checked') ) {
			$(".weather").attr("style", "display:block;");
			$('#show-weather-check').prop("checked", true);
			console.log(config.weather['show-weather']);
			return true;
		}
		return false;
	}
	
	// show/hide weather area
	function toggleWeatherOnOff(toggle) {

		if( toggle.is(':checked') ){
			$(".weather").attr("style", "display:block;");
			getWeatherData( config.weather['location-code'] );
			config.weather['show-weather'] = '1';
		}
		else {
			$(".weather").attr("style", "display:none;");
			config.weather['show-weather'] = '0';
		}
	}
	
	// show weather toggle + change config to new value
	$('#show-weather-check').click(function (){
		toggleWeatherOnOff( $(this) );
	});
	
	// weather autocomplete location search
	$('#new-weather-location').keyup(function () {

		$.ajax({
		
			url: 'http:// autocomplete.wunderground.com/aq?query=' + $(this).val() + '&format=JSON',
			dataType: 'jsonp',
			jsonp:    "cb",
			success: function (data) {
				$('#auto-one').text(data.RESULTS[0].name);
				$('#auto-two').text(data.RESULTS[1].name);
				$('#auto-three').text(data.RESULTS[2].name);
				$( ".ui-menu-one" ).data( "url", data.RESULTS[0].l );
			}
		});
		
		if ($('#new-weather-location').val() === "") {
			$('#ui-autocomplete').css({display: 'none'});
		}
		else {
			$('#ui-autocomplete').css({display: 'block'});
		}
	});
	
	// on selecting a location, update weather for that location
	$('.ui-menu-one').click(function () {
	
		getWeatherData( $(this).data("url") );
		// updateConfig( "['weather']['show-weather']", $(this).data("url") );
		config.weather['show-weather'] = $(this).data("url");
		$('#new-weather-location').val("");
		$(this).parent().css({display: 'none'});
		
	});

	
	// ======================= update interval =======================================

	// show currently configured interval saved in config file
	function displaySavedInterval() {
		var interval = config['update-interval'];
		$('#update-interval').find('option[value="' + interval + '"]').attr("selected",true);
	}
	
	// update config object interval time in case it is to be saved
	$('#update-interval').change(function() {
		
		updateConfig('update-interval', $(this).val());
		// config['update-interval'] = $(this).val();

		clearInterval(dataUpdateLoop);
		
		updateInterval = (config['update-interval']*1000);
		
		dataUpdateLoop = setInterval(getUpdateData, updateInterval);
		
	});
	
	
	// ==================== current time & uptime =======================================

	// format minutes and second single digit values to two digits e.g. format 1 to 01, 2 to 02
	function checkDigit(i) {
		if(i < 10) {
			return "0" + i;
		}
		return i;
	}
	
	// calculate the current time
	function calculateCurrentTime() {
		var today, h, m, s;
		today = new Date();
		h = today.getHours();
		m = checkDigit(today.getMinutes());
		s = checkDigit(today.getSeconds());

		return {
			hour: h,
			minute: m,
			second: s
		};
	}
	
	// print time and set currentTimeString
	function showtime() {
		var time = calculateCurrentTime();
		$('#time').html(time.hour + ":" + time.minute + ":" + time.second);
		currentTimeString = time.hour + ":" + time.minute + ":" + time.second;
	}
	
	// update and print the current time every second
	setInterval(showtime, 1000 );
	
	// get and print system uptime
	function getuptime() {
		$.ajax({
			url: 'getData.php?getUptime',//'getuptime.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				$('#uptime').html(data);
			} 
		});
	}
	
	// get system uptime every 30 seconds
	setInterval(getuptime, 30000 );
	

	// ================== configuration ===================================
	
	// send current config back to system and save to file
	function saveConfiguration() {
		console.log("Saving configuration...");
		
		$.ajax({
			url: 'writeConfigFile.php',
			dataType: 'json',
			type: 'POST',
			async: true,
			data: ({
				configuration: config
			}),
			success: function(response){
				if(response.status === '1') {
					console.log(response.desc);
				}
			},
			error: function(xhr){
				console.log('Error: ' + JSON.parse(xhr.responseText).desc );
			}
		});
	}
	
	// save config to system
	$('#save-config-btn').click(function() { 
		saveConfiguration(); 
	});
	
	// load config to javascript object
	function getconf(){
		var url = 'config.json';
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			success: function(data) { config = data;},
			async: false
		});
		
		updateInterval = (config['update-interval'] * 1000);
		console.log(updateInterval);
		if (showWeatherOnLoad()) {
			showtime();
			getWeatherData( config.weather['location-code'] );
			console.log(currentTimeString);
		}
		displaySavedInterval();	
	}

	function begin() {
		showtime();
		getconf();
		getuptime();
		getUpdateData();
		dataUpdateLoop = setInterval(getUpdateData, updateInterval );
	}
	begin();




});
