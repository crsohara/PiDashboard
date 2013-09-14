
	//disable notification history
	$.pnotify.defaults.history = false;	

	//initial set up of pie charts
	$(function() {
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
					this.$el.find('span').text(~~value);
			}
		});
	});
	
//================================================================================================
var cpuTitles = ["", "kb/s", "Day"];
var netTitles = ["Net Speed", "kbp/s", "Day"];
var chartSize = [500, 154];
var colours = ["green","#E30B5C","orange","blue"];
var newcpudata = ['now',0,0];
var newnetdata = ['now',0,0];
var showing = 0;
var netshowing =0;
var darray = [
	  ['day',   'CPU', 'Temp'],
	  ['02/09',    1,      30],
	  ['03/09',    1,      30],
	  ['04/09',    1,      30],
	  ['05/09',    1,      30],
	  ['06/09',    1,      30]
	    ];
	    
var netarray = [
	  ['day',	'up',	'down'],
	  ['1',		1,		1],
	  ['2',		1,		1],
	  ['3',		1,		1],
	  ['4',		1,		1],
	  ['5',		1,		1]
		];
	    
function drawCpuVisualization() {
	// Some raw data (not necessarily accurate)
	var data = google.visualization.arrayToDataTable(darray);
	  
	// Create and draw the visualization.
	var ac = new google.visualization.AreaChart(document.getElementById('cpu-vis'));
	ac.draw(data, {
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
	  chartArea: { width: "65%" },
	  colors: [ colours[0], colours[1] ]
	});
}
function drawNetVisualization() {
	// Some raw data (not necessarily accurate)
	var data = google.visualization.arrayToDataTable(netarray);
	  
	    // Create and draw the visualization.
	var ac = new google.visualization.AreaChart(document.getElementById('net-vis'));
	ac.draw(data, {
	  title : netTitles[0],
	  isStacked: false,
	  width: chartSize[0],
	  height: chartSize[1],
	  vAxis: {title: netTitles[1]},
	  hAxis: {title: netTitles[2]},
	  colors: [colours[2], colours[3]]
	});
}

function drawVisualization() {
}
//================================================================================================
	
	var w = 220;
	//show history graphs
	$(function() {
		$('#show-cpu-hist').click(function(){
			if($('.cpubox').width() < 300)
			{
				$('.cpubox').width(w + 500 + 'px');
				$('#show-cpu-icon').css({backgroundPosition: '-430px -72px'});
				drawCpuVisualization();
				showing=1;
			}
			else
			{
				$('.cpubox').width(w + 'px');
				$('#show-cpu-icon').css({backgroundPosition: '-454px -72px'});
				showing=0;
			}
		});
		$('#show-ram-hist').click(function(){
			if($('.rambox').width() < 300)
			{
				$('.rambox').width(w + 500 + 'px');
				$('#show-ram-icon').css({backgroundPosition: '-430px -72px'});
				
			}
			else
			{
				$('.rambox').width(w + 'px');
				$('#show-ram-icon').css({backgroundPosition: '-454px -72px'});
			}
		});
		$('#show-net-hist').click(function(){
			if($('.netbox').width() < 300)
			{
				$('.netbox').width(w + 500 + 'px');
				$('#show-net-icon').css({backgroundPosition: '-430px -72px'});
				drawNetVisualization();
				netshowing=1;
			}
			else
			{
				$('.netbox').width(w + 'px');
				$('#show-net-icon').css({backgroundPosition: '-454px -72px'});
				netshowing=0;
			}
		});
	});
	
	
	
	
	//show current time
	$(function() {
		function showtime() 
		{
			var today=new Date();
			var h=today.getHours();
			var m=today.getMinutes();
			var s=today.getSeconds();
			m=checkDigit(m);
			s=checkDigit(s);
			$('#time').html(h + ":" + m + ":" + s);
			
		}
		function checkDigit(i) {
			if(i < 10)
				return "0" + i;
			return i;
		}
		t=setInterval(function(){showtime();}, 1000);
	});
	
	//add listener to stats button
	$(function() {
		$('#show-status-btn').click(function() {
				if($("#status").attr("style") == "display:block;")
				{
					$("#status").attr("style", "display:none;");
				}
				else
				{
					getStatusFromServer();
				}
			return false;
		});
	});
	
	//uptime async ajax call - every 30 seconds
	getuptime();
	setInterval(function (){getuptime();}, 30000);
	function getuptime() {
		$.ajax({
			url: 'getuptime.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				$('#uptime').html(data);
			} 
		});
	}
	
	//cpu and ram async ajax call - every 3 seconds
	call();
	setInterval(function () { call(); }, 3000);

	function call() {
		if(!$('#Chckbox').is(":checked")) {
			var cpureq = $.ajax({
				url: 'getcpu.php',
				type: 'get',
				dataType: 'html',
				async: true,
				success: function(data) {
					$vars = data.split(':');
					$("#cpuid").data('easyPieChart').update($vars[0]);
					$("#cputemp").data('easyPieChart').update($vars[1]);
					$("#freemem").data('easyPieChart').update($vars[2]);
					$("#upspeed").data('easyPieChart').update($vars[3]);
					$("#downspeed").data('easyPieChart').update($vars[4]);
					
					
					//keep the cpu data for the past 5 updates (only cpu for now, ram and net speed to be added later)
					//but only print to graph when it is visible
					newcpudata[1] = Math.round($vars[0]);
					newcpudata[2] = Math.round($vars[1]);
					darray.splice(1, 1);
					darray.push(newcpudata.slice(0));
					if(showing == 1)
					{
						drawCpuVisualization();
					}

					newnetdata[1] = Math.round($vars[3]);
					newnetdata[2] = Math.round($vars[4]);
					netarray.splice(1, 1);
					netarray.push(newnetdata.slice(0));
					if(netshowing == 1)
					{
						drawNetVisualization();
					}
					
				} 
			});
		}
	}
	
	
	getWeather();
	function getWeather() {
		/*$.pnotify({
			title: 'Updating weather',
			text: 'Please Wait...',
		});*/
		
		var req = $.ajax({
			url: 'getWeather.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				//result = data;
				printweather(data);
				$.pnotify({
				title: 'Success',
				text: 'Weather updated.',
				type: 'success'
			});
			}
		});
	}
	function printweather(data){
		
		if(data.toLowerCase().indexOf('c') >=0)
		{
		//alert();
			$(".weather").attr("style", "display:block;")
			$("#weatherlabel").html(data);
		}
	}
	
	
	//status async ajax call
	function getStatusFromServer() {
		$.pnotify({
			title: 'Generating stats',
			text: 'Please Wait...',
		});
		var req = $.ajax({
			url: 'stats.php',
			type: 'get',
			dataType: 'html',
			async: true,
			success: function(data) {
				//result = data;
				printstats(data);
				$.pnotify({
				title: 'Success',
				text: 'Stats generated successfully',
				type: 'success'
			});
			}
		 });
		/*req.done(function( response) {
			$.pnotify({
				title: 'Success',
				text: 'Stats generated successfully',
				type: 'success'
			});
			*/
	};

	//print stats to page
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
	
	
	//get, parse and print weather
	function getweather(data){
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
