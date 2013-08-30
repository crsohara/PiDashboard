<html>
<head>
<title>Pi Dashboard</title>

<link rel="icon" href="images/favicon.ico" type="image/x-ico">
	<link rel="stylesheet" type="text/css" href="style.css">
	
	<script language="javascript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<!--<script language="javascript" type="text/javascript" src="87.198.20.15/jquery-2.0.3.min.js">-->
	
	
	<!-- pnotify -->
	<script src="pnotify-1.2.0/jquery.pnotify.js" type="text/javascript"></script>
	<link href="pnotify-1.2.0/jquery.pnotify.default.css" media="all" rel="stylesheet" type="text/css" />
	<!-- Include this file if you are using Pines Icons. -->
	<!--<link href="pnotify-1.2.0/pinesIcons/jquery.pnotify.default.icons.css" media="all" rel="stylesheet" type="text/css" />-->
	
	<!-- Bootstrap -->
	<link href="bootstrap/css/bootstrap.css" id="bootstrap-css" rel="stylesheet" type="text/css" />
	<link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Easy Pie Chart -->
	<script type="text/javascript" src="piechart/jquery.easy-pie-chart.js"></script>
	<link rel="stylesheet"type="text/css" href="piechart/jquery.easy-pie-chart.css">
	
	
	<script>
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

	</script>
</head>
<body>
	
<div class="navbar">
	<div class="navbar-inner">
		<div class="cont">
			<ul class="nav">
				<li class>
					<a href="javascript:;" onclick="document.getElementById('movieform').submit();">Movies</a>
				</li>
				<li class>
					<a href="javascript:;" onclick="document.getElementById('tvform').submit();">Tv Shows</a>
				</li>
				<li class>
					<a href=#  id="xxx">Music</a>
				</li>
				<li class>
					<a href="#" id="show-status-btn" >Stats</a>
				</li>
			</ul>
			<div id="uptime">
			</div>
		</div>
	</div>
</div>


<div id="top">
<div id="content">
	<div id="header">
		<div class="cont">
			<div id="logo-area">
				<h1><a href="javascript:void(0);" id="logo-link"><span id="pi-span">Pi</span> Dashboard</a></h1>
			</div>
			<div id="search-area">
				<form id="search-form" action="search.php" method="GET">
				<input type="text" id="searchbox" name="keyword"><input id="search-btn" type="image" src="images/search_box_icon.png">
				</form>
			</div>
		</div>
	</div>
	<div class="ribbon">
		
	</div>
<br>
	<div class="cont" id="menu">

		<div class="statwrapper">
			<div class="cpubox">
				<div class="piecontainer notlast">
					<div class="chart" id="cpuid" data-percent="100"><span>100</span>%</div>
					<div class="pietext"><span>CPU Use</span></div>
				</div>
				<div class="piecontainer notlast">
					<div class="chart" id="cputemp" data-percent="100"><span>100</span>°c</div>
					<div class="pietext"><span>CPU Temp</span></div>
				</div>
				<div class="piecontainer">
					<div class="chart" id="freemem" data-percent="100"><span>100</span>%</div>
					<div class="pietext"><span>RAM Use</span></div>
				</div>
			</div>
		</div>
		<br>
		<div id="status">
		</div>
	</div>
</div>
</div>

</body>
</html>
