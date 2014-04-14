<html>
	<head>
		<title>
			Pi Dashboard
		</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" href="images/favicon.ico" type="image/x-ico">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	</head>
	<body>
	 	<div class='container'>
			<header class="page-header">
				<div class="logo" >
					<span class="logoBrace">{</span>
					<span class="pi-span">Pi</span>Dashboard
					<span class="logoBrace">}</span>
				</div>

				<nav>
					<div class='menu-btn'>
						<i class="fa fa-bars fa-2x"></i>
					</div>
					<div class='dropdownmenu hideElement'>
						<ul class='ul-menu'>
							<li class='show-details-btn'>Show Details</li>
							<li class='night-mode-btn'>Night Mode</li>
						</ul>
					</div>
				</nav>
			</header>
			<section id="main-content">

				<section class='cpuStatusBars statusBarsContainer'>
					<div class='statusBarsLabel'>
						<span class='contentNameLabel'>CPU</span>
						<span class='contentNameLbrace'>{</span>
					</div>

					<div class='statusBars'>
						<div class='barContainer'>
							<span class='barText'></span>
							<span class='postfixSymbol'>%</span>

							<div class='barBackground'>
								<div class='barFill'>
								</div>
							</div>
						</div>

						<div class='barContainer'>
							<span class='barText'></span>
							<span class='postfixSymbol'>&deg;c</span>

							<div class='barBackground'>
								<div class='barFill'>
								</div>
							</div>
						</div>
					</div>
					<div class="parentheses">
						<span class="contentLparentheses">(</span>
						<div class="details cpudetails">
							<div class='detailsFreq'>Current: <span id="currentMhz"></span>Mhz</div>
							<div class='detailsFreq'>Max: </span><span id="maxMhz"></span>Mhz</div>
							<div class='detailsFreq'>Min: </span><span id="minMhz"></span>Mhz</div>
							<div class='detailsFreq'>Governor: </span><span id="currentGovernor"></span></div>
						</div>
						<span class="contentRparentheses">)</span>
					</div>
					<div class='contentNameRbrace'>
						}
					</div>
				</section>

				<section class='ramStatusBars statusBarsContainer'>
					<div class='statusBarsLabel'>
						<span class='contentNameLabel'>RAM</span>
						<span class='contentNameLbrace'>{</span>
					</div>

					<div class='statusBars ramBars'>
						<div class='barContainer'>
							<span class='barText'></span>
							<span class='postfixSymbol'>%</span>

							<div class='barBackground'>
								<div class='barFill'>
								</div>
							</div>
						</div>
					</div>
					<div class="parentheses">
						<span class="contentLparentheses">(</span>
						<div class="details ramdetails">
							<div class='detailsFreq threeDetails'>Used: <span id="usedRam">0</span>MB</div>
							<div class='detailsFreq threeDetails'>Free: </span><span id="freeRam">0</span>MB</div>
							<div class='detailsFreq threeDetails'>Total: </span><span id="totalRam">0</span>MB</div>
						</div>
						<span class="contentRparentheses">)</span>
					</div>
					<div class='contentNameRbrace'>
						}
					</div>
				</section>

				<section class='netStatusBars statusBarsContainer'>
					<div class='statusBarsLabel'>
						<span class='contentNameLabel'>NET</span>
						<span class='contentNameLbrace'>{</span>
					</div>

					<div class='statusBars'>
						<div class='barContainer'>
							<span class='barText'></span>
							<span class='postfixSymbol netSpeedUpUnits'>b/s</span>

							<div class='barBackground'>
								<div class='barFill'>
								</div>
							</div>
						</div>
						<div class='barContainer'>
							<span class='barText'></span>
							<span class='postfixSymbol netSpeedDownUnits'>b/s</span>

							<div class='barBackground'>
								<div class='barFill'>
								</div>
							</div>
						</div>
					</div>
					<div class="parentheses">
						<span class="contentLparentheses">(</span>
						<div class="details netdetails">
							<div class='detailsFreq threeDetails'>Hostname: <span id='hostname'></span></div>
							<div class='detailsFreq threeDetails'>LAN IP: </span><span id='localAddress'></span></div>
							<div class='detailsFreq threeDetails'>WAN IP: </span><span id='wanAddress'></span></div>
						</div>
						<span class="contentRparentheses">)</span>
					</div>
					<div class='contentNameRbrace'>
						}
					</div>
				</section>

			</section>
		</div>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<!-- google charts -->
		<!--<script type="text/javascript" src="http://www.google.com/jsapi"></script>
		<script>google.load('visualization', '1', {packages: ['corechart']});</script>-->
		<script type="text/javascript" src="js/functions.js"></script>
	</body>
</html>
