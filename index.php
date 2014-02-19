<html>
	<head>
		<title>
			Pi Dashboard
		</title>

		<link rel="icon" href="images/favicon.ico" type="image/x-ico">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet"type="text/css" href="piechart/jquery.easy-pie-chart.css">

		<!-- loading scripts in head so that page doesn't 'distort' while loading -->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<!-- Easy Pie Chart -->
		<script type="text/javascript" src="piechart/jquery.easy-pie-chart.js"></script>

	</head>
<body>
	
	<section class="navbar">
		<div class="navbar-inner">
			<div class="cont" style="height:40px;">
				<ul class="nav">
					<li alt="Current time">
						<div id="time-icon" class="navicon"></div>
						<label for="time-icon" id="time"></label>
					</li>
					<li>
						<a href="#" id="show-status-btn" ><div id="stat-icon" class="navicon"></div>Stats</a>
					</li>
					<li>
						<a href="#" id="show-settings-btn" ><div id="setting-icon" class="navicon"></div>Settings</a>
						<ul>
							<li>
								<div>
									<label for="update-interval">Update Interval: </label>
									<select id="update-interval">
										<option value="3">3</option>
										<option value="5">5</option>
										<option value="10">10</option>
										<option value="60">60</option>
									</select>
									seconds
								</div>
							</li>
							<li style="border-top: 1px solid rgb(107,104,104)">
								<div>
									<label for="show-weather-check" style="color:white;">Show weather?</label>	
									<input type="checkbox" id="show-weather-check">
								</div>
							</li>
							<li style="border-top: 1px solid rgb(107,104,104)">
								<div>
									<label for="new-weather-location" style="color:white;">Enter your city:</label>	
									<input type="text" id="new-weather-location">
								</div>
								<ul id="ui-autocomplete">
									<li class="ui-menu-one">
										<a id="auto-one"></a>
									</li>
									<li class="ui-menu">
										<a id="auto-two"></a>
									</li>
									<li class="ui-menu">
										<a id="auto-three"></a>
									</li>
								</ul>
							</li>
							<li style="border-top: 1px solid rgb(107,104,104)">
								<div id="save-config-div">
									<span id="save-config-btn">
										Save Config
									</span>
								</div>
							</li>
						</ul>
					</li>
					<!--<li class>
					
						<a href="#" id="logout-btn" ><div id="logout-icon" class="navicon"></div>Logout</a>
					</li>-->
				</ul>
			
				<div id="uptime-nav" alt="uptime">
					<span id="uptime"></span>
					<div id="uptime-icon"></div>
				</div>
			</div>
		</div>
	</section>

	<section id="header">
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
							<img id="imgweather" src="">
						</div>
						<div id="weatherdetails">	
							<ul class="wlist">
								<li>
									<label class="weatherlabel" id="weatherlabel"></label>
								</li>
								<li>
									<label class="weatherlabel" id="weatherloc"></label>
								</li>
								<li>
									<label class="weatherlabel" id="weatherupdated">Last updated: <span id="weatherupdatetime"></span></label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="ribbon">
		<div class="ribbon">
		
		</div>
	</section>

	<section id="main-content">
		<div class="cont" id="cpu-menu">
			<div class="statwrapper">
				<div class="cpubox">
					<div class="piecontainer notlast">
						<div class="chart" id="cpuid" data-percent="100"><span>100</span>%</div>
						<div class="pietext"><span>Use</span></div>
					</div>
					<div class="piecontainer">
						<div class="chart" id="cputemp" data-percent="100"><span>100</span>&deg;c</div>
						<div class="pietext"><span>Temp</span></div>
					</div>
				
					<div class="showhide" id="show-cpu-hist">
						<span class="showhideicon" id="show-cpu-icon"></span>
					</div>
					<div class="area-chart" id="cpu-vis" style="width: 500px; height: 154px;"></div>
					<div class="details">
						<div class="detail detail-current">Current freq: <span id="cur-cpu-freq"><?php echo exec('commands/getcpufreq.sh cur');?></span></div>
						<div class="detail detail-min-max"><span id="cpu-freq"><?php echo exec('commands/getcpufreq.sh minmax');?></span></div>
						<div class="detail detail-governor">Governor: <?php echo exec('commands/getcpufreq.sh guv'); ?></div>
					</div>
				</div>
			</div>
		</div>
		<div class="cont" id="ram-menu">
			<div class="statwrapper">
				<div class="rambox">
					<div class="piecontainer" id="ram-pie-container">
						<div class="chart" id="freemem" data-percent="100"><span>100</span>%</div>
						<div class="pietext"><span>Used</span></div>
					</div>
				
					<div class="showhide" id="show-ram-hist" >
						<span class="showhideicon" id="show-ram-icon"></span>
					</div>
				
					<div class="area-chart" id="ram-vis" style="width: 500px; height: 154px;"></div>
					<div class="details">
						<div class="detail detail-ramused">Used/Free: <span id="ramused"><?php echo exec('commands/getcpufreq.sh ramused');?></span>/<span id="ramfree"><?php echo exec('commands/getcpufreq.sh ramfree');?></span>Mb</div>
						<div class="detail detail-ramtotal">Total: 485Mb</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cont" id="net-menu">
			<div class="statwrapper">
				<div class="netbox">
					<div class="piecontainer notlast">
						<div class="chart" id="upspeed" data-percent="100"><span>100</span>kb/s</div>
						<div class="pietext"><span>up</span></div>
					</div>
					<div class="piecontainer">
						<div class="chart" id="downspeed" data-percent="100"><span>100</span>kb/s</div>
						<div class="pietext"><span>down</span></div>
					</div>
				
					<div class="showhide" id="show-net-hist" >
						<span class="showhideicon" id="show-net-icon"></span>
					</div>
				
					<div class="area-chart" id="net-vis" style="width: 500px; height: 154px;"></div>
					<div class="details">
						<div class="detail detail-speed">Speed Up/Down:</div>
						<div class="detail detail-speedtxt"><span id="upspeedtxt">0</span>/<span id="downspeedtxt">0</span>kbps</div>
					</div>
				</div>
			</div>
		</div>
		
		<br>
		<br>

		<div id="status">
		</div>
	
	</section>
	<section id="footer">

	</section>
	<!-- google charts -->
	<script type="text/javascript" src="http://www.google.com/jsapi"></script>
	<script>
		google.load('visualization', '1', {packages: ['corechart']});
	</script>
	<script type="text/javascript" src="js/functions.js"></script>
</body>
</html>
