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
	
	<script language="javascript" type="text/javascript" src="js/functions.js"></script>
	
	
</head>
<body>
	
<div class="navbar">
	<div class="navbar-inner">
		<div class="cont">
			<ul class="nav">
				<!--<li class>
					<a href="javascript:;" onclick="document.getElementById('movieform').submit();">Movies</a>
				</li>
				<li class>
					<a href="javascript:;" onclick="document.getElementById('tvform').submit();">Tv Shows</a>
				</li>
				<li class>
					<a href=#  id="xxx">Music</a>
				</li>-->
				<li class>
					<label id="time"></label>
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
				<h1><a href="javascript:void(0);" id="logo-link">
				<span class="pilogo" id="pi-span" style="z-index:11;">P</span>
				<span class="pilogo" id="pi-span" style="z-index:10;">i </span>
				<span class="pilogo" id="pi-spa" style="z-index:9;">D</span>
				<span class="pilogo" id="pi-spa" style="z-index:8;">a</span>
				<span class="pilogo" id="pi-spa" style="z-index:7;">s</span>
				<span class="pilogo" id="pi-spa" style="z-index:6;">h</span>
				<span class="pilogo" id="pi-spa" style="z-index:5;">b</span>
				<span class="pilogo" id="pi-spa" style="z-index:4;">o</span>
				<span class="pilogo" id="pi-spa" style="z-index:3;">a</span>
				<span class="pilogo" id="pi-spa" style="z-index:2;">r</span>
				<span class="pilogo" id="pi-spa" style="z-index:1;">d</span></a></h1>
			</div>
			
			<div class="weather" style="display:none">
				<div class="weather2">
					<div id="weatherimg">
						<img src="images/tick_weather_icons/cloudy1.png">
					</div>
					<div id="weatherdetails">	
						<ul class="wlist">
							<li>
								<label class="weatherlabel" id="weatherlabel"></label>
							</li>
							<li>
								<label class="weatherlabel" id="weatherloc">Helsinki, FI</label>
							</li>
							<li>
								<label class="weatherlabel" id="weatherupdated">Last updated: 20:00</label>
							</li>
						</ul>
					</div>
				</div>
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
