
	//disable notification history
	$.pnotify.defaults.history = false;	

	//initial set up of pie charts
	$(function() {
		$('.chart').easyPieChart({
			 barColor: function(percent) {
					percent /= 100;
					return "rgb(" + Math.round(255 * percent) + ", " + Math.round(255 * (1-percent)) + ", 0)";
			},
			lineWidth: 5,
			size: 60,
			animate: 1000,
			scaleColor: false,
			lineCap: 'square',
			onStep: function(value) {
					this.$el.find('span').text(~~value);
			}
		});
	});
	
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
				$('#uptime').html('Pi uptime: '+data);
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
		
		//weather=data.split(", ");
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
